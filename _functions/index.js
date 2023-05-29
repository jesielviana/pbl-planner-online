const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = require('./firebase-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pbl-planner.firebaseio.com'
})

const firestore = admin.firestore()

exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
  async (change, context) => {
    const eventStatus = change.after.val()
    const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`)
    const statusSnapshot = await change.after.ref.once('value')
    const status = statusSnapshot.val()
    console.info(status, eventStatus)
    if (status.last_changed > eventStatus.last_changed) {
      return null
    }
    eventStatus.last_changed = new Date(eventStatus.last_changed)
    return userStatusFirestoreRef.set(eventStatus)
  }
)
exports.sendNotifications = functions.firestore.document('chat/{chatId}/messages/{messageId}').onCreate(
  async (snapshot) => {
    const text = snapshot.data().text
    const planId = snapshot.ref.parent.parent.id
    const payload = {
      notification: {
        title: `${snapshot.data().name} enviou uma mensagem`,
        body: text ? (text.length <= 100 ? text : `${text.substring(0, 97)}...`) : '',
        icon: snapshot.data().profilePicUrl,
        click_action: `https://canvas.pblplanner.online/planejamento/${planId}`
      }
    }

    const allTokens = await snapshot.ref.parent.parent.collection('fcmTokens').get()
    const tokens = []
    allTokens.forEach((tokenDoc) => {
      tokens.push(tokenDoc.id)
    })

    if (tokens.length > 0) {
      const response = await admin.messaging().sendToDevice(tokens, payload)
      response.results.forEach((result, index) => {
        const error = result.error
        if (error) {
          console.error('Falha ao enviar ao dispositivo:  ', tokens[index], error)
        } else {
          console.info('Enviado com sucesso')
        }
      })
    }
  }
)
