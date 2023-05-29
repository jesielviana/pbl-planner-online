<template>
  <div>
    <NavBar
      :allPostits="allPostits"
      :planId="id"
      :title="plan.title"
      :userAdminName="getUserDisplayNameById(plan.userAdmin)"
      :planEditable="plan.editable"
      :userAdminId="plan.userAdmin"
    />
    <Loader :visivel="isLoading">isLoading</Loader>
    <div class="zoom-icons">
      <button id="fullscreen" @click="openFullscreen()">
        <span class="material-icons">fullscreen</span>
      </button>
      <button id="zoom-in">
        <span class="material-icons">zoom_in</span>
      </button>
      <button id="reset">
        <span class="material-icons">control_camera</span>
      </button>
      <button id="zoom-out">
        <span class="material-icons">zoom_out</span>
      </button>
      <b-tooltip
        target="fullscreen"
        variant="secondary"
        placement="bottom"
        boundary="viewport"
      >Tela cheia</b-tooltip>
      <b-tooltip
        target="zoom-in"
        variant="secondary"
        placement="bottom"
        boundary="viewport"
      >Aumentar tamanho do canvas</b-tooltip>
      <b-tooltip target="reset" variant="secondary" placement="bottom"
boundary="viewport">Tamanho Padrão</b-tooltip>
      <b-tooltip
        target="zoom-out"
        variant="secondary"
        placement="bottom"
        boundary="viewport"
      >Diminuir tamanho do canvas</b-tooltip>
    </div>

    <div
      id="mySidebar"
      class="sidebar"
      :class="{
        'sidebar-right': sidebarRight,
        'sidebar-left': !sidebarRight,
        'sidebar-opened': sidebarOpened
      }"
    >
      <Cartas />
    </div>
    <div
      class="btnOpenSidebar"
      :class="{ 'sidebar-right': sidebarRight, 'sidebar-left': !sidebarRight }"
    >
      <a id="close-cards" v-if="sidebarOpened" @click="closeCards()">
        <span class="closeSidebar" v-if="sidebarOpened">
          <i class="material-icons text-dark">close</i>
        </span>
      </a>
      <b-tooltip
        v-if="sidebarOpened"
        target="close-cards"
        variant="secondary"
        :placement="sidebarRight ? 'left' : 'right'"
      >Fechar</b-tooltip>
      <a id="invert-sidebar" v-if="sidebarOpened" @click="invertSidebar()">
        <span class="material-icons">sync_alt</span>
      </a>
      <b-tooltip
        v-if="sidebarOpened"
        target="invert-sidebar"
        variant="secondary"
        trigger="click"
        :placement="sidebarRight ? 'left' : 'right'"
      >Trocar de lado</b-tooltip>
    </div>

    <div class="canvas-page">
      <Presence v-if="isLogged && isNotNewPlan" />
      <div id="fullScreen">
        <div id="canvas-layout" class="canvas-layout">
          <div class="gridContainerGeral">

            <div class="curso" id="course-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="curso"
fieldName="curso"></CanvasFields>
            </div>

            <div class="objetivos" id="objectives-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id"
              :postits="objetivos" fieldName="objetivos"></CanvasFields>
            </div>

            <div
              class="indicadores-sucesso"
              id="indicators-field"

            >
              <CanvasFields  :planEditable="plan.editable"
                :planId="id"
                :postits="indicadores"
                fieldName="indicadores"
                fieldTitle="Indicadores de Sucesso"
              ></CanvasFields>
            </div>

            <div
              class="avaliacao-aprendizagem"
              id="assessment-field"

            >
              <CanvasFields  :planEditable="plan.editable"
                :planId="id"
                :postits="avaliacao"
                fieldName="avaliacao"
                fieldTitle="Avaliação da Aprendizagem"
              ></CanvasFields>
            </div>

            <div class="problema" id="problem-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="problema"
fieldName="problema"></CanvasFields>
            </div>

            <div class="ambiente" id="enviroment-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="ambiente"
