<template>
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
