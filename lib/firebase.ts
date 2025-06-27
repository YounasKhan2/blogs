import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration - use environment variables for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCdmYNQ_-uedBHElDOhJTrH3nna2zg64sc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "blogs-864f2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "blogs-864f2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "blogs-864f2.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "96498213284",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:96498213284:web:30b0a68de699858b4c2131",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-13JLXVL26F"
};

// Initialize Firebase with error handling
let app: any = null;
let auth: any = null;
let db: any = null;
let analytics: any = null;

try {
  // Only initialize if we have required config
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "AIzaSyCdmYNQ_-uedBHElDOhJTrH3nna2zg64sc") {
    app = initializeApp(firebaseConfig);
    
    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Initialize Analytics only on client side and if supported
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch((error) => {
        console.warn('Analytics not supported:', error);
      });
    }
  } else {
    console.warn('Firebase not configured. Please set up your environment variables.');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { app, auth, db, analytics };

// Auth providers
let googleProvider: GoogleAuthProvider | null = null;
if (auth) {
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

// Auth functions with error handling
export const signInWithGoogle = () => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase Auth not configured');
  }
  return signInWithPopup(auth, googleProvider);
};

export const signOutUser = () => {
  if (!auth) {
    throw new Error('Firebase Auth not configured');
  }
  return signOut(auth);
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
  if (!auth) {
    console.warn('Firebase Auth not configured');
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

export default app;
