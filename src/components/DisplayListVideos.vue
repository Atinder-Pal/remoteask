<template>
  <section class="display">
    <iframe id="video-frame" :src="selectedItem.link" frameborder="0"></iframe>
    <h3 id="video-title">{{ selectedItem.title }}</h3>
    <p id="video-topic">{{ selectedItem.topic }}</p>
    <p id="video-timestamp">{{ selectedItem.createdAt }}</p>
  </section>

  <h1 v-if="toogle">Home Button</h1>
  <ul class="videosList">
    <li
      v-for="item in itemsArray"
      :key="item"
      :id="JSON.stringify(item)"
      class="listItem"
      @click.capture="selectVideo"
    >
      <span
        class="list-title"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.title }}</span
      >
      <span
        class="list-topic"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.topic }}</span
      >
      <span
        class="list-timestamp"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.createdAt.toDate().toDateString() }}</span
      >
    </li>
  </ul>
</template>

<script>
import db from "../db.js";
import firebase from "firebase";

export default {
  data() {
    return {
      toggle: false,
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

      let timestamp = this.selectedItem.createdAt; // firebase data
      let myDate = new Date(timestamp.seconds * 1000); // date object
      this.selectedItem.createdAt = myDate.toDateString();
    },
    selectVideo(e) {
      const video = JSON.parse(e.target.id);
      this.setDisplayVideo(video);
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("videos")
        .where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          this.itemsArray.push(...items);
          this.setDisplayVideo(items[0]);
        });
    });
  },
};
</script>
<style scoped="">
#video-frame {
  border: solid;
  width: 100vw;
}

.videosList {
  padding: 0px;
}

#video-title {
  text-transform: capitalize;
  margin: 0px;
}

#video-topic {
  margin-bottom: 0px;
}

#video-timestamp {
  margin: 0px;
}

.listItem {
  border: solid;
  display: block;
  display: flex;
  flex-direction: column;
}

.list-title {
  font-size: 20px;
  text-transform: capitalize;
  width: max-content;
  border: solid;
}
.list-topic {
  width: max-content;
  border: solid;
}
.list-timestamp {
  width: max-content;
  border: solid;
}
</style>
