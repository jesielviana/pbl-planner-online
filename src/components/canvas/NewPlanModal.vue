<template>
  <div class="title">
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Nome do Planejamento"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-input
          maxlength="40"
          :state="validation"
          id="name-input"
          v-model="title"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validation">
          Preenchimento obrigatório. O Título deve ter pelo menos 4 caracteres e no máximo 40.
        </b-form-invalid-feedback>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';
import firebase from 'firebase/app';
import { mapState } from 'vuex';
import planModel from '../../model/plan.json';

export default {
  name: 'NewPlanModal',
  data() {
    return {
      title: null,
      id: null,
      submited: false,
    };
  },
  computed: {
    ...mapState(['isLogged']),
    validation() {
      return !this.submited ? null : this.isFormValid();
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    async handleSubmit() {
      this.submited = true;
      if (this.isFormValid()) {
        this.submited = false;
        const userId = await this.$firebase.auth().currentUser.uid;
        const plan = JSON.parse(JSON.stringify(planModel));
        plan.title = this.title;
        plan.userAdmin = userId;
        plan.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
        const ref = this.$firebase
          .firestore()
          .collection('plans')
          .doc();
        ref.set(plan);
        EventBus.$emit('planId', ref.id);
        this.title = '';
        this.saveUserData(ref.id, userId);
        this.$router.push({ name: 'planejamento', params: { id: ref.id } });
        this.$nextTick(() => {
          this.$refs.modal.hide();
        });
      }
    },

    async saveUserData(planId, userId) {
      const ref = this.$firebase
        .firestore()
        .collection('plans')
        .doc(planId);
      ref.update({
        users: firebase.firestore.FieldValue.arrayUnion(userId),
      });
    },

    isFormValid() {
      return this.title != null && this.title.trim().length > 3 && this.title.trim().length < 41;
    },

    getRandomBackgroundClass() {
      const classes = ['bg-yellow', 'bg-pink', 'bg-green', 'bg-blue'];
      const indexRandom = Math.floor(Math.random() * 4);
      return classes[indexRandom];
    },
  },
};
</script>

<style>
.plan-title {
  text-align: center;
  width: 100%;
  margin-top: 5px;
  position: relative;
}
.plan-title h4 {
  margin: 0;
}
.plan-title button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px 7px 2px;
}
.icon-edit {
  font-size: 0.8em;
}
</style>
