<template>
  <div>
    <NavBar />
    <div class="container">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
      >Planejamento não encontrado.</b-alert>
      <br />
      <div class="row plans">
        <div
          class="col-md-4 mb-4"
          v-for="(plan, index) in plans"
          :key="index"
        >
          <b-card
            border-variant="default"
            :title="plan.title"
          >
            <button
              v-if="isUserAdmin(plan.userAdmin.id)"
              :id="index + 'btn-delete'"
              @click="onRemoveSubmit(plan.id, plan.userAdmin.id, index)"
              class="btn-config btn-delete"
            >
              <span class="material-icons">delete</span>
            </button>
            <b-tooltip
              v-if="isUserAdmin(plan.userAdmin.id)"
              :target="index + 'btn-delete'"
              variant="secondary"
              placement="bottom"
            >Remover</b-tooltip>
            <b-card-sub-title
              class="text-info"
              style="margin-bottom: 35px;"
            >
              <div style="display: flex;">
                <b-form-checkbox
                  :disabled="!isUserAdmin(plan.userAdmin.id)"
                  @change="updatePlanStatus(index, plan.id)"
                  v-model="plan.editable"
                  name="check-button"
                  switch
                >{{ plan.editable ? 'Aberto para edição' : 'Fechado para edição' }}</b-form-checkbox>
                <ion-icon
                  style="margin-left: 2px;"
                  :id="'editable' + index"
                  name="help-circle-outline"
                ></ion-icon>
                <b-tooltip
                  :target="'editable' + index"
                  variant="secondary"
                  placement="bottom"
                >Somente o usuário que criou o planejamento pode alterar seu estado.</b-tooltip>
              </div>
              <p style="margin: 10px 0;">
                Planejamento criado por
                <b style="font-weight: 600">{{plan.userAdmin.name}}</b>
              </p>
              <a
                href="#"
                @click="showUserNames(plan.usersName)"
                v-b-modal.modal-1
                variant="white text-muted"
              >
                {{
                plan.users.length > 1
                ? `${plan.users.length} Colaboradores`
                : `${plan.users.length} Colaborador`
                }}
              </a>
            </b-card-sub-title>
            <b-button
              class="btn-share"
              variant="outline-info"
              :id="'share' + index"
              @click.prevent="moutedLinkShare(plan.id)"
              v-b-modal.modal-share2
            >Compartilhar</b-button>
            <b-tooltip
              :target="'share' + index"
              variant="secondary"
              placement="bottom"
            >
              Qualquer pessoa com o link pode acessar e alterar o planejamento
            </b-tooltip>

            <b-button
              :id="'edit' + index"
              class="btn-open"
              @click.prevent="edit(plan.id)"
              variant="primary"
            >{{ plan.editable ? 'Editar' : 'Visualizar' }}</b-button>
            <b-tooltip
              :target="'edit' + index"
              variant="secondary"
              placement="bottom"
            >Abrir planejamento</b-tooltip>
            <template v-slot:footer>
              <small
                v-if="plan.lastUpdate"
                class="text-muted"
              >
                Alterado em:
                {{ plan.lastUpdate.toDate() | formatDateHour }}
              </small>
            </template>
          </b-card>
        </div>

        <b-overlay
          class="teste"
          :show="busy"
          no-wrap
          @shown="onShown"
        >
          <template v-slot:overlay>
            <div
              ref="dialog"
              tabindex="-1"
              role="dialog"
              aria-modal="false"
              aria-labelledby="form-confirm-label"
              class="text-center p-3 alert-delete"
            >
              <p style="font-weight: 600;">Confirma a exclusão do planejamento?</p>
              <b-alert
                show
                variant="danger"
              >
                <span
                  class="material-icons"
                  style="margin-right: 10px"
                >warning</span>
                Esta ação excluirá permanentemente este planejamento.
              </b-alert>
              <div
                class="d-flex"
                style="justify-content: center;"
              >
                <b-button
                  variant="outline-dark"
                  class="mr-3"
                  @click="onCancel"
                >Cancelar</b-button>
                <b-button
                  variant="danger"
                  @click="remove()"
                >Excluir</b-button>
              </div>
            </div>
          </template>
        </b-overlay>
      </div>
      <b-modal
        id="modal-1"
        title="Colaboradores"
        ok-only
      >
        <ol>
          <li
            v-for="(userName, index) in currentUsersNames"
            :key="index"
          >{{ userName }}</li>
        </ol>
      </b-modal>
      <b-modal
        size="xl"
        id="modal-share2"
        title="Compartilhe o link abaixo"
        hide-footer
      >
        <div class="share-link">
          <input
            @click="linkSelect()"
            readonly
            size="66"
            id="textUrl"
            type="text"
            v-model="url"
          />
          <b-button @click="copyLinkToClipboad()">Copiar</b-button>
        </div>
        <div
          style="display: flex; justify-content: center;"
          class="share-icons"
        >
          <a
            class="a2a_button_google_gmail"
            :href="'https://www.addtoany.com/add_to/google_gmail?linkurl='
            +url+'%2F&amp;linkname=PBL%20Planner%20Online'"
            target="_blank"
          >
            <img
              :src="'/img/share/gmail.png'"
              class="img-fluid"
              alt="Gmail"
            />
          </a>
          <a
            class="a2a_button_whatsapp"
            :href="'https://www.addtoany.com/add_to/whatsapp?linkurl='+url
            +'%2F&amp;linkname=PBL%20Planner%20Online'"
            target="_blank"
          >
            <img
              :src="'/img/share/whatsapp.png'"
              class="img-fluid"
              alt="Whatsapp"
            />
          </a>
          <a
            class="a2a_button_telegram"
            :href="'https://www.addtoany.com/add_to/telegram?linkurl='+url
            +'%2F&amp;linkname=PBL%20Planner%20Online'"
            target="_blank"
          >
            <img
              :src="'/img/share/telegram.png'"
              class="img-fluid"
              alt="Telegram"
            />
          </a>
          <a
            class="a2a_button_twitter"
            :href="'https://www.addtoany.com/add_to/twitter?linkurl='+url
            +'%2F&amp;linkname=PBL%20Planner%20Online'"
            target="_blank"
          >
            <img
              :src="'/img/share/twitter.png'"
              class="img-fluid"
              alt="Twitter"
            />
          </a>
        </div>
        <!-- AddToAny END -->
      </b-modal>
    </div>
    <Footer />
  </div>
