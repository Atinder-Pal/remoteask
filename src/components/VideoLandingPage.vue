<template>
  <h1>Landing page</h1>
  <iframe id="video-frame" :src="video.link" frameborder="0"></iframe>
  <div id="video-info">
    <h3 id="video-title">{{ video.title }}</h3>
    <p id="video-topic">{{ video.topic }}</p>
    <!-- <p id="video-timestamp">{{ video.createdAt }}</p> -->
  </div>
</template>

<script>
import db from "../db.js";

export default {
  data() {
    return {
      video: {},
    };
  },
  methods: {
    setDisplayVideo(video) {
      this.video = {
        title: video.title,
        topic: video.topic,
        link: video.link,
      };
    },
  },
  beforeMount() {
    db.collection("videos")
      .doc("gmOKtGq4MPrlY0tJQ4mz")
      .get()
      .then((snapshot) => {
        this.setDisplayVideo(snapshot.data());
      });
  },
};
</script>
