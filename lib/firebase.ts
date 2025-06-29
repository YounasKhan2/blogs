import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  Firestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Firebase configuration - hardcoded for deployment (move to env for production security)
const firebaseConfig = {
  apiKey: "AIzaSyCdmYNQ_-uedBHElDOhJTrH3nna2zg64sc",
  authDomain: "blogs-864f2.firebaseapp.com",
  projectId: "blogs-864f2",
  storageBucket: "blogs-864f2.firebasestorage.app",
  messagingSenderId: "96498213284",
  appId: "1:96498213284:web:30b0a68de699858b4c2131",
  measurementId: "G-13JLXVL26F"
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
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
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
    if (typeof window !== 'undefined' && app) {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {
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
  createdAt: string | Date;
  lastLoginAt: string | Date;
  preferences?: {
    newsletter: boolean;
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
}

// Create or update user profile in Firestore
const createOrUpdateUserProfile = async (user: User, provider: 'google' | 'email', additionalData: Record<string, unknown> = {}) => {
  if (!db) {
    console.warn('Firestore not available, skipping user profile creation');
    return;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    const userData = {
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
      const newUserData = {
        ...userData,
        createdAt: serverTimestamp(),
        preferences: {
          newsletter: true,
          categories: ['all'],
          frequency: 'weekly'
        }
      };
      
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
  } catch (error: unknown) {
    console.error('Google sign in error:', error);
    
    // Provide user-friendly error messages
    const firebaseError = error as { code?: string; message?: string };
    if (firebaseError.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (firebaseError.code === 'auth/popup-blocked') {
      throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
    } else if (firebaseError.code === 'auth/cancelled-popup-request') {
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
  } catch (error: unknown) {
    console.error('Email sign up error:', error);
    // Provide user-friendly error messages
    const firebaseError = error as { code?: string; message?: string };
    if (firebaseError.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email already exists. Please sign in instead.');
    } else if (firebaseError.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters long.');
    } else if (firebaseError.code === 'auth/invalid-email') {
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
  } catch (error: unknown) {
    console.error('Email sign in error:', error);
    
    // Provide user-friendly error messages
    const firebaseError = error as { code?: string; message?: string };
    if (firebaseError.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address. Please sign up first.');
    } else if (firebaseError.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (firebaseError.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (firebaseError.code === 'auth/too-many-requests') {
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
  subscribedAt: string | Date;
  userId?: string;
  preferences?: {
    categories?: string[];
    frequency?: 'daily' | 'weekly' | 'monthly';
  };
  status: 'active' | 'unsubscribed';
}

export const subscribeUser = async (email: string, name?: string, userId?: string, preferences?: { categories?: string[]; frequency?: 'daily' | 'weekly' | 'monthly' }) => {
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

    const subscription = {
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