fieldName="ambiente"></CanvasFields>
            </div>

            <div class="riscos" id="risks-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="riscos"
fieldName="riscos"></CanvasFields>
            </div>

            <div class="conteudo" id="content-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="conteudo"
fieldName="conteudo"></CanvasFields>
            </div>

            <div class="capital-humano" id="human-field" >
              <CanvasFields  :planEditable="plan.editable"
                :planId="id"
                :postits="capitalHumano"
                fieldName="capitalHumano"
                fieldTitle="Capital Humano"
              ></CanvasFields>
            </div>

            <div class="processos" id="process-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="processos"
fieldName="processos"></CanvasFields>
            </div>

            <div class="cronograma" id="schedule-field" >
              <CanvasFields  :planEditable="plan.editable" :planId="id" :postits="cronograma"
fieldName="cronograma"></CanvasFields>
            </div>
          </div>
          <b-overlay class="b-overlay-canvas" :show="busy" no-wrap
@shown="onShown">
            <template v-slot:overlay>
              <div
                ref="dialog"
                tabindex="-1"
                role="dialog"
                aria-modal="false"
                aria-labelledby="form-confirm-label"
                class="text-center p-3 alert-delete"
              >
                <p style="font-weight: 600;">Confirma a exclusão do post-it?</p>
                <b-alert show variant="danger">
                  <span class="material-icons" style="margin-right: 10px">warning</span>
                  Esta ação excluirá permanentemente este post-it
                </b-alert>
                <div class="d-flex" style="justify-content: center;">
                  <b-button variant="outline-dark" class="mr-3" @click="onCancel">Cancelar</b-button>
                  <b-button variant="danger" @click="removePostIt">Excluir</b-button>
                </div>
              </div>
            </template>
          </b-overlay>
        </div>
      </div>
    </div>
    <Tour> </Tour>
  </div>
</template>

<script>
/* eslint-disable prefer-destructuring */
import firebase from 'firebase/app';
import { mapState } from 'vuex';
import JsPdf from 'jspdf';
import CanvasFields from '@/components/canvas/CanvasFields.vue';
import Loader from '@/components/Loader.vue';
import Presence from '@/components/Presence.vue';
import { EventBus } from '@/event-bus';
import NavBar from '@/components/Navbar.vue';
import Cartas from '@/components/Cartas.vue';
import Tour from '@/components/canvas/Tour.vue';
import html2canvas from 'html2canvas';
// https://timmywil.com/panzoom/demo/
import Panzoom from '@panzoom/panzoom';

