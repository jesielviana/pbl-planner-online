<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="row flex-lg-nowrap" style="max-width: 740px; margin: 0 auto;">
        <div class="col">
          <div class="row">
            <div class="col mb-3">
              <div class="e-profile">
                <div class="row">
                  <div class="col-12 col-sm-auto mb-3">
                    <b-avatar :src="user.photoURL" size="140px" variant="primary"></b-avatar>
                  </div>
                  <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                    <div class="text-center text-sm-left mb-2 mb-sm-0">
                      <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{{ user.displayName }}</h4>
                      <div class="text-muted">
                        <small> Último login em {{ user.lastSignInTime | formatDateHour }}</small>
                      </div>
                      <div class="mt-2">
                        <form id="formImage" action="#">
                          <button id="submitImage" class="btn btn-secondary" type="button">
                            <i class="fa fa-fw fa-camera"></i>
                            <span>Alterar foto</span>
                          </button>
                          <input id="mediaCapture" type="file" accept="image/*"
capture="camera" />
                        </form>
                      </div>
                    </div>
                    <div class="text-center text-sm-right">
                      <span class="badge badge-secondary">{{ user.role }}</span>
                      <div class="text-muted">
                        <small>Ingressou em {{ user.creationTime | formatDate }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <form class="form" novalidate>
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label>Nome</label>
                        <b-input
                          maxlength="50"
                          :state="nameValidation"
                          class="form-control"
                          type="text"
                          name="name"
                          placeholder="Nome do usuário"
                          v-model="user.displayName"
                        />
                        <b-form-invalid-feedback :state="nameValidation">
                          Preenchimento obrigatório, com pelo menos 3 caracteres e no máximo 50.
                        </b-form-invalid-feedback>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              class="form-control"
                              type="email"
                              disabled
                              placeholder="usuario@email.com"
                              v-model="user.email"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <label>Instituição de Ensino</label>
                            <b-input
                              class="form-control"
                              type="text"
                              :state="institutionValidation"
                              name="institution"
                              placeholder="Onde você trabalha"
                              v-model="user.institution"
                            />
                            <b-form-invalid-feedback :state="institutionValidation">
                              Preenchimento obrigatório, com pelo menos 3 caracteres e no máximo 50.
                            </b-form-invalid-feedback>
                          </div>
                        </div>
                        <div class="col">
                          <div class="form-group">
                            <label>Função</label>
                            <b-form-select
                              :state="roleValidation"
                              class="custom-select"
                              v-model="user.role"
                              :options="optionsRoles"
                            >
                            </b-form-select>
                            <b-form-invalid-feedback :state="roleValidation">
                              Preenchimento obrigatório.
                            </b-form-invalid-feedback>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <label>Cursos</label>
                            <b-input
                              class="form-control"
                              type="text"
                              name="courses"
                              :state="coursesValidation"
                              placeholder="Em quais cursos você atua"
                              v-model="user.courses"
                            />
                            <b-form-invalid-feedback :state="coursesValidation">
                              Preenchimento obrigatório, com pelo menos 3 caracteres e no máximo 50.
                            </b-form-invalid-feedback>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col d-flex justify-content-end">
                      <button @click.prevent="updateUser()" class="btn btn-primary" type="submit">
                        Salvar
                      </button>
                    </div>
                  </div>
                </form>
                <hr />
                <form class="form">
                  <div class="row">
                    <div class="col-12">
                      <b-button variant="white" class="pass" v-b-toggle.collapse-1
                        >Definir nova senha</b-button
                      >
                      <b-collapse id="collapse-1" class="mt-2">
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Nova Senha</label>
                              <b-input
                                v-model="newPassword"
                                class="form-control"
                                :state="newPasswordValidation"
                                type="password"
                                placeholder="Informe a nova senha"
                              />
                              <b-form-invalid-feedback :state="newPasswordValidation">
                                A senha deve conter pelo menos 6 caracteres.
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label>
                                Confirmação da Senha
                              </label>
                              <b-input
                                class="form-control"
                                v-model="confirmPassword"
                                type="password"
                                :state="confirmPasswordValidation"
                                placeholder="Repita sua nova senha"
                              />
                              <b-form-invalid-feedback :state="confirmPasswordValidation">
                                A confirmação deve ser igual a senha informada no campo anterior.
                              </b-form-invalid-feedback>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col d-flex justify-content-end">
                            <button
                              @click.prevent="updatePassword()"
                              class="btn btn-primary"
                              type="submit"
                            >
                              Atualizar Senha
                            </button>
                          </div>
                        </div>
                      </b-collapse>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import NavBar from '@/components/Navbar.vue';
import firebase from 'firebase/app';
import messages from '../helpers/messages';

export default {
  name: 'Profile',
  components: {
    Footer,
    NavBar,
  },
  data() {
    return {
      user: {
        displayName: '',
        institution: '',
        role: '',
        courses: '',
      },
      submited: false,
      submitedPassword: false,
      newPassword: '',
      confirmPassword: '',
      optionsRoles: [
        {
          value: 'Professor',
          text: 'Professor',
        },
        {
          value: 'Coordenador',
          text: 'Coordenador',
        },
        {
          value: 'Tutor',
          text: 'Tutor',
        },
        {
          value: 'Outro',
          text: 'Outro',
        },
      ],
    };
  },
  computed: {
    nameValidation() {
      return !this.submited ? null : this.isNameValid();
    },
    institutionValidation() {
      return !this.submited ? null : this.isInstitutionValid();
    },
    roleValidation() {
      return !this.submited ? null : this.isRoleValid();
    },
    coursesValidation() {
      return !this.submited ? null : this.isCoursesValid();
    },
    newPasswordValidation() {
      return !this.submitedPassword ? null : this.isNewPasswordValid();
    },
    confirmPasswordValidation() {
      return !this.submitedPassword ? null : this.isConfirmPasswordValid();
    },
  },
  created() {
    this.getUser();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const mediaCaptureElement = document.getElementById('mediaCapture');
      const imageButtonElement = document.getElementById('submitImage');

      imageButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        mediaCaptureElement.click();
      });
      mediaCaptureElement.addEventListener('change', this.onMediaFileSelected);
    },

    onMediaFileSelected(event) {
      event.preventDefault();
      const imageFormElement = document.getElementById('formImage');
      const file = event.target.files[0];

      // Clear the selection in the file picker input.
      imageFormElement.reset();
      // console.log('size', (file.size / 1024)) // kb
      if ((file.size / 1024) > 150) {
        this.showErrorToast('A imagem deve ter no máximo 150kb.');
        return;
      }
      // Check if the file is an image.
      if (!file.type.match('image.*')) {
        this.showErrorToast('Formato de imagem inválido.');
        return;
      }
      this.saveImageMessage(file);
    },

    saveImageMessage(file) {
      const format = file.name.split('.')[1];
      const filePath = `${this.$firebase.auth().currentUser.uid}/avatar.${format}`;
      return this.$firebase
        .storage()
        .ref(filePath)
        .put(file)
        .then((fileSnapshot) => fileSnapshot.ref.getDownloadURL().then((url) => {
          this.updateProfilePhotoURL(url);
        }))
        .catch((error) => {
          console.error('There was an error uploading a file to Cloud Storage:', error);
        });
    },

    getUser() {
      const { currentUser } = this.$firebase.auth();
      this.user.creationTime = currentUser.metadata.creationTime;
      this.user.lastSignInTime = currentUser.metadata.lastSignInTime;
      this.user.email = currentUser.email;
      this.user.photoURL = currentUser.photoURL;
      const docRef = this.$firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.user.institution = doc.data().institution;
            this.user.role = doc.data().role;
            this.user.courses = doc.data().courses;
            this.user.displayName = doc.data().displayName;
          } else {
            this.createUserProfile(this.user, currentUser.uid);
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    },

    async createUserProfile(userId, userData) {
      await this.$firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set(userData);
    },

    updateUser() {
      this.submited = true;
      if (this.isFormValid()) {
        const ref = this.$firebase
          .firestore()
          .collection('users')
          .doc(this.$firebase.auth().currentUser.uid);
        ref.update({
          displayName: this.user.displayName.trim(),
          photoURL: this.user.photoURL,
          institution: this.user.institution.trim(),
          courses: this.user.courses.trim(),
          role: this.user.role,
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        });
        this.updateProfileName();
        this.updateLocalStorage();
        this.showToast('Os dados do usuário foram alterados');
      }
    },

    updateProfileName() {
      const { currentUser } = this.$firebase.auth();
      currentUser
        .updateProfile({
          displayName: this.user.displayName.trim(),
        })
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateProfilePhotoURL(avatarURL) {
      const { currentUser } = this.$firebase.auth();
      currentUser.updateProfile({
        photoURL: avatarURL,
      })
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          console.error(error);
        });
      const ref = this.$firebase
        .firestore()
        .collection('users')
        .doc(this.$firebase.auth().currentUser.uid);
      ref.update({
        photoURL: avatarURL,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.user.photoURL = avatarURL;
      this.updateLocalStorage();
      this.$forceUpdate();
    },

    updatePassword() {
      this.submitedPassword = true;
      if (this.isNewPasswordValid() && this.isConfirmPasswordValid()) {
        const { currentUser } = this.$firebase.auth();
        currentUser
          .updatePassword(this.newPassword)
          .then(() => {
            this.showToast('Nova senha cadastrada.');
            this.newPassword = '';
            this.confirmPassword = '';
          })
          .catch((error) => {
            this.showErrorToast(messages.get(error.code));
            console.error(error);
          });
      }
    },

    async updateLocalStorage() {
      const user = {
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
      };
      await localStorage.removeItem('user');
      await localStorage.setItem('user', JSON.stringify(user));
    },
    isFormValid() {
      return (
        this.isNameValid()
        && this.isInstitutionValid()
        && this.isRoleValid()
        && this.isCoursesValid()
      );
    },

    isNameValid() {
      return (
        this.user.displayName != null
        && this.user.displayName.trim().length > 2
        && this.user.displayName.trim().length <= 50
      );
    },

    isInstitutionValid() {
      return (
        this.user.institution != null
        && this.user.institution.trim().length > 2
        && this.user.institution.trim().length <= 50
      );
    },

    isRoleValid() {
      return this.user.role != null;
    },

    isCoursesValid() {
      return (
        this.user.courses != null && this.user.courses.trim().length > 1 && this.user.courses.trim().length <= 50
      );
    },

    isNewPasswordValid() {
      return this.newPassword.trim().length > 5;
    },
    isConfirmPasswordValid() {
      return this.confirmPassword.trim().length > 5 && this.newPassword === this.confirmPassword;
    },

    showToast(msg) {
      this.$bvToast.toast(msg, {
        title: 'Sucesso!',
        toaster: 'b-toaster-top-center',
        variant: 'success',
        autoHideDelay: 3000,
        solid: true,
      });
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
  },
};
</script>
<style>
.collapsed:after {
  font-family: 'Material Icons';
  content: 'keyboard_arrow_down';
  margin-left: 2px;
}
.pass[aria-expanded='true']:after {
  font-family: 'Material Icons';
  content: 'keyboard_arrow_up';
  margin-left: 2px;
}
.pass,
.pass:hover,
.pass:focus,
.pass:active {
  background-color: transparent;
  border-color: #fff;
  color: #000;
  border: none;
  color: blue;
  outline: 0px solid transparent;
  box-shadow: none;
  padding-left: 0;
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #fafafa;
}
.badge {
  font-weight: 600;
}
</style>
