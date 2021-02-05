<template>
  <h1>Playing: {{ videoDocUID }}</h1>
  <iframe id="video-frame" :src="video.link" frameborder="0"></iframe>
  <div id="video-info">
    <h3 id="video-title">{{ video.title }}</h3>
    <p id="video-topic">{{ video.topic }}</p>
    <p id="video-timestamp">{{ video.createdAt }}</p>
  </div>
</template>

<script>
import db from "../db.js";

export default {
  props: ["videoDocUID"],
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
        createdAt: video.createdAt,
      };

      let timestamp = this.video.createdAt;
      let myDate = new Date(timestamp.seconds * 1000);
      this.video.createdAt = myDate.toDateString();
    },
  },
  beforeMount() {
    console.log(this.videoDocUID);
    db.collection("videos")
      .doc("gmOKtGq4MPrlY0tJQ4mz")
      .get()
      .then((snapshot) => {
        this.setDisplayVideo(snapshot.data());
      });
  },
};
</script>
