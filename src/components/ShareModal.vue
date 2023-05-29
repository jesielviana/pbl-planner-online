<template>
  <div>
      <div class="share-link">
        <input @click="linkSelect()" readonly size="66"
id="textUrl" type="text" v-model="url" />
        <b-button @click="copyLinkToClipboad()">Copiar</b-button>
      </div>
      <div style="display: flex; justify-content: center;" class="share-icons">
        <a
          class="a2a_button_google_gmail"
          :href="'https://www.addtoany.com/add_to/google_gmail?linkurl='+url+'%2F&amp;linkname=PBL%20Planner%20Online'"
          target="_blank"
        >
          <img :src="'/img/share/gmail.png'" class="img-fluid" alt="Gmail">
        </a>
        <a
          class="a2a_button_whatsapp"
          :href="'https://www.addtoany.com/add_to/whatsapp?linkurl='+url+'%2F&amp;linkname=PBL%20Planner%20Online'"
          target="_blank"
        >
         <img :src="'/img/share/whatsapp.png'" class="img-fluid" alt="Whatsapp">
        </a>
        <a
          class="a2a_button_telegram"
          :href="'https://www.addtoany.com/add_to/telegram?linkurl='+url+'%2F&amp;linkname=PBL%20Planner%20Online'"
          target="_blank"
        >
         <img :src="'/img/share/telegram.png'" class="img-fluid" alt="Telegram">
        </a>
        <a
          class="a2a_button_twitter"
          :href="'https://www.addtoany.com/add_to/twitter?linkurl='+url+'%2F&amp;linkname=PBL%20Planner%20Online'"
          target="_blank"
        >
         <img :src="'/img/share/twitter.png'" class="img-fluid" alt="Twitter">
        </a>
      </div>
      <!-- AddToAny END -->
  </div>
</template>

<script>
export default {
  name: 'ShareModal',
  props: {
    url: String,
  },
  data() {
    return {};
  },
  methods: {
    linkSelect() {
      const copyText = document.getElementById('textUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
    },
    copyLinkToClipboad() {
      const copyText = document.getElementById('textUrl');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');
      this.$bvToast.toast('Link copiado', {
        title: '',
        toaster: 'b-toaster-top-center',
        variant: 'success',
        autoHideDelay: 1000,
        appendToast: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
