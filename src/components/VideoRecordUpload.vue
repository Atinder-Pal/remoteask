<template>
  <div class="align-center container">
    <div class="video-player">
      <video
        id="myVideo"
        class="video-js vjs-default-skin vjs-16-9"
        data-setup='{"fluid": true}'
        playsinline
      ></video>
      <p class="align-center" v-if="!deviceReady">
        Click or Tap on Camera Icon to enable the camera
      </p>
      <p class="align-center" v-if="deviceReady">Record a video</p>
    </div>
    <p>or</p>
    <div class="show-border">
      <ion-label class="import-video-label" stacked
        >Add video from Device</ion-label
      >
      <section>
        <input
          class="center"
          type="file"
          @change="previewVideo"
          accept="video/*"
          ref="inputForFile"
        />
      </section>
    </div>
    <div v-if="showProgress" class="progress-bar">
      Progress: {{ uploadValue.toFixed() + "%" + " " }}
      <progress
        id="progress"
        :value="uploadValue"
        max="100"
        color="primary"
      ></progress>
    </div>

    <div v-if="videoData != null">
      <p>Preview Video before uploading:</p>
      <div class="resp-container">
        <iframe
          class="preview resp-iframe"
          :src="blobURL"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div v-if="recordedBlob != null">
      <form @submit.prevent="onUpload(recordedBlob)">
        <ion-list>
          <ion-item>
            <ion-label class="label-class" stacked>Video Title</ion-label>
            <ion-input
              type="text"
              id="title"
              name="title"
              autocomplete="off"
              v-model="video.title"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label class="label-class" stacked>Video Topic</ion-label>
            <ion-input
              type="text"
              id="topic"
              name="topic"
              autocomplete="off"
              v-model="video.topic"
              required
            ></ion-input>
          </ion-item>
        </ion-list>
        <ion-button expand="block" type="submit" class="margin-ra">
          Upload</ion-button
        >
      </form>
    </div>
  </div>

  <div v-if="uploaded">
    <h4>Video submitted successfully!</h4>
    <!-- <button @click="newVideo">Add more videos</button> -->
  </div>

  <div>
    <h4 v-if="errorOnUploading">
      {{
        errorOnUploading.errorOnStorage
          ? errorOnUploading.errorOnStorage
          : errorOnUploading.errorOnFirestore
      }}
    </h4>
  </div>
  <!-- ===========================Render Uploaded Video========================== -->
  <!-- <div v-if="video.url!=null">
        <p> Here is the video you just uploaded:</p>
        <iframe id="recordedVideo" :src="video.url"></iframe>     
    </div> -->
  <!-- ============================================================================= -->
</template>

<script>
/* eslint-disable */
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";
import "webrtc-adapter";
import RecordRTC from "recordrtc";
import Record from "videojs-record/dist/videojs.record.js";
import firebase from "firebase";
import db from "@/db.js";
import {
  IonList,
  IonItem,
  IonButton,
  IonInput,
  IonProgressBar,
  IonCard,
  IonLabel,
} from "@ionic/vue";

export default {
  data() {
    return {
      video: {
        userId: null,
        title: null,
        topic: null,
        url: null,
      },
      errorOnUploading: {
        errorOnStorage: null,
        errorOnFirestore: null,
      },
      deviceReady: false,
      showProgress: false,
      uploaded: false,
      blobURL: null,
      videoData: null,
      recordedBlob: null,
      uploadValue: 0,
      player: "",
      options: {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        bigPlayButton: true,
        controlBar: {
          volumePanel: true,
        },
        plugins: {
          // configure videojs-record plugin
          record: {
            audio: true,
            video: true,
            debug: true,
            maxLength: 600,
            videoMimeType: "video/webm;codecs=vp9",
          },
        },
      },
    };
  },
  components: {
    IonList,
    IonItem,
    IonButton,
    IonInput,
    IonProgressBar,
    IonLabel,
  },
  methods: {
    previewVideo(event) {
      this.uploadValue = 0;
      this.videoData = this.$refs.inputForFile.files[0];
      this.videoData = event.target.files[0];
      this.recordedBlob = this.videoData;
      this.blobURL = URL.createObjectURL(this.videoData);
    },
    saveToFirestore() {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      const videoInfo = {
        title: this.video.title,
        link: this.video.url,
        topic: this.video.topic,
        userId: this.video.userId,
        createdAt: serverTimestamp(),
      };
      db.collection("videos")
        .add(videoInfo)
        .then(() => {
          console.log("Video uploaded successfully!");
          this.uploaded = true;
          this.player.reset();
          setTimeout(this.newVideo, 3000);
          console.log("Media File uploaded to Firestore");
        })
        .catch((error) => {
          this.errorOnUploading.errorOnFirestore =
            "Error uploading video info to Firestore" + error;
        });
    },
    newVideo() {
      this.uploaded = false;
      this.recordedBlob = null;
      this.videoData = null;
      this.uploadValue = 0;
      this.showProgress = false;
      this.$refs.inputForFile.value = null;

      this.video.title = null;
      this.video.topic = null;
      this.video.url = null;

      this.errorOnUploading = {
        errorOnStorage: null,
        errorOnFirestore: null,
      };
      this.player.record().getDevice();
    },
    onUpload(video) {
      this.showProgress = true;
      this.videoData = null;
      this.video.url = null;
      //Citation: Danish suggested to save file with timestamp name, referenced code from her
      const date = new Date();
      const fileName =
        date.toDateString() +
        "-" +
        date.getHours() +
        "-" +
        date.getMinutes() +
        ".webm";
      // Citation end
      const storageRef = firebase
        .storage()
        .ref(`${fileName}`)
        .put(video);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.errorOnUploading.errorOnStorage =
            "Error uploading media file to Storage" + error;
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.video.url = url;
            this.saveToFirestore();
          });
        }
      );
    },
  },
  mounted() {
    /* eslint-disable no-console */
    firebase.auth().onAuthStateChanged((user) => {
      this.video.userId = user.uid;
    });
    this.player = videojs("#myVideo", this.options, () => {
      // print version information at startup
      var msg =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and recordrtc " +
        RecordRTC.version;
      videojs.log(msg);
    });
    // device is ready
    this.player.on("deviceReady", () => {
      console.log("device is ready!");
      this.deviceReady = true;
    });
    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("started recording!");
    });
    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      this.i++;
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      this.recordedBlob = this.player.recordedData;
      // ==========================save video on desktop====================================
      // this.player.record().saveAs({'video': 'recording.mp4'});
      // ===================================================================================
    });
    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });
    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style scoped="">
.resp-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
}
.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

#myVideo {
  margin-right: auto;
  margin-bottom: 1.5em;
}
.video-player {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
iframe {
  object-fit: fill;
}
.align-center {
  text-align: center;
}

.show-border {
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px #888;
}
section {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.label-class {
  font-size: small;
}
.progress-bar {
  margin-top: 2em;
}
h4 {
  text-align: center;
  color: green;
}
@media only screen and (min-width: 760px) {
  .progress-bar {
    font-size: 1.3em;
  }
  p {
    font-size: 1.3em;
  }
  .import-video-label {
    font-size: 1.3em;
  }
  .center {
    font-size: 1.3em;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
  .label-class {
    font-size: large;
  }
}
@media screen and (min-width: 1024px) {
  .container {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  .center {
    width: 45%;
  }
}
</style>
