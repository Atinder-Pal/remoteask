<template>
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
    db.collection("videos")
      .doc(this.videoDocUID)
      .get()
      .then((snapshot) => {
        this.setDisplayVideo(snapshot.data());
      });
  },
};
</script>

<style>
#video-frame {
  width: 100%;
  height: 300px;
}

#video-info {
  padding: 15px;
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
  font-size: 13px;
  opacity: 0.5;
}
</style>
