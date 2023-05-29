<template>
  <div>
    <b-navbar
      fixed="top"
      toggleable="lg"
      type="light"
      variant
    >
      <b-navbar-brand>
        <a href="/">
          <img
            class="img-logo"
            :src="'/img/logo.png'"
          />
        </a>
        <div v-if="$route.name === 'planejamento'">
          <div style="display: flex">
            <h4
              onkeypress="return(this.innerText.length < 40)"
              id="planTitle"
              contenteditable="true"
              :class="{ 'click-block': !planEditable }"
            >
              {{ title }}
            </h4>
            <button
              id="btn-status"
              @click="updatePlanStatus(userAdminId)"
              class="btn-status"
              v-if="$route.name === 'planejamento'"
            >
              <span
                v-if="planEditable"
                class="material-icons"
              >lock_open</span>
              <span
                v-if="!planEditable"
                class="material-icons"
              >lock</span>
            </button>
          </div>
          <p class="userAdmin">Planejamento criado por {{ userAdminName }}</p>
        </div>
        <b-tooltip
          v-if="$route.name === 'planejamento'"
          target="btn-status"
          variant="secondary"
          placement="bottom"
        >
          <span v-if="!planEditable">
            O planejamento está fechado para edição.
            <br />
            {{ isUserAdmin() ? 'Clique para abrir.' : 'Somente quem criou pode abrir.' }}
          </span>
          <span v-if="planEditable">
            O planejamento está aberto pra edição.
            <br />
            {{ isUserAdmin() ? 'Clique para fechar. ' : 'Somente quem criou pode fechar.' }}
          </span>
        </b-tooltip>

        <b-tooltip
          v-if="$route.name === 'planejamento'"
          target="planTitle"
          variant="secondary"
          placement="bottom"
        >Renomear</b-tooltip>
      </b-navbar-brand>
      <h4
        class="text-capitalize"
        v-if="$route.name !== 'planejamento'"
      >{{ $route.name }}</h4>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <div class="ml-auto pl-4 pr-4 users-online">
          <ul class="collaborators">
            <li
              v-for="(user, index) in usersFromCurrentPlan"
              :key="index"
            >
              <b-avatar
                style="width: 2rem !important; height: 2rem !important"
                :id="index + 'user-online'"
                :variant="user.isOnline ? 'success' : 'secondary'"
                v-if="user.photoURL"
                :src="user.photoURL"
              ></b-avatar>
              <b-avatar
                style="width: 2rem !important; height: 2rem !important"
                :id="index + 'user-online'"
                v-else
                variant="secondary"
              ></b-avatar>
              <b-tooltip
                v-if="$route.name === 'planejamento'"
                :target="index + 'user-online'"
                :variant="user.isOnline ? 'success' : 'secondary'"
                placement="bottom"
              >{{ user.displayName }}
                {{ user.isOnline ? 'está online' : 'está offline' }}</b-tooltip>
            </li>
          </ul>
        </div>
        <b-navbar-nav>
          <li
            v-if="isLogged && $route.name === 'planejamento'"
            class="nav-item"
          >
            <b-button
              id="menu-cartas"
              style="padding: 1px 2px"
              variant="white"
              @click="openCloseSidebar()"
              class="nav-link btn-light"
            >
              <img
                style="width: 32px;"
                class="img-fluid"
                :src="'/img/icon-cards-black.png'"
              />
            </b-button>
            <b-tooltip
              target="menu-cartas"
              variant="secondary"
              placement="bottom"
            >
              Mostrar Cartas
            </b-tooltip>
          </li>

          <li
            v-if="isLogged && $route.name === 'planejamento'"
            class="nav-item"
          >
            <b-button
              variant="white"
              id="menu-share"
              v-b-modal.modal-share
              class="nav-link btn-light"
            >
              <i class="material-icons">share</i>
            </b-button>
            <b-tooltip
              target="menu-share"
              variant="secondary"
              placement="bottom"
            >
              Qualquer pessoa com o link pode acessar e alterar o planejamento
            </b-tooltip>
          </li>

          <li
            v-if="isLogged && $route.name === 'planejamento'"
            class="nav-item"
          >
            <b-button
              id="menu-new"
              variant="white"
              v-b-modal.modal-prevent-closing
              class="text-primary nav-link btn-light"
            >
              <i class="material-icons">add</i>
            </b-button>
            <b-tooltip
              target="menu-new"
              variant="secondary"
              placement="bottom"
            >Novo Planejamento</b-tooltip>
          </li>

          <li
            v-if="isLogged && $route.name === 'planejamentos'"
            class="nav-item"
          >
            <b-button
              variant="outline-primary"
              v-b-modal.modal-prevent-closing
              class="nav-link"
            >
              <i class="material-icons">add</i>
              Novo Planejamento
            </b-button>
          </li>

          <!-- <li class="nav-item" v-if="isLogged && $route.name === 'planejamentos'">
            <a
              target="_blank"
              href="https://pblplanner.online/"
              class="btn nav-link btn-outline-light"
            >
              <i style="margin-right: 5px" class="material-icons">home</i> Início
            </a>
          </li> -->

          <li
            class="nav-item"
            v-if="!isLogged && $route.path !== '/login'"
          >
            <router-link
              id="menu-login"
              to="/"
              class="btn btn-primary"
            >Login</router-link>
          </li>

          <li
            v-if="isLogged && $route.name === 'planejamento'"
            class="nav-item"
          >
            <b-button
              id="menu-help"
              variant="white"
              v-b-modal.modal-help
              class="text-primary nav-link btn-light"
            >
              <i class="material-icons">help</i>
            </b-button>
            <b-tooltip
              target="menu-help"
              variant="secondary"
              placement="bottom"
            >Ajuda</b-tooltip>
          </li>

          <li
            v-if="isLogged && $route.name === 'planejamento'"
            class="nav-item"
          >
            <Newchat
              :titleChat="title"
              :planId="planId"
            />
          </li>

          <b-nav-item-dropdown
            v-if="$route.name === 'planejamento'"
            id="options"
            class="avatar btn-light more"
            right
          >
            <template slot="button-content">
              <span class="material-icons">more_vert</span>
            </template>
            <b-dropdown-item>
              <TeachingPlan
                :allPostits="allPostits"
                :title="title"
              />
            </b-dropdown-item>
            <b-dropdown-item
              href="#"
              @click="exportPlanToPDF()"
            >Exportar Canvas</b-dropdown-item>
            <b-dropdown-item>
              <TrelloComponent
                :allPostits="allPostits"
                :title="title"
              />
            </b-dropdown-item>
            <b-tooltip
              class="text-left"
              target="options"
              variant="secondary"
              placement="bottom"
            >
              Gerar plano de ensino <br />
              Exportar canvas <br />
              Enviar tarefas para o Trello.
            </b-tooltip>
          </b-nav-item-dropdown>

          <li
            class="nav-item"
            v-if="isLogged && $route.name !== 'planejamentos'"
          >
            <router-link
              to="/planejamentos"
              class="btn nav-link btn-light"
            >
              <span class="material-icons">
                home
              </span>
              <span
                v-if="$route.name !== 'planejamento'"
                style="margin-left: 5px"
              >Meus Planejamentos</span>
            </router-link>
          </li>

          <b-nav-item-dropdown
            id="userAvatar"
            class="avatar"
            right
            v-if="isLogged"
          >
            <template slot="button-content">
              <b-avatar
                variant="primary"
                v-if="user.photoURL"
                :src="user.photoURL"
              ></b-avatar>
              <b-avatar
                v-else
                variant="primary"
              ></b-avatar>
            </template>
            <b-dropdown-item to="/perfil">
              Perfil
            </b-dropdown-item>
            <b-dropdown-item
              href="#"
              @click="signOut()"
            >Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <NewPlanModal />
    <b-modal
      size="xl"
      id="modal-share"
      title="Compartilhar"
      hide-footer
    >
      <ShareModal :url="url"></ShareModal>
    </b-modal>
    <b-modal
      ref="modal-help"
      scrollable
      size="lg"
      id="modal-help"
      title="Ordem de Preenchimeto do PBL Canvas"
      hide-footer
    >
      <p class="my-4">
        O preenchimendo do PBL Canvas deve ser realizado respondendo adequadamente a cada pergunta
        contida nas Cartas PBL. A ordem de preenchimento sugerida é a seguinte:
      </p>
      <ol>
        <li>
          <b>Objetivos e metas</b>
          <br />Inicie o preenchimento do planejamento pelos campos
          <strong>Curso, Objetivos e Indicadores de Sucesso</strong>
          , nesta ordem (da carta 1 a 9). Estes campos definem o contexto do curso a ser planejado
          bem como os objetivos e metas a serem alcançadas. Para cada carta deve ser preenchido um
          post-it dentro do campo relacionado. Cada resposta deve gerar um item no post-it com o
          número da pergunta.
        </li>
        <br />
        <li>
          <b>Elementos da xPBL</b>
          <br />Em seguida preencha os campos provenientes da metodologia xPBL, que são:
          <b>Problema, Ambiente, Capital Humano, Conteúdo e Avaliação da Aprendizagem</b>. Estes são
          os elementos centrais do planejamento e que estão mais intimamente relacionados com o
          método PBL.O processo de preenchimento é idêntico ao da etapa 1, iniciando na carta de
          número <b>10 até a 33</b>.
        </li>
        <br />
        <li>
          <b>Processos e acompanhamento</b>
          <br />Por fim, é feito o fechamento do planejamento com os campos de
          <b>Processo, Cronograma e Riscos</b>. As cartas para preenchimento destes campos vão do
          número
          <b>34 a 40</b>
          e, após a carta de número 40 ter sido respondida, o preenchimento do canvas estará
          concluído.
        </li>
      </ol>
      <div class="text-center">
        <b-button
          variant="primary"
          @click="showTour()"
        >
          Fazer tour
        </b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import { EventBus } from '@/event-bus';