export default {
  name: 'CanvasLayout',
  components: {
    NavBar,
    Loader,
    Presence,
    Cartas,
    CanvasFields,
    Tour,
  },
  data() {
    return {
      busy: false,
      panzoom: null,
      sidebarOpened: false,
      sidebarRight: true,
      PLANS_COLLECTION: this.$firebase.firestore().collection('plans'),
      allPostits: [],
      postits: [],
      objetivos: [],
      curso: [],
      indicadores: [],
      problema: [],
      ambiente: [],
      avaliacao: [],
      conteudo: [],
      capitalHumano: [],
      processos: [],
      cronograma: [],
      riscos: [],
      isNotNewPlan: true,
      plan: {},
      id: this.$route.params.id,
      roomId: '',
      task: [],
      loadingFistTime: true,
      user: {},
      usersMap: new Map(),
      fields: [
        'postit',
        'curso',
        'riscos',
        'objetivos',
        'avaliacao',
        'problema',
        'ambiente',
        'processos',
        'capitalHumano',
        'indicadores',
        'cronograma',
        'conteudo',
      ],
    };
  },
  computed: {
    ...mapState(['isLoading', 'isLogged']),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    id(newValue, oldValue) {
      this.loadPlan(newValue);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    try {
      const { id } = this;
      if (id) {
        this.loadPlan(id);
      } else {
        const idFromPath = this.$route.path.split('/').slice(-1);
        this.loadPlan(idFromPath);
        this.id = idFromPath;
      }
      this.saveUserData(this.id);
    } catch (error) {
      console.error(error);
    }
    this.initZoom();
  },
  created() {
    window.addEventListener('drag', this.enableScrolling, false);
    EventBus.$on('planId', (id) => {
      this.id = id;
      this.loadPlan(this.id);
    });
    EventBus.$on('usersMap', (usersMapEvent) => {
      this.usersMap = usersMapEvent;
    });
  },
  updated() {},
  methods: {

    showTour() {
      this.$tours.myTour.start();
    },
    // I adjust the window scrolling in response to the given draging event.
    enableScrolling(event) {
      // https://bit.ly/302Fk12
      const edgeSize = 100;
      let timer = null;
      const viewportY = event.clientY;

      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      const edgeTop = edgeSize;

      const isInTopEdge = viewportY < edgeTop;

      if (!isInTopEdge) {
        clearTimeout(timer);
        return;
      }

      const documentWidth = Math.max(
        document.body.scrollWidth,
        document.body.offsetWidth,
        document.body.clientWidth,
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
      );
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.body.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
      );

      const maxScrollX = documentWidth - viewportWidth;
      const maxScrollY = documentHeight - viewportHeight;

      (function checkForWindowScroll() {
        clearTimeout(timer);

        // eslint-disable-next-line no-use-before-define
        if (adjustWindowScroll()) {
          timer = setTimeout(checkForWindowScroll, 30);
        }
      }());

      function adjustWindowScroll() {
        const currentScrollX = window.pageXOffset;
        const currentScrollY = window.pageYOffset;
        const canScrollUp = currentScrollY > 0;
        let nextScrollX = currentScrollX;
        let nextScrollY = currentScrollY;
        const maxStep = 50;

        if (isInTopEdge && canScrollUp) {
          const intensity = (edgeTop - viewportY) / edgeSize;
          nextScrollY -= maxStep * intensity;
        }

        nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));
        nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));

        if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
          window.scrollTo(nextScrollX, nextScrollY);
          return true;
        }
        return false;
      }
    },

    getCurrentUserId() {
      return this.$firebase.auth().currentUser.uid;
    },

    getUserDisplayNameById(uid) {
      if (uid == null) {
        // temporário, depois remvover
        uid = this.getCurrentUserId();
      }
      if (this.usersMap.get(uid)) {
        return this.usersMap.get(uid).displayName;
      }
      return '...';
    },
    // #pdf
    exportPlanToPDF() {
      this.$store.commit('loading', true);
      const source = document.getElementById('canvas-layout');
      const contentEditableElements = document.querySelectorAll('.content-editable');

      function configLayoutToPdf() {
        source.style.marginLeft = '22px';
        source.style.marginTop = '50px';
        source.style.width = '1640px';

        for (let index = 0; index < contentEditableElements.length; index += 1) {
        // content-editable-print-pdf
          contentEditableElements[index].classList.add('content-editable-print-pdf');
        }
      }

      function resetConfigLayoutToPdf() {
        source.style.marginLeft = null;
        source.style.width = null;
        source.style.marginTop = null;
        for (let index = 0; index < contentEditableElements.length; index += 1) {
        // content-editable-print-pdf
          contentEditableElements[index].classList.remove('content-editable-print-pdf');
        }
      }

      try {
        configLayoutToPdf();
        const fileName = this.plan.title;
        const height = source.offsetHeight + 150;
        const widthA1 = 1684;
        const doc = new JsPdf({
          orientation: height > widthA1 ? 'portrait' : 'landscape',
          unit: 'pt',
          format: [height, 1684], // 1684 A1
        });
        window.html2canvas = html2canvas;
        const store = this.$store;
        doc.html(source, {
          callback(docSave) {
            docSave.save(`${fileName.trim()}.pdf`);
            resetConfigLayoutToPdf();
            store.commit('loading', false);
          },
        });
      } catch (err) {
        resetConfigLayoutToPdf();
        this.$store.commit('loading', false);
      }
    },

    allowDrop(ev) {
      ev.preventDefault();
    },

    drag(ev, docId) {
      ev.dataTransfer.setData('id', ev.target.id);
      ev.dataTransfer.setData('field', ev.target.parentElement.id);
      ev.dataTransfer.setData('docId', docId);
    },

    drop(ev) {
      ev.preventDefault();
      const docId = ev.dataTransfer.getData('docId');
      let field = ev.target.id;
      if (this.fields.includes(ev.target.id)) {
        field = ev.target.id;
      }
      if (this.fields.includes(ev.target.parentElement.id)) {
        field = ev.target.parentElement.id;
      }
      if (this.fields.includes(ev.target.parentElement.parentElement.id)) {
        field = ev.target.parentElement.parentElement.id;
      }
      if (
        this.fields.includes(
          ev.target.parentElement.parentElement.parentElement.id,
        )
      ) {
        field = ev.target.parentElement.parentElement.parentElement.id;
      }
      if (
        this.fields.includes(
          ev.target.parentElement.parentElement.parentElement.parentElement.id,
        )
      ) {
        field = ev.target.parentElement.parentElement.parentElement.parentElement.id;
      }
      this.updatePostIt(docId, 'field', field);
    },

    loadPlan(planId) {
      try {
        this.PLANS_COLLECTION.doc(planId).onSnapshot((doc) => {
          if (doc.exists) {
            this.plan = doc.data();
            EventBus.$emit('plan-title', this.plan.title);
            EventBus.$emit('usersByPlan', this.plan.users);
          } else {
            this.$router.push({
              name: 'planejamentos',
              params: { erros: true },
            });
          }
        });
        this.loadPostits(planId);
      } catch (error) {
        console.error(error);
      }
    },

    loadPostits(planId) {
      try {
        const ref = this.$firebase
          .firestore()
          .collection('plans')
          .doc(planId)
          .collection('postits');
        ref.orderBy('cardNumber').onSnapshot((querySnapshot) => {
          this.resetDomPostIts();
          querySnapshot.forEach(async (doc) => {
            const postit = doc.data();
            postit.id = doc.id;
            this.addPostitToField(postit);
          });
        });
      } catch (error) {
        console.error(error);
      }
    },

    resetDomPostIts() {
      this.allPostits = [];
      this.postits = [];
      this.curso = [];
      this.objetivos = [];
      this.indicadores = [];
      this.problema = [];
      this.ambiente = [];
      this.avaliacao = [];
      this.conteudo = [];
      this.capitalHumano = [];
      this.processos = [];
      this.cronograma = [];
      this.riscos = [];
    },

    addPostitToField(postit) {
      this.allPostits.push(postit);
      switch (postit.field) {
        case 'curso':
          this.curso.push(postit);
          break;
        case 'objetivos':
          this.objetivos.push(postit);
          break;
        case 'indicadores':
          this.indicadores.push(postit);
          break;
        case 'problema':
          this.problema.push(postit);
          break;
        case 'ambiente':
          this.ambiente.push(postit);
          break;
        case 'avaliacao':
          this.avaliacao.push(postit);
          break;
        case 'conteudo':
          this.conteudo.push(postit);
          break;
        case 'capitalHumano':
          this.capitalHumano.push(postit);
          break;
        case 'processos':
          this.processos.push(postit);
          break;
        case 'cronograma':
          this.cronograma.push(postit);
          break;
        case 'riscos':
          this.riscos.push(postit);
          break;
        default:
          this.postits.push(postit);
      }
    },

    async saveUserData(planId) {
      try {
        const userId = this.getCurrentUserId();
        const ref = this.$firebase
          .firestore()
          .collection('plans')
          .doc(planId);
        ref.update({
          users: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      } catch (error) {
        console.error(error);
      }
    },

    revise() {
      console.info('Revisado');
    },

    updatePostIt(docId, field, value) {
      const obj = {};
      obj[field] = value;
      const ref = this.PLANS_COLLECTION.doc(this.id)
        .collection('postits')
        .doc(docId);
      ref.update(obj);
    },

    changeBackgroundColor(docId, newClassBackgroundColor) {
      const element = document.getElementById(docId);
      element.classList.remove(element.classList[1]);
      element.classList.add(newClassBackgroundColor);
      this.updatePostIt(docId, 'classBackgroundColor', newClassBackgroundColor);
    },

    openCloseSidebar() {
      if (this.sidebarOpened) {
        this.closeCards();
      } else {
        this.openCards();
      }
    },

    openCards(card) {
      const siderBar = document.getElementById('mySidebar');
      const openCloseButton = document.querySelector('.btnOpenSidebar');
      siderBar.style.width = '355px';
      openCloseButton.style.backgroundColor = '#fafafa';
      this.sidebarOpened = true;
      if (this.sidebarRight) {
        openCloseButton.style.right = '345px';
        siderBar.style.right = '0';
        siderBar.style.left = null;
      } else {
        openCloseButton.style.left = '345px';
        siderBar.style.left = '0';
        siderBar.style.right = null;
      }
      if (card) {
        const elmnt = document.getElementById(card);
        elmnt.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    },

    showCard(cardNum) {
      const elmnt = document.getElementById(cardNum);
      elmnt.scrollIntoView({ block: 'center', behavior: 'instant' });
    },

    closeCards() {
      const siderBar = document.getElementById('mySidebar');
      const openCloseButton = document.querySelector('.btnOpenSidebar');
      siderBar.style.width = '0';
      openCloseButton.style.backgroundColor = 'transparent';
      this.sidebarOpened = false;
      if (this.sidebarRight) {
        openCloseButton.style.right = '0';
        siderBar.style.right = '-350px';
      } else {
        openCloseButton.style.left = '0';
        siderBar.style.left = '-350px';
      }
    },

    invertSidebar() {
      this.sidebarRight = !this.sidebarRight;
      const siderBar = document.getElementById('mySidebar');
      const openCloseButton = document.querySelector('.btnOpenSidebar');
      if (this.sidebarRight) {
        openCloseButton.style.right = '345px';
        openCloseButton.style.left = null;
        siderBar.style.right = '0';
        siderBar.style.left = null;
      } else {
        openCloseButton.style.right = null;
        openCloseButton.style.left = '345px';
        siderBar.style.left = '0';
        siderBar.style.right = null;
      }
    },

    openFullscreen() {
      const elem = document.querySelector('body');
      elem.style.overflow = 'auto';
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    onShown() {
      // Focus the remove dialog prompt
      this.$refs.dialog.focus();
    },
    onRemoveSubmit(docId) {
      this.postItDocIdToRemove = docId;
      this.busy = true;
    },
    onCancel() {
      this.postItDocIdToRemove = '';
      this.busy = false;
    },
    async removePostIt() {
      await this.PLANS_COLLECTION.doc(this.id)
        .collection('postits')
        .doc(this.postItDocIdToRemove)
        .delete();
      this.postItDocIdToRemove = '';
      this.busy = false;
    },

    initZoom() {
      const elem = document.querySelector('#canvas-layout');
      const zoomInButton = document.querySelector('#zoom-in');
      const resetButton = document.querySelector('#reset');
      const zoomOutButton = document.querySelector('#zoom-out');
      this.panzoom = Panzoom(elem, {
        excludeClass: 'post-it',
      });
      zoomInButton.addEventListener('click', this.panzoom.zoomIn);
      resetButton.addEventListener('click', this.panzoom.reset);
      zoomOutButton.addEventListener('click', this.panzoom.zoomOut);
    },

    disablePan() {
      this.panzoom.setOptions({
        exclude: [document.querySelector('.gridContainerGeral')],
      });
    },

    enablePan() {
      this.panzoom.setOptions({ exclude: [] });
    },
    getLogo() {
      /* eslint-disable max-len */
      const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAG4CAYAAAA3yvKzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRCNDFEMzE4NkI5NTExRUE5NzAwOEYwMjA1NkM2QTRCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRCNDFEMzE5NkI5NTExRUE5NzAwOEYwMjA1NkM2QTRCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REI0MUQzMTY2Qjk1MTFFQTk3MDA4RjAyMDU2QzZBNEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REI0MUQzMTc2Qjk1MTFFQTk3MDA4RjAyMDU2QzZBNEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bo82/AACJw0lEQVR42uxdB5hb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';
      return imgData;
    },
  },
};
</script>
<style>
#avaliacao,
#conteudo {
  padding-right: 35%;
}

.avaliacao-aprendizagem .btn-add,
.conteudo .btn-add {
  right: 34%;
}

#ambiente,
#capitalHumano {
  padding-left: 35%;
}

