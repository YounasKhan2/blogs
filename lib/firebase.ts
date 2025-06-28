import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
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
  const hasConfig = !!(
    firebaseConfig.apiKey && 
    firebaseConfig.authDomain && 
    firebaseConfig.projectId && 
    firebaseConfig.appId
  );
  
  if (!hasConfig) {
    console.log('Firebase config check failed:', {
      apiKey: !!firebaseConfig.apiKey,
      authDomain: !!firebaseConfig.authDomain,
      projectId: !!firebaseConfig.projectId,
      appId: !!firebaseConfig.appId
    });
  }
  
  return hasConfig;
};

// Initialize Firebase with error handling
let app: any = null;
let auth: any = null;
let db: any = null;
let analytics: any = null;
let googleProvider: GoogleAuthProvider | null = null;

// Initialize Firebase (works in both client and server)
if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Initialize Google provider
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    // Initialize Analytics only on client side and if supported
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch((error) => {
        // Analytics not supported - silent fail
      });
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Reset variables on error
    app = null;
    auth = null;
    db = null;
    googleProvider = null;
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

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: 'google' | 'email';
  createdAt: any;
  lastLoginAt: any;
  preferences?: {
    newsletter: boolean;
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

// Create or update user profile in Firestore
const createOrUpdateUserProfile = async (user: User, provider: 'google' | 'email', additionalData: any = {}) => {
  if (!db) {
    console.warn('Firestore not available, skipping user profile creation');
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    const userData: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || additionalData.displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL || '',
      provider,
      lastLoginAt: serverTimestamp(),
      ...additionalData
    };

    if (userSnap.exists()) {
      // Update existing user
      await setDoc(userRef, userData, { merge: true });
    } else {
      // Create new user profile
      const newUserData: UserProfile = {
        ...userData,
        createdAt: serverTimestamp(),
        preferences: {
          newsletter: true,
          categories: ['all'],
          frequency: 'weekly'
        }
      } as UserProfile;
      
      await setDoc(userRef, newUserData);
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    throw error; // Re-throw to handle in calling function
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) {
    console.warn('Firestore not available');
    return null;
  }
  
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Update user preferences
export const updateUserPreferences = async (uid: string, preferences: Partial<UserProfile['preferences']>) => {
  if (!db) {
    throw new Error('Firebase Firestore not configured');
  }
  
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { 
      preferences: preferences,
      lastLoginAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

// Auth functions with error handling
export const signInWithGoogle = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Authentication is only available on the client side.');
  }
  
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - sign in disabled');
    throw new Error('Authentication is not available. Please check your configuration.');
  }
  
  if (!auth || !googleProvider) {
    console.error('Firebase Auth or Google provider not initialized');
    throw new Error('Google authentication service is not available.');
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Create or update user profile in Firestore
    await createOrUpdateUserProfile(result.user, 'google');
    
    return result;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    }
    
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  if (typeof window === 'undefined') {
    throw new Error('Authentication is only available on the client side.');
  }
  
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - sign up disabled');
    throw new Error('Authentication is not available. Please check your configuration.');
  }
  
  if (!auth) {
    console.error('Firebase Auth not initialized');
    throw new Error('Authentication service is not available.');
  }
  
  try {
    // Create user account
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    if (displayName && displayName.trim()) {
      await updateProfile(result.user, { 
        displayName: displayName.trim() 
      });
    }
    
    // Create user profile in Firestore
    await createOrUpdateUserProfile(result.user, 'email', { 
      displayName: displayName.trim() 
    });
    
    return result;
  } catch (error: any) {
    console.error('Email sign up error:', error);
    // Provide user-friendly error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email already exists. Please sign in instead.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters long.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    }
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  if (typeof window === 'undefined') {
    throw new Error('Authentication is only available on the client side.');
  }
  
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured - sign in disabled');
    throw new Error('Authentication is not available. Please check your configuration.');
  }
  
  if (!auth) {
    console.error('Firebase Auth not initialized');
    throw new Error('Authentication service is not available.');
  }
  
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Update user profile in Firestore
    await createOrUpdateUserProfile(result.user, 'email');
    
    return result;
  } catch (error: any) {
    console.error('Email sign in error:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address. Please sign up first.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    }
    
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
      callback(user);
    });
  } catch (error) {
    console.error('Auth state observer error:', error);
    callback(null);
    return () => {};
  }
};

export default app;
