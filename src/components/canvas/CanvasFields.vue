<template>
  <div style="width: 100%; height: 100%">
    <header>
      <div class="canvas-field-icon text-course">
        <img class="img-fluid" :src="'/img/fields/' + fieldName + '.png'" />
      </div>
      <span class="text-dark">{{ fieldTitle ? fieldTitle : fieldName }}</span>
    </header>
    <button :class="{ 'click-block': !planEditable }" :id="fieldName + 'btn-add'" @click="addOpenModal(fieldName)"
class="btn-add">
      <ion-icon style="font-size: 32px !important;" name="add-circle-outline"></ion-icon>
    </button>
    <b-tooltip :target="fieldName + 'btn-add'" variant="secondary" placement="bottom"
      >Clique para adicionar um post-it no campo {{ fieldName }}</b-tooltip
    >
    <div
      :id="fieldName"
      class="box-content text-light"
      @drop="drop($event)"
      @dragover="allowDrop($event)"
    >
      <div
        v-for="(item, index) in postits"
        :key="index"
        :id="item.id"
        :class="'post-it ' + item.classBackgroundColor"
        :draggable="!showUserAvatar(item.editingUser) && planEditable"
        @dragstart="drag($event, item.id)"
      >
        <div class="post-it-config" :class="{ 'click-block': showUserAvatar(item.editingUser) }">
          <button
            :class="{ 'click-block': !planEditable }"
            :id="index + fieldName + '-btn-remove'"
            class="btn-config"
            @click="onRemoveSubmit(item.id)"
          >
            <span class="material-icons">delete</span>
          </button>
          <b-tooltip
            :target="index + fieldName + '-btn-remove'"
            variant="secondary"
            placement="bottom"
            boundary="viewport"
            >Remover post-it</b-tooltip
          >
          <ChangeBackground :docid="item.id" :class="{ 'click-block': !planEditable }"/>
          <button :id="index + fieldName + '-cardInfo'" class="btn-config">
            <span class="material-icons">info</span>
          </button>

          <button
          :class="{ 'click-block': !planEditable }"
            :id="index + fieldName + '-btn-review'"
            @click="changeReview(item.id, item.review)"
            class="btn-config"
          >
            <span class="material-icons">flag</span>
          </button>

          <b-tooltip
            :target="index + fieldName + '-btn-review'"
            variant="secondary"
            placement="bottom"
            boundary="viewport"
            >{{
              item.review ? 'Sinalizar post-it como revisado' : 'Sinalizar post-it para revisão'
            }}</b-tooltip
          >

          <button
          :class="{ 'click-block': !planEditable }"
            :id="index + fieldName + '-btn-edit'"
            class="btn-edit"
            @click="
              loadToEdit(item)
              show = true
            "
          >
            <span class="material-icons">open_in_new</span>
          </button>
          <b-tooltip
            :target="index + fieldName + '-btn-edit'"
            variant="secondary"
            placement="bottom"
            boundary="viewport"
            >Editar post-it</b-tooltip
          >
        </div>

        <div :id="index + fieldName + '-review'" v-if="item.review" class="review">
          <ion-icon name="flag-outline"></ion-icon>
        </div>
        <b-tooltip
          v-if="item.review"
          :target="index + fieldName + '-review'"
          variant="secondary"
          placement="bottom"
          boundary="viewport"
          >Post-it sinalizado para revisão</b-tooltip
        >

        <b-badge
          :id="index + fieldName + '-cardNum'"
          title="Número da Carta PBl"
          class="postit-number"
          variant="light"
        >
          <div class="numberEditable">{{ item.cardNumber }}</div>
        </b-badge>
        <h6 class="pl-1">{{ cartasModel.get(item.cardNumber) }}</h6>
        <ol
          contenteditable="false"
          class="content-editable"
          :class="{ 'click-block': showUserAvatar(item.editingUser) }"
          v-html="item.text"
        >
          {{
            item.text
          }}
        </ol>
        <div class="user-typing" v-if="showUserAvatar(item.editingUser)">
          <img :id="index + fieldName + '-user'" class="editingUser" :src="item.editingUser" />
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span class="hidden">{{ item.userUpdate }}</span>
        <b-tooltip
          :target="index + fieldName + '-cardNum'"
          variant="secondary"
          placement="bottom"
          boundary="viewport"
          >Número da Carta PBL</b-tooltip
        >

        <b-popover
          :target="index + fieldName + '-cardInfo'"
          placement="bottom"
          boundary="viewport"
          triggers="focus"
          variant="secondary"
        >
          <template v-slot:title>Informações</template>
          <span>
            Criado por:
            <b>{{ getUserDisplayNameById(item.userCreated) }}</b>
          </span>
          <br />
          <span>
            Última alteração:
            <b>{{ getUserDisplayNameById(item.userUpdate) }}</b>
          </span>
          <span v-if="item.userReview">
            <br />Revisado por:
            <b>{{ getUserDisplayNameById(item.userReview) }}</b>
          </span>
        </b-popover>
      </div>
    </div>

    <b-modal
      body-class="modal-post-it"
      id="modal-post-it"
      :content-class="backgroundColor"
      v-model="show"
    >
      <template v-slot:modal-title>
          <b-form-invalid-feedback :state="validation"
            >Você precisa selecionar uma carta no menu abaixo.</b-form-invalid-feedback
          >
        <form style="display:flex">
          <b-form-select
            id="selectCard"
            v-model="selectedCard"
            :options="optionsCards"
          ></b-form-select>
          <b-button
            style="padding: 5px"
            id="modal-cartas"
            variant="white"
            @click="openCards()"
            class="nav-link"
          >
            <img style="width: 40px;" class="img-fluid" :src="'/img/icon-cards-black.png'" />
          </b-button>
          <b-tooltip target="modal-cartas" variant="secondary" placement="bottom"
            >Mostrar Cartas</b-tooltip
          >
        </form>
      </template>
      <span style="float: right; margin-right: 5px; color: #567;" id="help">
        <i class="material-icons">help</i>
      </span>
      <ol
        @click="contentEditableModal()"
        contenteditable="true"
        v-html="postItTextEdit"
        class="modal-content-editable"
        data-ph="Digite aqui..."
      >
        {{
          postItTextEdit
        }}
      </ol>
      <b-tooltip trigger="click" target="help" variant="secondary"