.ambiente .btn-add,
.capital-humano .btn-add {
  left: 34%;
}

.problema header,
.objetivos header,
.cronograma header {
  justify-content: center;
}

#enviroment-field header,
#indicators-field header,
#process-field header,
#human-field header {
  flex-direction: row-reverse;
  justify-content: end;
  margin-right: 2px;
}

#enviroment-field .canvas-field-icon,
#indicators-field .canvas-field-icon,
#human-field .canvas-field-icon,
#process-field .canvas-field-icon {
  margin-right: 0;
  margin-left: 5px;
}

.indicadores-sucesso .btn-add,
.processos .btn-add {
  left: 5px;
}

.btn-collapse {
  padding: 0;
  font-size: 1.1rem;
}

.btn-collapse:after {
  font-family: "Material Icons";
  content: "keyboard_arrow_up";
}

section .collapse {
  border: 1px solid #eee;
  border-radius: 5px;
}

.collapsed:after {
  font-family: "Material Icons";
  content: "keyboard_arrow_down";
}
.alert {
  margin-top: 10px;
  text-align: center;
}

.gridContainerGeral header span {
  font-weight: 600;
  text-transform: uppercase;
}

/* remove drag and drop  */
.btn-add {
  line-height: 0;
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  align-items: center;
  color: #51c5e6;
  padding: 0;
  border-radius: 100%;
  background-color: #fff !important;
  border: none !important;
  outline: 0px solid transparent;
  z-index: 1;
}

