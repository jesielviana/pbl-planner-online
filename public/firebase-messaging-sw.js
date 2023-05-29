/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDv4XfAjQZ_UPcRoSmka_YhH3Lu01nn5P8',
  authDomain: 'pbl-planner.firebaseapp.com',
  databaseURL: 'https://pbl-planner.firebaseio.com',
  projectId: 'pbl-planner',
  storageBucket: 'pbl-planner.appspot.com',
  messagingSenderId: '710175252606',
  appId: '1:710175252606:web:a7507319d138c59671b82f',
  measurementId: 'G-8NEH7JHF36'
})

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()

  const publicKey = 'BNW1QzDXWaa7X0jWsP2sC55VZCZFvl5-G1fsj6VYqSAequdPI79-mj-q8XesztRV74DycACFW917Lb_MEF7236A'
  messaging.usePublicVapidKey(publicKey)

  messaging.setBackgroundMessageHandler((payload) => {
    console.info('Received background message ', payload)
    const notificationTitle = payload.data.title
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon
    }

    return self.registration.showNotification(notificationTitle, notificationOptions)
  })
}
