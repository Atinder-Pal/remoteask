<template>
  <ion-card v-if="video.link">
    <iframe id="video-frame" :src="video.link" frameborder="0"></iframe>
    <div id="video-info">
      <h3 id="video-title">{{ video.title }}</h3>
      <p id="video-topic">{{ video.topic }}</p>
      <p id="video-timestamp">{{ video.createdAt }}</p>
    </div>
  </ion-card>
  <div v-if="!validLink">
    <NotFound />
  </div>
</template>

<script>
import db from "../db.js";
import firebase from "firebase";
import NotFound from "./NotFound";

export default {
  props: ["videoDocUID"],
  data() {
    return {
      video: {},
      validLink: true,
    };
  },
  components: {
    NotFound,
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
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(
          "error while signing in anonymously",
          errorCode,
          errorMessage
        );
      });
  },
  mounted() {
    console.log("starting video check");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("videos")
          .doc(this.videoDocUID)
          .get()
          .then((snapshot) => {
            this.setDisplayVideo(snapshot.data());
            if (snapshot.exist) {
              this.validLink = false;
            }
          });
      } else {
        // User is signed out
        console.log("User is signed out");
      }
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