.btn-add:focus {
  outline: 0px solid transparent;
}

.btn-add .material-icons {
  font-size: 32px;
}

#modal-post-it .modal-content {
  border: none;
  border-radius: 0;
}

#modal-post-it .modal-body {
  padding: 0;
}
.modal-content-editable {
  border: none;
  min-height: 250px;
  padding: 1rem;
}
[contenteditable] {
  outline: 0px solid transparent;
}
#modal-post-it .modal-header {
  border-bottom: none;
}
#modal-post-it .modal-footer {
  border-top: none;
  justify-content: center;
  flex-direction: column;
}
#modal-post-it [contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-ph);
}

#modal-post-it .custom-select {
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  border: none;
  padding-left: 5px;
  font-weight: 500;
  font-size: 1.3rem;
  color: #567;
}
#modal-post-it .custom-select:focus {
  background-color: rgba(255, 255, 255, 0.4) !important;
  outline: none;
}
[contenteditable]:focus {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.zoom-icons {
width: 200px;
    margin-left: calc(50% - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 65px;
  background-color: #fff;
  transition: top 1s, opacity 0.5s;
  border-radius: 0 0 3px 3px;
}

.zoom-icons button {
  border: none;
  border-radius: 2px;
  background: transparent;
  margin-right: 16px;
  display: flex;
  align-items: center;
}
.zoom-icons .material-icons {
  color: #51c5e6;
}

.zoom-icons .custom-range {
  width: 200px;
}
.b-overlay-canvas .position-absolute {
  top: 10% !important;
  transform: translateX(-50%) translateY(-10%) !important;
}
.b-overlay-canvas .position-absolute.bg-light {
  top: 0 !important;
  transform: translateY(0) !important;
}
.alert-delete .alert-danger {
  display: flex;
  align-items: center;
}
#fullScreen{
  overflow: visible !important;
}
</style>
