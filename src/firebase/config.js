import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'pblplanneronline.jesielviana.com',
  databaseURL: 'https://pbl-planner.firebaseio.com',
  projectId: 'pbl-planner',
  storageBucket: 'gs://pbl-planner.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