import TrelloComponent from '@/components/canvas/TrelloComponent.vue';
import TeachingPlan from '@/components/canvas/TeachingPlan.vue';
import Newchat from '@/components/canvas/Newchat.vue';
import ShareModal from '@/components/ShareModal.vue';
import NewPlanModal from './canvas/NewPlanModal.vue';

export default {
  name: 'Navbar',
  components: {
    NewPlanModal,
    TrelloComponent,
    TeachingPlan,
    Newchat,
    ShareModal,
  },
  props: {
    allPostits: Array,
    title: String,
    userAdminName: String,
    planEditable: Boolean,
    userAdminId: String,
    planId: String,
  },
  data() {
    return {
      user: {
        photoURL: 'img/profile_placeholder.png',
      },
      usersFromCurrentPlan: [],
      url: window.location.href,
      notShowBlockedToast: false,
    };
  },
  computed: {
    ...mapState(['isLogged']),
  },
  mounted() {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged != null) {
      this.user = userLogged;
    }
    EventBus.$on('usersFromCurrentPlan', (usersFromCurrentPlanEvent) => {
      this.usersFromCurrentPlan = usersFromCurrentPlanEvent.filter(
        (user) => user.id !== this.getCurrentUserId(),
      );
    });
    this.closeAllTooltips();
  },
  updated() {
    this.url = window.location.href;
    this.handleTitleSubmit();
    if (this.title != null && !this.planEditable && !this.notShowBlockedToast) {
      this.showBlockedToast();
    }
  },
  methods: {
    showTour() {
      this.$refs['modal-help'].hide();
      this.$parent.showTour();
    },

    getCurrentUserId() {
      return this.$firebase.auth().currentUser.uid;
    },

    isUserAdmin() {
      return this.userAdminId === this.getCurrentUserId();
    },

    closeAllTooltips() {
      const elements = document.getElementsByTagName('a');
      for (let i = 0, len = elements.length; i < len; i += 1) {
        elements[i].onclick = () => {
          this.$root.$emit('bv::hide::tooltip');
        };
      }
    },
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          console.info('Logout Success!');
          localStorage.removeItem('user');
          this.$router.push('/');
        })
        .catch((error) => {
          console.error('Logout Error', error);
        });
    },

    async handleTitleSubmit() {
      const titleEditable = document.getElementById('planTitle');
      if (titleEditable) {
        const planId = this.$route.params.id;
        titleEditable.onblur = () => {
          const newTitle = titleEditable.textContent.trim();
          if (this.isFormValid(newTitle)) {
            const ref = this.$firebase
              .firestore()
              .collection('plans')
              .doc(planId);
            ref.update({
              title: newTitle,
              lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            });
          } else {
            console.error('invalid title');
            titleEditable.textContent = this.title;
          }
        };
      }
    },

    isFormValid(title) {
      return title != null && title.length > 3 && title.length < 41;
    },

    exportPlanToPDF() {
      this.$parent.exportPlanToPDF();
    },

    openCloseSidebar() {
      this.$parent.openCloseSidebar();
    },

    openFullscreen() {
      this.$parent.openFullscreen();
    },

    updatePlanStatus() {
      if (this.isUserAdmin()) {
        try {
          const newState = !this.planEditable;
          const ref = this.$firebase
            .firestore()
            .collection('plans')
            .doc(this.planId);
          ref.update({
            editable: newState,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
          });
          this.notShowBlockedToast = true;
          this.showToast(newState);
        } catch (error) {
          //
          console.error(error);
        }
      }
    },
    showToast(state) {
      this.$bvToast.toast(
        state
          ? 'O planejamento está aberto pra edição.'
          : 'O planejamento está fechado para edição.',
        {
          title: 'Aviso!',
          toaster: 'b-toaster-top-center',
          variant: 'success',
          autoHideDelay: 3000,
          solid: true,
        },
      );
    },

    showBlockedToast() {
      this.$bvToast.toast('O planejamento está fechado para edição.', {
        title: 'Aviso!',
        toaster: 'b-toaster-top-center',
        variant: 'warning',
        autoHideDelay: 500000,
        solid: true,
      });
      this.notShowBlockedToast = true;
    },
  },
};
</script>

