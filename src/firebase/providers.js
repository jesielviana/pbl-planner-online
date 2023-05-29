import firebase from 'firebase/app'

const googleProvider = new firebase.auth.GoogleAuthProvider()

googleProvider.addScope('profile')
googleProvider.addScope('email')

export default googleProvider
