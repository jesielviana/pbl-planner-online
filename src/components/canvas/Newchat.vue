<template>
  <div>
    <b-button id="open-chat" variant="white" @click="openChat()"
      class="nav-link btn-light">
      <span class="material-icons">
        chat
      </span>
      <span class="badge" v-if="hasMessages"> </span>
    </b-button>
    <b-tooltip target="open-chat" variant="secondary" placement="top">
      Abrir o chat
    </b-tooltip>
    <div class="chat-popup" id="messages-card-container">
      <div
        id="messages-card"
        class="mdl-card mdl-shadow--2dp mdl-cell
      mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop"
      >
        <div class="chat-top mdl-color-text--grey-600">
          <button type="button" @click="closeChat()" class="close"
            aria-hidden="true">
            <i class="material-icons text-dark">close</i>
          </button>
          <div class="users">
            <ul>
              <i class="material-icons">group</i>
              <li
                v-for="(user, index) in usersFromCurrentPlan"
                :key="index"
              >
                <b-avatar
                  :title="user.displayName"
                  style="width: 2rem !important; height: 2rem !important"
                  :id="index + 'user-online'"
                  :variant="user.isOnline ? 'success' : 'secondary'"
                  v-if="user.photoURL"
                  :src="user.photoURL"
                ></b-avatar>
                <b-avatar
                  :title="user.displayName"
                  style="width: 2rem !important; height: 2rem !important"
                  :id="index + 'user-online'"
                  v-else
                  variant="secondary"
                ></b-avatar>
              </li>
            </ul>
          </div>
        </div>
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <div id="messages"></div>
          <form id="message-form" action="#">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="message"
autocomplete="off" />
              <label class="mdl-textfield__label" for="message">Menssagem...</label>
            </div>
            <button
              id="submit"
              disabled
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            >
              Enviar
            </button>
          </form>
          <form id="image-form" action="#">
            <input id="mediaCapture" type="file" accept="image/*"
capture="camera" />
            <button
              id="submitImage"
              title="Add an image"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect
             mdl-color--amber-400 mdl-color-text--white"
            >
              <i class="material-icons">image</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { EventBus } from '@/event-bus';
import dateUtils from '../../helpers/dateUtils';

