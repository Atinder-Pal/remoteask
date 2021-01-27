<template>
  <div>
    <p>Record video</p>
    <video id="myVideo" class="video-js vjs-default-skin" playsinline></video>

    <div>
      <p>or Add video from Device:</p>
      <input
        type="file"
        @change="previewVideo"
        accept="video/*"
        ref="inputForFile"
      />
    </div>
    <div>
      <p>
        Progress: {{ uploadValue.toFixed() + "%" }}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>

    <div v-if="videoData != null">
      <p>Preview Video before uploading:</p>
      <iframe class="preview" :src="blobURL"></iframe>
    </div>

    <div v-if="recordedBlob != null">
      <form @submit.prevent="onUpload(recordedBlob)">

        <label for="title">Name of Video</label><br />
        <input
          type="text"
          id="title"
          name="title"
          autocomplete="off"
          autofocus
          v-model="video.title"
        /><br />

        <label for="topic">Topic of Video</label><br />
        <input 
          type="text" 
          id="topic" 
          name="topic" 
          autocomplete="off"
          v-model="video.topic" 
          /><br />

        <button type="submit">Upload</button>

      </form>
    </div>

  </div>

  <div v-if="uploaded">
    <h4>Video submitted successfully!</h4>
    <!-- <button @click="newVideo">Add more videos</button> -->
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
export default {
  data() {
    return {
      video: {
        userId: null,
        title: null,
        topic: null,
        url: null,
      },
      //i: 0,
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
        width: 320,
        height: 240,
        bigPlayButton: true,
        controlBar: {
          volumePanel: true          
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
  methods: {
    previewVideo() {
      this.uploadValue = 0;
      this.video.url = null;      
      this.videoData = this.$refs.inputForFile.files[0];
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
        createdAt: serverTimestamp()
    };
      db.collection("videos")
        .add(videoInfo)
        .then(() => {
          console.log("Video uploaded successfully!");
          this.uploaded = true;
          this.player.reset();
          setTimeout(this.newVideo, 3000);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newVideo() {
      this.uploaded = false;
      this.recordedBlob = null;
      this.videoData = null;
      this.uploadValue = 0;
      this.$refs.inputForFile.value = null;
      this.video = {
        userId: null,
        title: null,
        topic: null,
        url: null,
      };      
      this.player.record().getDevice();
    },
    onUpload(video) {
      this.videoData = null;
      this.video.url = null;
      //this.i++;

      const date = new Date();
      const fileName =
        date.toDateString() +
        "-" +
        date.getHours() +
        "-" +
        date.getMinutes() +
        ".webm";

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
          console.log(error.message);
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

    //=================this code needs testing with Authentication
    firebase.auth().onAuthStateChanged((user) => {
      this.video.userId = user.uid;
    });
    //=================================================================

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
      // this.player.record().saveAs({'video': 'recording'+this.i+'.mp4'});
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
img.preview {
  width: 200px;
}
#myVideo {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3em;
}
</style>
