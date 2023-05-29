import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/storage'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'pbl-planner.firebaseapp.com',
  databaseURL: 'https://pbl-planner.firebaseio.com',
  projectId: 'pbl-planner',
  storageBucket: 'gs://pbl-planner.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.analytics()
if (firebase.messaging.isSupported()) {
  firebase.messaging()
}

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