export default {
  name: 'Newchat',
  props: {
    titleChat: String,
    planId: String,
  },
  data() {
    return {
      messages: [],
      messageText: '',
      firechat: {},
      roomId: '',
      onlineUsers: [],
      chatRef: undefined,
      user: undefined,
      MESSAGE_TEMPLATE:
        '<div class="message-container">'
        + '<div class="spacing"><div class="pic"></div></div>'
        + '<div class="message"></div>'
        + '<div class="name"></div>'
        + '</div>',
      LOADING_IMAGE_URL: 'https://www.google.com/images/spin-32.gif?a',
      // Shortcuts to DOM Elements.
      messageListElement: '',
      messageFormElement: '',
      messageInputElement: '',
      submitButtonElement: '',
      imageButtonElement: '',
      imageFormElement: '',
      mediaCaptureElement: '',
      hasMessages: false,
      isOpen: false,
      usersFromCurrentPlan: [],
    };
  },
  computed: {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    planId(newPlanId, oldPlanId) {
      this.start();
    },
    // eslint-disable-next-line no-unused-vars
    usersMap(newUsersMap, oldUsersMap) {
      this.start();
    },
  },
  mounted() {
    this.addJavascript();
    if (this.planId) {
      this.start();
      this.init();
    }
  },
  updated() {
    this.$nextTick(() => {
      // Código que irá rodar apenas após toda
      // a árvore do componente ter sido re-renderizada
      window.componentHandler.upgradeDom();
    });
  },
  methods: {
    addJavascript() {
      const recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute('src', 'https://code.getmdl.io/1.1.3/material.min.js');
      document.head.appendChild(recaptchaScript);
    },
    openChat() {
      document.getElementById('messages-card-container').style.display = 'block';
      this.isOpen = true;
      this.hasMessages = false;
      this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
    },

    closeChat() {
      document.getElementById('messages-card-container').style.display = 'none';
      this.isOpen = false;
    },

    start() {
      if (this.planId) {
        EventBus.$on('usersFromCurrentPlan', (usersFromCurrentPlanEvent) => {
          this.usersFromCurrentPlan = usersFromCurrentPlanEvent.filter(
            (user) => user.id !== this.getCurrentUserId(),
          );
          this.$forceUpdate();
        });
      }
    },

    // Initiate firebase auth.
    initFirebaseAuth() {
      // Listen to auth state changes.
      this.$firebase.auth().onAuthStateChanged(this.authStateObserver);
    },

    // Returns the signed-in user's profile Pic URL.
    getProfilePicUrl() {
      return this.$firebase.auth().currentUser.photoURL || '/img/profile_placeholder.png';
    },

    // Returns the signed-in user's display name.
    getUserName() {
      return this.$firebase.auth().currentUser.displayName;
    },

    // Returns true if a user is signed-in.
    isUserSignedIn() {
      return !!this.$firebase.auth().currentUser;
    },

    // Saves a new message on the Cloud Firestore.
    saveMessage(messageText) {
      // Add a new message entry to the Firebase database.
      return this.$firebase
        .firestore()
        .collection('chat')
        .doc(this.planId)
        .collection('messages')
        .add({
          name: this.getUserName(),
          text: messageText,
          profilePicUrl: this.getProfilePicUrl(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch((error) => {
          console.error('Error writing new message to Firebase Database', error);
        });
    },

    // Loads chat messages history and listens for upcoming ones.
    async loadMessages() {
      // Create the query to load the last 12 messages and listen for new ones.
      const query = await this.$firebase
        .firestore()
        .collection('chat')
        .doc(this.planId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .get();
      query.docs.forEach((doc) => {
        const message = doc.data();
        this.displayMessage(
          doc.id,
          message.timestamp,
          message.name,
          message.text,
          message.profilePicUrl,
          message.imageUrl,
        );
      });
      // Start listening to the query.
      this.$firebase
        .firestore()
        .collection('chat')
        .doc(this.planId)
        .collection('messages')
        .orderBy('timestamp')
        .startAt(firebase.firestore.Timestamp.now())
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const message = change.doc.data();
            this.displayMessage(
              change.doc.id,
              message.timestamp,
              message.name,
              message.text,
              message.profilePicUrl,
              message.imageUrl,
            );
            if (change.type === 'added') {
              if (!this.isOpen) {
                this.hasMessages = true;
              }
            }
          });
        });
    },

    getCurrentUserId() {
      return this.$firebase.auth().currentUser.uid;
    },

    // Saves a new message containing an image in Firebase.
    // This first saves the image in Firebase storage.
    saveImageMessage(file) {
      // 1 - We add a message with a loading icon that will get updated with the shared image.
      this.$firebase
        .firestore()
        .collection('chat')
        .doc(this.planId)
        .collection('messages')
        .add({
          name: this.getUserName(),
          imageUrl: this.LOADING_IMAGE_URL,
          profilePicUrl: this.getProfilePicUrl(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((messageRef) => {
          // 2 - Upload the image to Cloud Storage.
          const filePath = `${this.$firebase.auth().currentUser.uid}/${messageRef.id}/${file.name}`;
          return this.$firebase
            .storage()
            .ref(filePath)
            .put(file)
            .then((fileSnapshot) => fileSnapshot.ref.getDownloadURL().then((url) => messageRef.update({
              imageUrl: url,
              storageUri: fileSnapshot.metadata.fullPath,
            })));
        })
        .catch((error) => {
          console.error('There was an error uploading a file to Cloud Storage:', error);
        });
    },

    // Saves the messaging device token to the datastore.
    saveMessagingDeviceToken() {
      this.$firebase
        .messaging()
        .getToken()
        .then((currentToken) => {
          if (currentToken) {
            // Saving the Device Token to the datastore.
            this.$firebase
              .firestore()
              .collection('chat')
              .doc(this.planId)
              .collection('fcmTokens')
              .doc(currentToken)
              .set({ uid: this.$firebase.auth().currentUser.uid });
          } else {
            // Need to request permissions to show notifications.
            this.requestNotificationsPermissions();
          }
        })
        .catch((error) => {
          console.error('Unable to get messaging token.', error);
        });
    },

    // Requests permissions to show notifications.
    requestNotificationsPermissions() {
      console.info('Requesting notifications permission...');
      this.$firebase
        .messaging()
        .requestPermission()
        .then(() => {
          // Notification permission granted.
          this.saveMessagingDeviceToken();
        })
        .catch((error) => {
          console.error('Unable to get permission to notify.', error);
        });
    },

    // Triggered when a file is selected via the media picker.
    onMediaFileSelected(event) {
      event.preventDefault();
      const file = event.target.files[0];

      // Clear the selection in the file picker input.
      this.imageFormElement.reset();

      // Check if the file is an image.
      if (!file.type.match('image.*')) {
        this.showErrorToast('Formato de imagem inválido.');
        return;
      }
      // Check if the user is signed-in
      if (this.checkSignedInWithMessage()) {
        this.saveImageMessage(file);
      }
    },

    // Triggered when the send new message form is submitted.
    onMessageFormSubmit(e) {
      e.preventDefault();
      // Check that the user entered a message and is signed in.
      if (this.messageInputElement.value && this.checkSignedInWithMessage()) {
        this.saveMessage(this.messageInputElement.value).then(() => {
          // Clear message text field and re-enable the SEND button.
          this.resetMaterialTextfield(this.messageInputElement);
          this.toggleButton();
        });
      }
    },

    // Triggers when the auth state change for instance when the user signs-in or signs-out.
    authStateObserver(user) {
      if (user) {
        // We save the Firebase Messaging Device token and enable notifications.
        this.saveMessagingDeviceToken();
      }
    },

    // Returns true if user is signed-in. Otherwise false and displays a message.
    checkSignedInWithMessage() {
      // Return true if the user is signed in Firebase
      if (this.isUserSignedIn()) {
        return true;
      }

      this.showErrorToast('Usuário não está autenticado.');

      return false;
    },

    showErrorToast(msg) {
      this.$bvToast.toast(msg, {
        title: 'Erro!',
        toaster: 'b-toaster-top-center',
        variant: 'danger',
        autoHideDelay: 10000,
        solid: true,
      });
    },

    // Resets the given MaterialTextField.
    resetMaterialTextfield(element) {
      element.value = '';
      element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
    },

    // Adds a size to Google Profile pics URLs.
    addSizeToGoogleProfilePic(url) {
      if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return `${url}?sz=150`;
      }
      return url;
    },

    // A loading image URL.
    // var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

    // Delete a Message from the UI.
    deleteMessage(id) {
      const div = document.getElementById(id);
      // If an element for that message exists we delete it.
      if (div) {
        div.parentNode.removeChild(div);
      }
    },

    createAndInsertMessage(id, timestamp) {
      const container = document.createElement('div');
      container.innerHTML = this.MESSAGE_TEMPLATE;
      const div = container.firstChild;
      div.setAttribute('id', id);

      // If timestamp is null, assume we've gotten a brand new message.
      // https://stackoverflow.com/a/47781432/4816918
      timestamp = timestamp ? timestamp.toMillis() : Date.now();
      div.setAttribute('timestamp', timestamp);

      // figure out where to insert new message
      const existingMessages = this.messageListElement.children;
      if (existingMessages.length === 0) {
        this.messageListElement.appendChild(div);
      } else {
        let messageListNode = existingMessages[0];

        while (messageListNode) {
          const messageListNodeTime = messageListNode.getAttribute('timestamp');

          if (!messageListNodeTime) {
            throw new Error(`Child ${messageListNode.id} has no 'timestamp' attribute`);
          }

          if (messageListNodeTime > timestamp) {
            break;
          }

          messageListNode = messageListNode.nextSibling;
        }

        this.messageListElement.insertBefore(div, messageListNode);
      }

      return div;
    },

    // Displays a Message in the UI.
    displayMessage(id, timestamp, name, text, picUrl, imageUrl) {
      const div = document.getElementById(id) || this.createAndInsertMessage(id, timestamp);

      // profile picture
      if (picUrl) {
        div.querySelector('.pic').style.backgroundImage = `url(${this.addSizeToGoogleProfilePic(
          picUrl,
        )})`;
      }

      div.querySelector('.name').textContent = `${name} - ${
        timestamp != null ? dateUtils.getDateFormatedFrom(timestamp.toDate()) : ''
      }`;
      const messageElement = div.querySelector('.message');

      if (text) {
        // If the message is text.
        messageElement.textContent = text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
      } else if (imageUrl) {
        // If the message is an image.
        const image = document.createElement('img');
        image.addEventListener('load', () => {
          this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
        });
        image.src = `${imageUrl}&${new Date().getTime()}`;
        messageElement.innerHTML = '';
        messageElement.appendChild(image);
      }
      // Show the card fading-in and scroll to view the new message.
      setTimeout(() => {
        div.classList.add('visible');
      }, 1);
      this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
      this.messageInputElement.focus();
    },

    // Enables or disables the submit button depending on the values of the input
    // fields.
    toggleButton() {
      if (this.messageInputElement.value) {
        this.submitButtonElement.removeAttribute('disabled');
      } else {
        this.submitButtonElement.setAttribute('disabled', 'true');
      }
    },

    // Checks that Firebase has been imported.
    init() {
      // Shortcuts to DOM Elements.
      this.messageListElement = document.getElementById('messages');
      this.messageFormElement = document.getElementById('message-form');
      this.messageInputElement = document.getElementById('message');
      this.submitButtonElement = document.getElementById('submit');
      this.imageButtonElement = document.getElementById('submitImage');
      this.imageFormElement = document.getElementById('image-form');
      this.mediaCaptureElement = document.getElementById('mediaCapture');

      // Saves message on form submit.
      this.messageFormElement.addEventListener('submit', this.onMessageFormSubmit);

      // Toggle for the button.
      this.messageInputElement.addEventListener('keyup', this.toggleButton);
      this.messageInputElement.addEventListener('change', this.toggleButton);

      // Events for image upload.
      this.imageButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.mediaCaptureElement.click();
      });
      this.mediaCaptureElement.addEventListener('change', this.onMediaFileSelected);

      // initialize Firebase
      this.initFirebaseAuth();

      // TODO: Enable Firebase Performance Monitoring.
      // firebase.performance();

      // We load currently existing chat messages and listen to new ones.
      this.loadMessages();
    },
  },
};
</script>
<style>
/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0px;
  right: 16px;
  z-index: 9999;
  background-color: transparent;
  padding: 0;
  border-radius: 5px 5px 0 0;
  max-width: 420px;
}

