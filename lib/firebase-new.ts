import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, db, analytics };