placement="bottom">
        Preencha este post-it com as respostas das perguntas da <b>Carta</b> indicada no menu acima. <br />Cada
        número (item) no post-it equivale a uma resposta de uma pergunta. <br />Você pode usar a
        anotação <b>"#task"</b> para marcar um item (uma resposta) como tarefa e depois você poderá
        exportar esta tarefa para o Trello.
      </b-tooltip>
      <template v-slot:modal-footer>
        <div class="row config-modal" style="width: 100%">
          <div class="flex col-md-6-">
            <ChangeBackground :docid="null" />
            <button
              v-if="postItToEdit.userCreated"
              :id="fieldName + '-cardInfo'"
              class="flex btn-config"
            >
              <span class="material-icons">info</span>
            </button>
            <b-popover
              v-if="postItToEdit.userCreated"
              :target="fieldName + '-cardInfo'"
              placement="bottom"
              boundary="viewport"
              triggers="focus"
              variant="secondary"
            >
              <template v-slot:title>Informações</template>
              <span>
                Criado por:
                <b>{{ getUserDisplayNameById(postItToEdit.userCreated) }}</b>
              </span>
              <br />
              <span>
                Última alteração:
                <b>{{ getUserDisplayNameById(postItToEdit.userUpdate) }}</b>
              </span>
              <span v-if="postItToEdit.userReview">
                <br />Revisado por:
                <b>{{ getUserDisplayNameById(postItToEdit.userReview) }}</b>
              </span>
            </b-popover>
          </div>
          <div class="col-md">
            <b-button @click="save()" class="float-right btn-save-modal" variant="primary">Salvar</b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChangeBackground from '@/components/canvas/ChangeBackground.vue';
