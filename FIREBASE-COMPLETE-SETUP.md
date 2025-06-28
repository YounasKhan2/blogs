# 🔥 Firebase Setup Instructions

## 1. Firebase Console Setup

### A. Create Project (if not already done)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project with ID: `blogs-864f2` (or use existing)

### B. Enable Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider
   - Add your domain to authorized domains: `localhost`, your production domain
4. Go to **Settings** > **Authorized domains**
   - Add: `localhost`, `127.0.0.1`, your production domain

### C. Setup Firestore Database
1. Go to **Firestore Database**
2. Create database in **production mode**
3. Choose your preferred location

## 2. Firestore Security Rules

Copy and paste these rules in **Firestore Database** > **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    
    // Subscriptions - users can manage their own subscriptions
    match /subscriptions/{document} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email == resource.data.email);
      allow create: if request.auth != null;
    }
    
    // Public read access for blog content (if you plan to store posts in Firestore)
    match /posts/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Analytics and feedback (optional)
    match /analytics/{document} {
      allow create: if true; // Allow anonymous analytics
      allow read, write: if request.auth != null;
    }
  }
}
```

## 3. Environment Variables

Your `.env.local` should contain:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCdmYNQ_-uedBHElDOhJTrH3nna2zg64sc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blogs-864f2.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blogs-864f2
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blogs-864f2.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=96498213284
NEXT_PUBLIC_FIREBASE_APP_ID=1:96498213284:web:30b0a68de699858b4c2131
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-13JLXVL26F

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://localhost:3000

# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9113733158673282
```

## 4. Testing Authentication

### Test Google Sign-in:
1. Click the Google sign-in button
2. Select your Google account
3. Check Firestore > users collection for new user document

### Test Email Sign-up:
1. Use the email sign-up form
2. Enter email, password, and display name
3. Check Authentication > Users tab
4. Check Firestore > users collection

### Test Email Sign-in:
1. Use existing email/password
2. Verify successful login
3. Check that user profile is updated with lastLoginAt timestamp

## 5. User Data Structure

When users sign up, the following data is stored in Firestore:

```javascript
// Collection: users/{uid}
{
  uid: "user-unique-id",
  email: "user@example.com",
  displayName: "User Name",
  photoURL: "https://profile-image-url",
  provider: "google" | "email",
  createdAt: timestamp,
  lastLoginAt: timestamp,
  preferences: {
    newsletter: true,
    categories: ["all"],
    frequency: "weekly"
  }
}
```

## 6. Troubleshooting

### Common Issues:

**"Firebase Auth not configured"**
- Ensure `.env.local` exists with correct values
- Restart development server: `npm run dev`
- Check Firebase Console > Project Settings for correct config

**"Pop-up blocked"**
- Allow pop-ups in browser for localhost/your domain
- Try incognito mode
- Check browser console for specific errors

**Firestore permission errors**
- Verify Firestore rules are correctly set
- Check that user is authenticated before writing to Firestore
- Verify project ID matches in config

**Google Sign-in not working**
- Verify Google provider is enabled in Firebase Auth
- Check authorized domains include your domain
- Ensure Google OAuth consent screen is configured

## 7. Production Deployment

For production:
1. Update authorized domains with your production domain
2. Update `.env.local` or deployment environment variables
3. Verify Firestore rules work with your domain
4. Test all authentication flows on production

## 8. Security Best Practices

✅ **Implemented:**
- Environment-based configuration
- Firestore security rules
- Client-side auth state management
- Error handling for auth failures

✅ **Recommended:**
- Enable Firebase App Check for production
- Monitor authentication usage in Firebase Console
- Set up proper backup strategy for Firestore
- Regular security review of Firestore rules

Your Firebase integration is now complete and secure! 🎉