<style>
.navbar-collapse {
  background-color: #fff;
}

.navbar-collapse.show {
  border-bottom: 1px solid #ccc;
}

.navbar {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  height: 65px;
  border: 1px solid #eee;
}
.img-logo {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.img-avatar {
  background-image: url('/img/profile_placeholder.png');
  background-repeat: no-repeat;
  background-size: 32px;
  border-radius: 20px;
  height: 32px;
  width: 32px;
  margin: 0 5px;
  max-width: 100%;
  border-radius: 100%;
  vertical-align: middle;
}

.users-online {
  text-align: right;
  max-width: 40%;
}

.users-online ul {
  /* white-space: nowrap; */
  padding-right: 20px;
}

.users-online ul li {
  margin-right: -0.5rem;
  display: inline;
  position: relative;
}

.users-online ul li:last-child {
  margin-right: 0;
}

.users-online ul {
  margin: 0;
  padding: 0;
}

.navbar-nav .nav-link {
  display: block;
  padding: 0.3rem 1rem;
  position: relative;
}
</style>

<style>
.nav-item .btn {
  display: flex;
}

.nav-item {
  margin-right: 0.5rem;
}

.nav-item .material-icons {
  font-size: 24px;
}

#planTitle {
  padding: 2px 1rem 2px 5px;
  margin-right: 5px;
  border-radius: 2px;
  border: 2px solid #fff;
}