import CartasModel from '../../model/cartas';
// :class="{ 'click-block': !plan.editable }"
export default {
  name: 'CanvasFields',
  props: {
    planId: String,
    postits: Array,
    fieldName: String,
    fieldTitle: String,
    planEditable: Boolean,
  },
  components: {
    ChangeBackground,
  },
  data() {
    return {
      PLANS_COLLECTION: this.$firebase.firestore().collection('plans'),
      show: false,
      fieldActived: null,
      postItDocId: null,
      selectedCard: null,
      postItTextEdit: '<li></li>',
      backgroundColor: this.getRandomBackgroundClass(),
      busy: false,
      cartasModel: CartasModel,
      clickedSave: false,
      postItToEdit: {},
    };
  },
  computed: {
    ...mapState(['isLoading', 'isLogged']),
    validation() {
      return this.selectedCard != null || (this.selectedCard == null && !this.clickedSave);
    },
    optionsCards() {
      switch (this.fieldActived) {
        case 'curso':
          return [
            { value: null, text: 'Carta?' },
            { value: 1, text: `1 - ${CartasModel.get(1)}` },
            { value: 2, text: `2 - ${CartasModel.get(2)}` },
          ];
        case 'objetivos':
          return [
            { value: null, text: 'Carta?' },
            { value: 3, text: `3 - ${CartasModel.get(3)}` },
            { value: 4, text: `4 - ${CartasModel.get(4)}` },
            { value: 5, text: `5 - ${CartasModel.get(5)}` },
          ];
        case 'indicadores':
          return [
            { value: null, text: 'Carta?' },
            { value: 6, text: `6 - ${CartasModel.get(6)}` },
            { value: 7, text: `7 - ${CartasModel.get(7)}` },
            { value: 8, text: `8 - ${CartasModel.get(8)}` },
            { value: 9, text: `9 - ${CartasModel.get(9)}` },
          ];
        case 'problema':
          return [
            { value: null, text: 'Carta?' },
            { value: 10, text: `10 - ${CartasModel.get(10)}` },
            { value: 11, text: `11 - ${CartasModel.get(11)}` },
            { value: 12, text: `12 - ${CartasModel.get(12)}` },
            { value: 13, text: `13 - ${CartasModel.get(13)}` },
            { value: 14, text: `14 - ${CartasModel.get(14)}` },
          ];
        case 'ambiente':
          return [
            { value: null, text: 'Carta?' },
            { value: 15, text: `15 - ${CartasModel.get(15)}` },
            { value: 16, text: `16 - ${CartasModel.get(16)}` },
            { value: 17, text: `17 - ${CartasModel.get(17)}` },
          ];
        case 'capitalHumano':
          return [
            { value: null, text: 'Carta?' },
            { value: 18, text: `18 - ${CartasModel.get(18)}` },
            { value: 19, text: `19 - ${CartasModel.get(19)}` },
            { value: 20, text: `20 - ${CartasModel.get(20)}` },
            { value: 21, text: `21 - ${CartasModel.get(21)}` },
            { value: 22, text: `22 - ${CartasModel.get(22)}` },
            { value: 23, text: `23 - ${CartasModel.get(23)}` },
          ];
        case 'conteudo':
          return [
            { value: null, text: 'Carta?' },
            { value: 24, text: `24 - ${CartasModel.get(24)}` },
            { value: 25, text: `25 - ${CartasModel.get(25)}` },
          ];
        case 'avaliacao':
          return [
            { value: null, text: 'Carta?' },
            { value: 26, text: `26 - ${CartasModel.get(26)}` },
            { value: 27, text: `27 - ${CartasModel.get(27)}` },
            { value: 28, text: `28 - ${CartasModel.get(28)}` },
            { value: 29, text: `29 - ${CartasModel.get(29)}` },
            { value: 30, text: `30 - ${CartasModel.get(30)}` },
            { value: 31, text: `31 - ${CartasModel.get(31)}` },
            { value: 32, text: `32 - ${CartasModel.get(32)}` },
            { value: 33, text: `33 - ${CartasModel.get(33)}` },
          ];
        case 'processos':
          return [
            { value: null, text: 'Carta?' },
            { value: 34, text: `34 - ${CartasModel.get(34)}` },
            { value: 35, text: `35 - ${CartasModel.get(35)}` },
          ];
        case 'cronograma':
          return [
            { value: null, text: 'Carta?' },
            { value: 36, text: `36 - ${CartasModel.get(36)}` },
            { value: 37, text: `37 - ${CartasModel.get(37)}` },
            { value: 38, text: `38 - ${CartasModel.get(38)}` },
          ];
        case 'riscos':
          return [
            { value: null, text: 'Carta?' },
            { value: 39, text: `39 - ${CartasModel.get(39)}` },
            { value: 40, text: `40 - ${CartasModel.get(40)}` },
          ];
        default:
          return [{ value: null, text: 'N/A' }];
      }
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    show(newValue, oldValue) {
      if (!newValue) {
        this.resetModal();
      }
    },
    // eslint-disable-next-line no-unused-vars
    selectedCard(newValue, oldValue) {
      if (newValue != null) {
        this.$parent.showCard(newValue);
      }
    },
  },
  updated() {
    this.contentEditable();
  },
  methods: {
    //  this.$parent.changeBackgroundColor(docId, newClassBackgroundColor)
    addOpenModal(fieldName) {
      this.fieldActived = fieldName;
      this.show = true;
      // this.$parent.openCards()
      this.updateSidebarPostion();
    },

    openCards() {
      this.$parent.openCards(this.selectedCard);
    },

    allowDrop(ev) {
      ev.preventDefault();
    },

    drop(ev) {
      this.$parent.drop(ev);
    },

    drag(ev, docId) {
      this.$parent.drag(ev, docId);
    },
    loadToEdit(postIt) {
      this.updateSidebarPostion();
      this.postItToEdit = postIt;
      this.selectedCard = postIt.cardNumber;
      this.fieldActived = postIt.field;
      this.postItDocId = postIt.id;
      this.postItTextEdit = postIt.text;
      this.backgroundColor = postIt.classBackgroundColor;
      this.updatePostIt(postIt.id, 'editingUser', this.getPhotoURLCurrentUser());
    },

    updateSidebarPostion() {
      const siderBar = document.getElementById('mySidebar');
      const openCloseButton = document.querySelector('.btnOpenSidebar');
      siderBar.style.top = '0';
      openCloseButton.style.top = '0';
    },

    resetSidebarPostion() {
      const siderBar = document.getElementById('mySidebar');
      const openCloseButton = document.querySelector('.btnOpenSidebar');
      siderBar.style.top = '';
      openCloseButton.style.top = '';
    },

    save() {
      if (this.selectedCard == null) {
        this.clickedSave = true;
        return;
      }
      const contentElement = document.querySelector('.modal-content-editable');
      const modalContent = document.querySelector('.modal-content');
      const data = {
        text: contentElement.innerHTML.trim(),
        cardNumber: this.selectedCard,
        classBackgroundColor: modalContent.classList[1],
        userUpdate: this.getCurrentUserId(),
        field: this.fieldActived,
        docId: this.postItDocId,
      };
      if (data.docId) {
        this.updatePostIt2(data);
      } else {
        this.addPostIt2(data);
      }
      this.show = false;
    },

    addPostIt2(data) {
      const ref = this.PLANS_COLLECTION.doc(this.planId);
      const postIt = {
        cardNumber: data.cardNumber,
        classBackgroundColor: data.classBackgroundColor,
        text: data.text,
        userCreated: this.getCurrentUserId(),
        userUpdate: data.userUpdate,
        editingUser: '',
        field: data.field,
      };
      ref.collection('postits').add(postIt);
    },

    updatePostIt(docId, field, value) {
      const obj = {};
      obj[field] = value;
      const ref = this.PLANS_COLLECTION.doc(this.planId)
        .collection('postits')
        .doc(docId);
      ref.update(obj);
    },

    updatePostIt2(data) {
      const postIt = {
        cardNumber: data.cardNumber,
        classBackgroundColor: data.classBackgroundColor,
        text: data.text,
        userUpdate: data.userUpdate,
        editingUser: '',
        field: data.field,
      };
      const ref = this.PLANS_COLLECTION.doc(this.planId)
        .collection('postits')
        .doc(data.docId);
      ref.update(postIt);
    },

    getRandomBackgroundClass() {
      const classes = ['bg-yellow', 'bg-pink', 'bg-green', 'bg-blue'];
      const indexRandom = Math.floor(Math.random() * 4);
      return classes[indexRandom];
    },

    resetModal() {
      this.resetSidebarPostion();
      if (this.postItDocId) {
        this.updatePostIt(this.postItDocId, 'editingUser', '');
      }
      this.postItToEdit = {};
      this.selectedCard = null;
      this.fieldActived = '';
      this.postItDocId = null;
      this.postItTextEdit = '<li></li>';
      this.backgroundColor = this.getRandomBackgroundClass();
      this.clickedSave = false;
    },

    getCurrentUserId() {
      return this.$firebase.auth().currentUser.uid;
    },

    showUserAvatar(avatarUrl) {
      return avatarUrl && avatarUrl !== this.getPhotoURLCurrentUser();
    },

    getUserDisplayNameById(uid) {
      if (uid == null) {
        return '...';
      }
      return this.$parent.getUserDisplayNameById(uid);
    },

    contentEditableModal() {
      const ol = document.querySelector('.modal-content-editable');
      ol.style.cursor = 'text';
      if (ol.innerHTML.trim() === '') {
        ol.innerHTML = '<li></li>';
      }
      ol.onkeydown = (e) => {
        // backspace or enter
        if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 13) {
          if (ol.innerHTML.trim() === '<li></li>') {
            e.preventDefault();
          } else if (ol.innerHTML.trim() === '' || ol.innerHTML.trim() === '<li><br></li>') {
            ol.innerHTML = '<li></li>';
            e.preventDefault();
          }
        }
      };
      ol.focus();
    },

    contentEditable() {
      const ols = document.getElementsByClassName('content-editable');
      const arrayOfOls = Array.from(ols);
      arrayOfOls.forEach((ol) => {
        ol.onclick = () => {
          if (!this.planEditable) {
            return;
          }
          const docId = ol.parentElement.id;
          this.updatePostIt(docId, 'editingUser', this.getPhotoURLCurrentUser());
          ol.setAttribute('contenteditable', true);
          ol.parentElement.setAttribute('draggable', false);
          ol.style.cursor = 'text';
          if (ol.innerHTML.trim() === '') {
            ol.innerHTML = '<li></li>';
          }
          ol.onkeydown = (e) => {
            // backspace or enter
            if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 13) {
              if (ol.innerHTML.trim() === '<li></li>') {
                e.preventDefault();
              } else if (ol.innerHTML.trim() === '' || ol.innerHTML.trim() === '<li><br></li>') {
                ol.innerHTML = '<li></li>';
                e.preventDefault();
              }
            }
          };
          this.$parent.disablePan();
          ol.focus();
        };
        ol.onblur = () => {
          this.$parent.enablePan();
          if (ol.getAttribute('contenteditable') === 'true') {
            ol.setAttribute('contenteditable', false);
            ol.parentElement.setAttribute('draggable', true);
            ol.style.cursor = 'pointer';
            const newText = ol.innerHTML.trim();
            const docId = ol.parentElement.id;
            this.updatePostItText(docId, 'text', newText);
          }
        };
      });
    },

    updatePostItText(docId, field, value) {
      const obj = {
        userUpdate: this.getCurrentUserId(),
        editingUser: '',
      };
      obj[field] = value;
      const ref = this.PLANS_COLLECTION.doc(this.planId)
        .collection('postits')
        .doc(docId);
      ref.update(obj);
    },

    getPhotoURLCurrentUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.photoURL;
    },

    changeBackgroundColor(docId, newClassBackgroundColor) {
      this.$parent.changeBackgroundColor(docId, newClassBackgroundColor);
    },

    onRemoveSubmit(docId) {
      this.$parent.onRemoveSubmit(docId);
    },

    changeReview(docId, review) {
      const obj = {
        review: !review,
      };
      if (review) {
        obj.userReview = this.getCurrentUserId();
      }
      const ref = this.PLANS_COLLECTION.doc(this.planId)
        .collection('postits')
        .doc(docId);
      ref.update(obj);
    },
  },
};
</script>

<style lang="scss">
.flex {
  display: flex;
  align-items: center;
}
.config-modal .btn-color {
  height: 30px;
  width: 30px;
}

.config-modal .material-icons {
  font-size: 30px;
}
.btn-save-modal{
  border: 1px solid #567;
  font-size: 1.2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>
