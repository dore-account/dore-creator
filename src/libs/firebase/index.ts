import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const getFirebaseApp = (): firebase.app.App | undefined => {
  if (typeof window === 'undefined') return

  if (!firebase.apps.length) {
    console.log('initialize')
    return firebase.initializeApp(config)
  } else {
    console.log('not initialize')
    return firebase.app()
  }
}

export { getFirebaseApp, firebase }
