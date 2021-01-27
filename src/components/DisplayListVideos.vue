<template>
  <section class="display">
    <iframe src="" frameborder="0"></iframe>
    <h3>Title</h3>
    <p>Topic</p>
    <p>Time Stamp</p>
  </section>
  <ul>
    <li v-for="item in itemsArray" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import db from "../db.js";

export default {
  data() {
    return {
      selectedItem: null,
      itemsArray: [],
    };
  },
  methods: {},
  mounted() {
    db.collection("videos").onSnapshot((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      this.itemsArray.push(...items);
    });
  },
};
</script>
<style scoped=""></style>
