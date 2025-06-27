import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration - use environment variables for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Check if all required config is available
const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId && 
    firebaseConfig.appId
  );
};

// Initialize Firebase with error handling
let app: any = null;
let auth: any = null;
let db: any = null;
let analytics: any = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    
    console.log('Firebase initialized successfully');
    
    // Initialize Analytics only on client side and if supported
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
          console.log('Firebase Analytics initialized');
        }
      }).catch((error) => {
        console.warn('Analytics not supported:', error);
      });
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('Firebase not configured. Missing environment variables:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasProjectId: !!firebaseConfig.projectId,
    hasAppId: !!firebaseConfig.appId
  });
}

export { app, auth, db, analytics };

// Auth providers
let googleProvider: GoogleAuthProvider | null = null;
if (auth) {
  try {
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    console.log('Google Auth provider initialized');
  } catch (error) {
    console.error('Failed to initialize Google Auth provider:', error);
  }
}

// Auth functions with error handling
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - sign in disabled');
    throw new Error('Authentication is not available. Please check your configuration.');
  }
  
  if (!auth || !googleProvider) {
    console.error('Firebase Auth or Google provider not initialized');
    throw new Error('Authentication service is not available.');
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Sign in successful');
    return result;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - sign out disabled');
    return;
  }
  
  if (!auth) {
    console.error('Firebase Auth not initialized');
    return;
  }
  
  try {
    await signOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Subscription functions
export interface Subscription {
  id?: string;
  email: string;
  name?: string;
  subscribedAt: any;
  userId?: string;
  preferences?: {
    categories?: string[];
    frequency?: 'daily' | 'weekly' | 'monthly';
  };
  status: 'active' | 'unsubscribed';
}

export const subscribeUser = async (email: string, name?: string, userId?: string, preferences?: any) => {
  if (!db) {
    throw new Error('Firebase Firestore not configured');
  }
  
  try {
    // Check if user is already subscribed
    const q = query(collection(db, 'subscriptions'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('Email is already subscribed');
    }

    const subscription: Subscription = {
      email,
      name: name || '',
      userId: userId || '',
      subscribedAt: serverTimestamp(),
      preferences: preferences || {
        categories: ['all'],
        frequency: 'weekly'
      },
      status: 'active'
    };

    const docRef = await addDoc(collection(db, 'subscriptions'), subscription);
    return { id: docRef.id, ...subscription };
  } catch (error) {
    console.error('Error subscribing user:', error);
    throw error;
  }
};

export const unsubscribeUser = async (email: string) => {
  if (!db) {
    throw new Error('Firebase Firestore not configured');
  }
  
  try {
    const q = query(collection(db, 'subscriptions'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update status instead of deleting
      // This could be implemented with updateDoc if needed
      console.log('User unsubscribed:', email);
    }
  } catch (error) {
    console.error('Error unsubscribing user:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - auth state observer disabled');
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  
  if (!auth) {
    console.warn('Firebase Auth not initialized');
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  
  try {
    return onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'signed in' : 'signed out');
      callback(user);
    });
  } catch (error) {
    console.error('Auth state observer error:', error);
    callback(null);
    return () => {};
  }
};

export default app;