</template>
<script>
import firebase from "firebase/app";
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "planejamentos",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      plans: [],
      currentUsersNames: [],
      url: {},
      editable: true,
      planDocIdToRemove: "",
      busy: false,
      indexToRemove: "",
    };
  },
  created() {
    if (this.$route.params.erros) {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  mounted() {
    this.getPlans();
  },
  methods: {
    inverse(bool) {
      return !bool;
    },
    updatePlanStatus(index, planId) {
      try {
        const newState = !this.plans[index].editable;
        const ref = this.$firebase.firestore().collection("plans").doc(planId);
        ref.update({
          editable: newState,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        //
        console.error(error);
      }
    },

    isUserAdmin(userAdminUid) {
      const currentUserId = this.$firebase.auth().currentUser.uid;
      return userAdminUid === currentUserId;
    },

    moutedLinkShare(planId) {
      this.url = `https://pblplanneronline.jesielviana.com/planejamento/${planId}`;
    },

    linkSelect() {
      const copyText = document.getElementById("textUrl");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
    },
    copyLinkToClipboad() {
      const copyText = document.getElementById("textUrl");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
      this.$bvToast.toast("Link copiado", {
        title: "",
        toaster: "b-toaster-top-center",
        variant: "success",
        autoHideDelay: 1000,
        appendToast: true,
      });
    },

    showUserNames(usersNames) {
      this.currentUsersNames = usersNames;
    },
    async getPlans() {
      const userId = await this.$firebase.auth().currentUser.uid;
      const ref = this.$firebase.firestore().collection("plans");
      ref
        .where("users", "array-contains", userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            const plan = doc.data();
            plan.id = doc.id;
            const users = await this.getUsers(plan.users, plan.userAdmin);
            plan.usersName = users.names;
            plan.userAdmin = {
              id: plan.userAdmin,
              name: users.adminName,
            };
            this.plans.push(plan);
          });
        });
    },

    async getUsers(ids, idAdmin) {
      const names = [];
      let adminName = "";
      const usersRef = this.$firebase.firestore().collection("users");
      const querySnapshot = await usersRef.get();
      querySnapshot.forEach((doc) => {
        if (ids.includes(doc.id)) {
          names.push(` ${doc.data().displayName}`);
          if (doc.id === idAdmin) {
            adminName = doc.data().displayName;
          }
        }
      });
      const users = {
        names,
        adminName,
      };
      return users;
    },
    edit(id) {
      // EventBus.$emit('plan', 'objeto');
      this.$router.push({ name: "planejamento", params: { id } });
    },

    onShown() {
      // Focus the remove dialog prompt
      this.$refs.dialog.focus();
    },
    onRemoveSubmit(docId, adminUid, index) {
      if (this.isUserAdmin(adminUid)) {
        this.planDocIdToRemove = docId;
        this.indexToRemove = index;
        this.busy = true;
      }
    },
    onCancel() {
      this.planDocIdToRemove = "";
      this.indexToRemove = "";
      this.busy = false;
    },

    async remove() {
      await this.$firebase
        .firestore()
        .collection("plans")
        .doc(this.planDocIdToRemove)
        .delete();
      this.plans.splice(this.indexToRemove, 1);
      this.busy = false;
      this.showDeleteToast();
    },

    showDeleteToast() {
      this.$bvToast.toast("Planejamento removido.", {
        title: "Sucesso. ",
        toaster: "b-toaster-top-center",
        variant: "success",
        autoHideDelay: 5000,
        solid: true,
      });
    },
  },
};
</script>
<style scoped lang="scss">
button.text-muted:hover {
  color: #47a8a8 !important;
}

h4.card-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.btn-open {
  position: absolute;
  bottom: 5px;
  right: 15px;
}

.btn-share {
  position: absolute;
  bottom: 5px;
  left: 15px;
}

.btn-delete {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
<style>
#modal-share2 .modal-body {
  text-align: center;
}

#modal-share2 .modal-xl {
  max-width: 620px !important;
}
.plans {
  min-height: 50vh;
}
</style>
