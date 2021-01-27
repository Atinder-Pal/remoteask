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
      :id="JSON.stringify(item)"
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
    setDisplayVideo(video) {
      this.selectedItem = {
        link: video.link,
        title: video.title,
        topic: video.topic,
        createdAt: video.createdAt,
      };
    },
    selectVideo(e) {
      const video = JSON.parse(e.target.id);
      console.log(video.createdAt);
      this.setDisplayVideo(video);
    },
  },
  beforeMount() {
    db.collection("videos").onSnapshot((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      this.itemsArray.push(...items);
      this.setDisplayVideo(items[0]);
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
