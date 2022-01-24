import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databeseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
}

const getFirebaseApp = (): FirebaseApp | undefined => {
  if (typeof window === 'undefined') return

  if (!getApps().length) {
    return initializeApp(config)
  } else {
    return getApp()
  }
}

const firebaseAuth = getAuth(getFirebaseApp())

export { getFirebaseApp, firebaseAuth, firebase }
