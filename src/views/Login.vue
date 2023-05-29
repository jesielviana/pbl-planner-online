<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div class="text-center">
              <img class="img-logo" :src="'/img/logo.png'" />
            </div>
            <h4 class="card-title text-center">PBL Planner Online</h4>
            <p class="text-center mb-4">Faça seu planejamento guiado pelos princípios PBL</p>
            <button
              @click.prevent="authWithGoogle()"
              class="btn btn-lg btn-google btn-block"
              type="submit"
            >
              <img src="img/signin_google.svg" /> Continuar com o Google
            </button>
            <div class="horizontalText my-4">ou</div>
            <p class="text-danger" v-if="showErrorMsg">
              {{ errorMsg }}
            </p>
            <form class="form-signin" @submit.prevent="loginWithEmail()">
              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  v-model="inputEmail"
                  class="form-control"
                  placeholder="Email address"
                  required
                  autofocus
                />
                <label for="inputEmail">Email</label>
              </div>

              <div class="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  v-model="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  required
                  minlength="6"
                />
                <label for="inputPassword">Senha</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Entrar
              </button>
            </form>
            <br />
            <p class="text-center">
              <a href="#" v-b-modal.modal-recovery>Esqueceu a senha?</a>
            </p>
            <p class="text-center">
              Não possui cadastro?
              <br />
              <a href="#" v-b-modal.modal-account>Cadastre-se</a>
            </p>
          </div>
        </div>
        <b-modal ref="modal-recovery" id="modal-recovery" title="Redefinição de Senha" hide-footer>
          <div class="card-body">
            <div class="text-center">
              <img class="img-logo" :src="'/img/logo.png'" />
            </div>
            <h4 class="card-title text-center">PBL Planner Online</h4>
            <p>
              Forneça o endereço de e-mail cadastrado no PBL Planner Online.<br />
              <b>Enviaremos um e-mail que permitirá você criar uma nova senha.</b>
            </p>
            <p class="text-danger" v-if="showErrorMsg">
              {{ errorMsg }}
            </p>
            <form class="form-signin" @submit.prevent="recoveryPassword()">
              <div class="form-label-group">
                <input
                  type="email"
                  id="emailAddressRecovery"
                  v-model="emailAddressRecovery"
                  class="form-control"
                  placeholder="Endereço de Email"
                  required
                  autofocus
                />
                <label for="emailAddressRecovery">Email</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Redefinir Senha
              </button>
            </form>
          </div>
        </b-modal>

        <b-modal id="modal-account" title="Cadastre-se" hide-footer>
          <div class="card-body">
            <div class="text-center">
              <img class="img-logo" :src="'/img/logo.png'" />
            </div>
            <h4 class="card-title text-center">PBL Planner Online</h4>
            <p class="text-center mb-4">Faça seu planejamento guiado pelos princípios PBL</p>
            <button
              @click.prevent="authWithGoogle()"
              class="btn btn-lg btn-google btn-block"
              type="submit"
            >
              <img src="img/signin_google.svg" /> Continuar com o Google
            </button>
            <div class="horizontalText my-4">ou</div>
            <p class="text-danger" v-if="showErrorMsg">
              {{ errorMsg }}
            </p>
            <form class="form-signin" @submit.prevent="createAccount()">
              <b-form-invalid-feedback :state="nameAccountValidation">
                Preenchimento obrigatório, com pelo menos 3 caracteres e no máximo 30.
              </b-form-invalid-feedback>
              <div class="form-label-group">
                <b-input
                  type="text"
                  :state="nameAccountValidation"
                  id="inputNameAccount"
                  v-model="inputNameAccount"
                  class="form-control"
                  placeholder="Nome"
                  autofocus
                />
                <label for="inputNameAccount">Nome</label>
              </div>
              <b-form-invalid-feedback :state="emailAccountValidation">
                Preenchimento obrigatório.
              </b-form-invalid-feedback>
              <div class="form-label-group">
                <b-input
                  type="email"
                  :state="emailAccountValidation"
                  id="inputEmailAccount"
                  v-model="inputEmailAccount"
                  class="form-control"
                  placeholder="Email"
                />
                <label for="inputEmailAccount">Email</label>
              </div>
              <b-form-invalid-feedback :state="passwordAccountValidation">
                Preenchimento obrigatório, com pelo menos 6 caracteres e no máximo 128.
              </b-form-invalid-feedback>
              <div class="form-label-group">
                <b-input
                  type="password"
                  :state="passwordAccountValidation"
                  id="inputPasswordAccount"
                  v-model="inputPasswordAccount"
                  class="form-control"
                  placeholder="Password"
                  minlength="6"
                />
                <label for="inputPasswordAccount">Senha</label>
              </div>

              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Cadastrar
              </button>
            </form>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import googleProvider from '@/firebase/providers'