#messages-card-container {
  height: 60%;
  padding-bottom: 0;
  min-height: 400px;
  max-height: 600px;
}
#messages-card {
  margin-top: 15px;
  height: 100%;
  padding-bottom: 0;
  border: 1px solid #bbb;
}
.mdl-layout__header-row span {
  margin-left: 15px;
  margin-top: 17px;
}
.mdl-grid {
  max-width: 1024px;
  margin: auto;
}
.chat-popup .material-icons {
  /* font-size: 36px; */
  top: 8px;
  position: relative;
}
.chat-top {
  font-size: 1rem;
  line-height: 18px;
  overflow: hidden;
  padding: 8px;
  border-bottom: #bbb solid 2px;
}
.chat-top .material-icons {
  margin-right: 0.5rem;
}
.mdl-layout__header-row {
  padding: 0;
  margin: 0 auto;
}
.mdl-card__supporting-text {
  width: auto !important;
  height: 100%;
  padding-top: 0 !important;
  padding-bottom: 0;
}
#messages {
  overflow-y: auto;
  margin-bottom: 10px;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
}
#message-filler {
  flex-grow: 1;
}
.message-container:first-of-type {
  border-top-width: 0;
}
.message-container {
  display: block;
  margin-top: 10px;
  border-top: 1px solid #f3f3f3;
  padding-top: 10px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
.message-container.visible {
  opacity: 1;
}
.message-container .pic {
  background-image: url('/img/profile_placeholder.png');
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  background-size: 30px;
  border-radius: 20px;
}
.message-container .spacing {
  display: table-cell;
  vertical-align: top;
}
.message-container .message {
  display: table-cell;
  width: calc(100% - 40px);
  padding: 5px 0 5px 10px;
  max-width: 300px;
  word-wrap: break-word;
}
.message-container .name {
  display: inline-block;
  width: 100%;
  padding-left: 40px;
  color: #bbb;
  font-style: italic;
  font-size: 12px;
  box-sizing: border-box;
}
#message-form {
  display: flex;
  flex-direction: row;
  width: calc(100% - 48px);
  float: left;
}
#image-form {
  display: flex;
  flex-direction: row;
  width: 48px;
  float: right;
}
#message-form .mdl-textfield {
  width: calc(100% - 100px);
}
#message-form button,
#image-form button {
  width: 100px;
  margin: 15px 0 0 10px;
}
.mdl-card {
  min-height: 0;
}
.mdl-card {
  background: linear-gradient(white, #f9f9f9);
  justify-content: space-between;
}

#image-form #submitImage {
  width: auto;
  padding: 0 6px 0 1px;
  min-width: 0;
}
#image-form #submitImage .material-icons {
  top: -1px;
}
.message img {
  max-width: 100%;
  max-height: 200px;
}
#mediaCapture {
  display: none;
}

@media screen and (max-width: 610px) {
  header {
    height: 113px;
    padding-bottom: 80px !important;
  }
  #user-container {
    top: 72px;
    background-color: rgb(3, 155, 229);
    height: 38px;
    padding-top: 3px;
    padding-right: 2px;
  }
  #user-container #user-pic {
    top: 2px;
    width: 33px;
    height: 33px;
    background-size: 33px;
  }
}
#messages-card-container .mdl-textfield__label:after {
  background-color: #0288d1;
}
#messages-card-container .mdl-textfield--floating-label.is-focused .mdl-textfield__label {
  color: #0288d1;
}
.mdl-button .material-icons {
  top: -1px;
  margin-right: 5px;
}

#messages-card-container label {
  margin-bottom: 0;
}

.users {
  display: flex;
  align-items: center;
}
.users ul li {
  display: inline;
  margin-right: -0.5rem;
  position: relative;
}
.users ul li:last-child {
  margin-right: 0;
}
.users ul {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
h4 {
  line-height: 20px;
}
</style>
<style scoped src="@/assets/mdl/material.min.css"></style>
