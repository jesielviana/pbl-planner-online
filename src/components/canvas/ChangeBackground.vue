<template>
  <div class="colors">
    <button class="btn-color bg-yellow" @click="changeBackgroundColor(docid, 'bg-yellow')"></button>
    <button class="btn-color bg-pink" @click="changeBackgroundColor(docid, 'bg-pink')"></button>
    <button class="btn-color bg-green" @click="changeBackgroundColor(docid, 'bg-green')"></button>
    <button class="btn-color bg-blue" @click="changeBackgroundColor(docid, 'bg-blue')"></button>
  </div>
</template>

<script>
export default {
  name: 'ChangeBackground',
  props: {
    docid: String,
  },
  data() {
    return {};
  },
  methods: {
    changeBackgroundColor(docId, newClassBackgroundColor) {
      const element = document.querySelector('.modal-content');
      if (element != null) {
        element.classList.remove(element.classList[1]);
        element.classList.add(newClassBackgroundColor);
      } else {
        this.$parent.changeBackgroundColor(docId, newClassBackgroundColor);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  align-items: center;
  justify-content: center;
}

.colors button{
  border: 1px solid #567;
}
</style>
