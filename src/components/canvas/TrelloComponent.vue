<template>
  <div>
      <span id="send-trello" @click="sendToTrello()">
        Enviar tarefas para o Trello
      </span>
      <b-tooltip target="send-trello" variant="secondary" placement="bottom">
        Enviar todos os itens com a marcação "#task" para o Trello
      </b-tooltip>

    <b-modal
      v-model="modalTrelloShow"
      @ok="handleOkTrello"
      title="Autorizar integração com o Trello"
    >
      <p>
        Clique no botão abaixo e copie o código gerado e cole no campo abaixo.
      </p>
      <a
        target="_blank"
        class="btn btn-primary"
        href="https://trello.com/1/authorize?expiration=never&name=PBL%20Planner%20Toolkit
        &scope=read,write&response_type=token&key=8d0bdbdb6c8c61e24886ecfb05c17dd2"
        >Acessar o Token do Trello</a
      >
      <br /><br />
      <b-form-group
        label="Insira seu código no campo abaixo"
        label-for="input-1"
      >
        <b-form-input id="input-1" v-model="tokenTrello" trim></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import Trello from 'trello';
import { mapState } from 'vuex';

export default {
  name: 'TrelloComponent',
  props: {
    allPostits: Array,
    title: String,
  },
  data() {
    return {
      modalTrelloShow: false,
      tokenTrello: '',
    };
  },
  computed: {
    ...mapState(['isLoading', 'isLogged']),
  },
  methods: {
    async sendToTrello() {
      try {
        this.$store.commit('loading', true);
        const user = await this.getCurrentUser();
        if (user.tokenTrello) {
          const trello = new Trello(
            process.env.VUE_APP_TRELLO_KEY,
            user.tokenTrello,
          );
          const board = await trello.addBoard(this.title);
          const lists = await trello.getListsOnBoard(board.id);
          const idList = lists[0].id;
          this.allPostits.forEach((postit) => {
            const docList = new DOMParser().parseFromString(
              postit.text,
              'text/html',
            );
            const listItem = docList.getElementsByTagName('li');
            const arrayOfItems = Array.from(listItem);
            arrayOfItems.forEach(async (item) => {
              if (item.textContent.includes('#task')) {
                const task = item.textContent.replace('#task', '');
                await trello.addCard(task, null, idList);
              }
            });
          });
          this.$store.commit('loading', false);
          this.showMsgTrelloSuccess();
        } else {
          this.$store.commit('loading', false);
          this.modalTrelloShow = true;
        }
      } catch (err) {
        this.$store.commit('loading', false);
      }
    },

    getCurrentUserId() {
      return this.$firebase.auth().currentUser.uid;
    },

    async getCurrentUser() {
      const userRef = this.$firebase
        .firestore()
        .collection('users')
        .doc(this.getCurrentUserId());
      const docUser = await userRef.get();
      return docUser.data();
    },

    showMsgTrelloSuccess() {
      this.boxTwo = '';
      this.$bvModal
        .msgBoxOk('Tarefas adicionadas ao Trello com sucesso.', {
          title: 'Confirmação',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        })
        .then((value) => {
          this.boxTwo = value;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    handleOkTrello(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.confirmSendingToTrello();
    },

    async confirmSendingToTrello() {
      if (!this.tokenTrello) {
        return;
      }
      const userId = await this.getCurrentUserId();
      const userRef = this.$firebase
        .firestore()
        .collection('users')
        .doc(userId);
      userRef.update({ tokenTrello: this.tokenTrello });
      this.$nextTick(() => {
        this.sendToTrello();
        this.modalTrelloShow = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
