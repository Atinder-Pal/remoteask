<template>
  <section class="display">
    <iframe :src="selectedItem.link" frameborder="0"></iframe>
    <h3>{{ selectedItem.title }}</h3>
    <p>{{ selectedItem.topic }}</p>
    <p>{{ selectedItem.createdAt }}</p>
  </section>
  <ul class="videosList">
    <li
      v-for="item in itemsArray"
      :key="item"
      :id="item"
      class="listItem"
      @click="selectVideo"
    >
      <span>{{ item.title }}</span>
      <br />
      <span>{{ item.topic }}</span>
      <br />
      <span>{{ item.createdAt.toDate().toDateString() }}</span>
      <br /><br /><br />
    </li>
  </ul>
</template>

<script>
import db from "../db.js";

export default {
  data() {
    return {
      selectedItem: {},
      itemsArray: [],
    };
  },
  methods: {
    defaultVideo(video) {
      this.selectedItem = {
        link: video[0].link,
        title: video[0].title,
        topic: video[0].topic,
        createdAt: video[0].createdAt.toDate().toDateString(),
      };
    },
    selectVideo(e) {
      this.selectedItem = e.target.id;
      console.log(e.target.id);
    },
  },
  beforeMount() {
    db.collection("videos").onSnapshot((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      this.itemsArray.push(...items);
      this.defaultVideo(items);
    });
  },
};
</script>
<style scoped="">
.videosList {
  padding: 0px;
}

.listItem {
  border: solid;
  display: block;
}
</style>