import messages from '../helpers/messages'

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      inputEmailAccount: null,
      inputNameAccount: null,
      inputPasswordAccount: null,
      inputEmail: null,
      inputPassword: null,
      showErrorMsg: false,
      errorMsg: '',
      emailAddressRecovery: '',
      submited: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  computed: {
    ...mapState(['url']),
    nameAccountValidation () {
      return !this.submited ? null : this.isNameAccountValid()
    },
    emailAccountValidation () {
      return !this.submited ? null : this.isEmailAccountValid()
    },
    passwordAccountValidation () {
      return !this.submited ? null : this.isPasswordAccountValid()
    }
  },

  methods: {
    authWithGoogle () {
      const authenticateWithGoogle = () => this.$firebase.auth().signInWithPopup(googleProvider)
      authenticateWithGoogle().then(async result => {
        const user = {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        }
        await localStorage.setItem('user', JSON.stringify(user))
        if (this.url) {
          window.location.href = this.url
        } else {
          this.$router.push('planejamentos')
        }
      })
    },
    loginWithEmail () {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.inputEmail, this.inputPassword)
        .then(async result => {
          const user = {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email
          }
          await localStorage.setItem('user', JSON.stringify(user))
         console.log('this.url', this.url)
         if (this.url) {
            window.location.href = this.url
          } else {
            this.$router.push('planejamentos')
          }
        })
        .catch(error => {
          this.showErrorMsg = true
          this.errorMsg = messages.get(error.code)
          console.error('error', error)
        })
    },
    createAccount () {
      // console.log(this.reg.test('jesielviana.com'));
      this.submited = true
      if (
        this.isNameAccountValid() &&
        this.isEmailAccountValid() &&
        this.isPasswordAccountValid()
      ) {
        this.submited = false
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.inputEmailAccount, this.inputPasswordAccount)
          .then(async result => {
            const user = {
              displayName: this.inputNameAccount,
              photoURL: result.user.photoURL,
              email: result.user.email
            }
            await localStorage.setItem('user', JSON.stringify(user))
            await this.createUserProfile(result.user.uid, user)
            this.inputNameAccount = null
            this.inputEmailAccount = null
            this.inputPasswordAccount = null
            if (this.url) {
              window.location.href = this.url
            } else {
              this.$router.push('planejamentos')
            }
          })
          .catch(error => {
            this.showErrorMsg = true
            this.errorMsg = messages.get(error.code)
            console.error('error', error)
          })
      }
    },
    async createUserProfile (userId, userData) {
      await this.$firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set(userData)
    },

    recoveryPassword () {
      // To apply the default browser preference instead of explicitly setting it.
      // firebase.auth().useDeviceLanguage();
      this.$firebase.auth().languageCode = 'pt'
      const actionCodeSettings = {
        // After password reset, the user will be give the ability to go back to this page.
        url: 'https://pblplanneronline.jesielviana.com/login',
        handleCodeInApp: false
      }
      this.$firebase
        .auth()
        .sendPasswordResetEmail(this.emailAddressRecovery, actionCodeSettings)
        .then(() => {
          this.showToast('Foi enviado um email para você refedinir sua senha.')
          this.emailAddressRecovery = ''
          this.$refs['modal-recovery'].hide()
        })
        .catch(error => {
          console.error(error)
        })
    },

    showToast (msg) {
      this.$bvToast.toast(msg, {
        title: 'Sucesso!',
        toaster: 'b-toaster-top-center',
        variant: 'success',
        autoHideDelay: 10000,
        solid: true
      })
    },

    isNameAccountValid () {
      return (
        this.inputNameAccount != null &&
        this.inputNameAccount.trim().length > 2 &&
        this.inputNameAccount.trim().length <= 30
      )
    },
    isEmailAccountValid () {
      return this.inputEmailAccount != null && this.reg.test(this.inputEmailAccount)
    },
    isPasswordAccountValid () {
      return (
        this.inputPasswordAccount != null &&
        this.inputPasswordAccount.trim().length > 5 &&
        this.inputPasswordAccount.trim().length <= 128
      )
    }
  }
}
</script>
<style scoped>
.home .navbar {
  border-bottom: none;
  background-color: transparent;
  padding-top: 5px !important;
}

.navbar-brand h2 {
  font-size: 32px;
  margin: 0;
  color: #51c5e6;
  font-weight: 700;
}

h1,
h2,
h3 {
  color: #5f6368;
  position: relative;
  font-weight: 700;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.text-highlight {
  color: #51c5e6;
  font-weight: 700;
}

h2 i,
h3 i,
h4 i,
h5 i {
  font-weight: 500;
}

b {
  font-weight: 500;
}

section {
  min-height: 300px;
  margin-top: 20px;
}

.jumbotron {
  max-width: 700px;
  margin: 0 auto;
}

:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  font-weight: 600;
  font-size: 1.5rem;
  color: #51c5e6;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  border-radius: 0.3rem;
  letter-spacing: 0.1rem;
  font-weight: 400;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 0.3rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: 0.75rem 1.5rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(0.75rem + 0.75rem * (2 / 3));
  padding-bottom: calc(0.75rem / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(0.75rem / 3);
  padding-bottom: calc(0.75rem / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: #567;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 1.1rem;
}

.btn-google:hover {
  background-color: #fafafa;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}

.horizontalText {
  width: 100%;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  color: #ababab;
  font-size: 14px;
  z-index: 1;
  overflow: hidden;
}

.horizontalText:before {
  margin-left: -52%;
  text-align: right;
}

.horizontalText:after {
  margin-left: 2%;
}
.horizontalText:before,
.horizontalText:after {
  width: 50%;
  top: 51%;
  overflow: hidden;
  height: 1px;
  background-color: #d0d0d0;
  content: '\a0';
  position: absolute;
}
</style>
