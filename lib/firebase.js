import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}

//lots of problems here...

if (!firebase.apps.length) {
    firebase.initializeApp(config)
    console.log('firebase initialize')
}

export const firebaseApp = firebase

export const auth = firebaseApp.auth

export const db = firebaseApp.firestore
