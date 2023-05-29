<template>
  <div>
<!-- <b-button @click="makeToast(true)">Show Toast (appended)</b-button> -->
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { EventBus } from '@/event-bus';

export default {
  name: 'Presence',
  data() {
    return {
      usersByPlan: [],
    };
  },
  mounted() {
    this.initFirestore();
    EventBus.$on('usersByPlan', (users) => {
      this.usersByPlan = users;
      this.getUsersByPlan();
    });
  },

  methods: {
    async getUsersByPlan() {
      const usersMap = new Map();
      const usersRef = this.$firebase.firestore().collection('users');
      const querySnapshot = await usersRef.get();
      querySnapshot.forEach((doc) => {
        if (this.usersByPlan.includes(doc.id)) {
          usersMap.set(doc.id, {
            id: doc.id, displayName: doc.data().displayName, photoURL: doc.data().photoURL, isOnline: false,
          });
        }
      });
      EventBus.$emit('usersMap', usersMap);
      this.usersMonitoring(usersMap);
    },

    usersMonitoring(usersMap) {
      this.$firebase.firestore().collection('status')
        .where('state', '==', 'online')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const user = usersMap.get(change.doc.id);
              if (user) {
                user.isOnline = true;
              }
            }
            if (change.type === 'removed') {
              const user = usersMap.get(change.doc.id);
              if (user) {
                user.isOnline = false;
              }
            }
            const usersFromCurrentPlan = Array.from(usersMap.values());
            EventBus.$emit('usersFromCurrentPlan', usersFromCurrentPlan);
          });
        });
    },

    initFirestore() {
      const { uid } = this.$firebase.auth().currentUser;

      const userStatusFirestoreRef = this.$firebase.firestore().doc(`/status/${uid}`);
      const userStatusDatabaseRef = this.$firebase.database().ref(`/status/${uid}`);

      // Firestore uses a different server timestamp value, so we'll
      // create two more constants for Firestore state.
      const isOfflineForFirestore = {
        state: 'offline',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const isOnlineForFirestore = {
        state: 'online',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };

      const isOnlineForDatabase = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };

      this.$firebase.database().ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() === false) {
        // Instead of simply returning, we'll also set Firestore's state
        // to 'offline'. This ensures that our Firestore cache is aware
        // of the switch to 'offline.'
          userStatusFirestoreRef.set(isOfflineForFirestore);
          return;
        }

        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase);

          // We'll also add Firestore set here for when we come online.
          userStatusFirestoreRef.set(isOnlineForFirestore);
        });
      });
    },
  },
};
</script>

<style lang="scss">
// .b-toast .toast .toast-body{
//   display: none !important;
// }
</style>