#planTitle:hover {
  border: 2px solid #eee;
}

.userAdmin {
  margin: 0;
  font-size: 14px;
  color: #567;
  padding-left: 5px;
}

nav h4 {
  margin: 0;
}
</style>
<style lang="scss">
#modal-share .modal-body,
#modal-share2 .modal-body {
  text-align: center;
}

.nav-link:hover {
  background-color: rgba(32, 33, 36, 0.039);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.dropdown-menu {
  border-color: #51c5e6;
}

ul .dropdown-menu::before {
  content: '';
  position: absolute;
  bottom: 100%;
  right: calc(8% - 8px);
  margin-left: -5px;
  border-width: 10px 5px;
  border-style: solid;
  border-color: transparent transparent #51c5e6 transparent;
}

ul .dropdown-menu {
  padding-left: 5px;
  padding-right: 5px;
}

ul .dropdown-menu li {
  border-bottom: 1px solid #51c5e6;
}

ul .dropdown-menu li:last-child {
  border-bottom: none;
}

#userAvatar .nav-link {
  padding: 0.3rem 0;
}
#planTitle:focus {
  background-color: #fff !important;
  border: 2px solid #007bff;
}
.btn-status {
  padding: 3px 7px 0px 7px;
  background-color: #fcfcfc;
  border: none;
  border-radius: 3px;
}
.btn-status:focus {
  outline: 0px solid transparent;
}
.share-link {
  justify-content: space-between;
  border: 1px solid #eee;
  background-color: #fafafa;
  border-radius: 2px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.share-link input {
  margin-left: 4px;
  border: none;
  overflow: hidden;
  white-space: nowrap;
  background-color: transparent;
  color: #567;
  font-size: 0.9rem;
}

.share-link button,
.share-link button:hover,
.share-link button:focus {
  background-color: transparent;
  border: none;
  color: #007bff;
  outline: 0px solid transparent;
}
#modal-share .modal-xl {
  max-width: 620px !important;
}
.avatar .nav-link:hover {
  background: transparent;
}
.dropdown-item.active,
.dropdown-item:active {
  color: #16181b;
  text-decoration: none;
  background-color: #f8f9fa;
}
.more{
  border-radius: 0.25rem;
  border: 1px solid #f8f9fa;
}

.more:hover{
  background-color: rgba(32, 33, 36, 0.039);
  border: 1px solid #dae0e5;
}
</style>
