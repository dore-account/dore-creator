import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

const getFirebaseApp = (): firebase.app.App | undefined => {
  if (typeof window === 'undefined') return

  if (!firebase.apps.length) {
    console.log('initialize');
    return firebase.initializeApp(config)
  } else {
    console.log('not initialize');
    return firebase.app()
  }
}

const firebaseAuth = firebase.auth(getFirebaseApp())

export { getFirebaseApp, firebaseAuth, firebase }
