import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDRQOcyD7K-JlaO1D98G_NJqbh-Qa3XLH0',
    authDomain: 'pastory-me.firebaseapp.com',
    databaseURL: 'https://pastory-me.firebaseio.com',
    projectId: 'pastory-me',
    storageBucket: 'pastory-me.appspot.com',
    messagingSenderId: '14733022860'
    // apiKey: process.env.FIREBASE_APIKEY,
    // authDomain: process.env.FIREBASE_AUTHDOMAIN,
    // databaseURL: process.env.FIREBASE_DATABASEURL,
    // projectId: process.env.FIREBASE_PROJECTID,
    // storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
  })
}

export default firebase
