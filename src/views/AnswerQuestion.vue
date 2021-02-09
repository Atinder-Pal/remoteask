<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">        
        <h1>Answer a Question</h1>
       <p>{{id}}</p>
       <div class="align-center container">
    <video-record @videoRecorded="videoRecorded" ref="videoRecordComponent" >
    </video-record>   
    <p>or</p>
    <import-video @videoImported='previewVideo' ref="videoImportComponent">
    </import-video>
    
    <div v-if="showProgress" class="progress-bar">
      Progress: {{ uploadValue.toFixed() + "%" + " " }}
      <progress
        id="progress"
        :value="uploadValue"
        max="100"
        color="primary"
      ></progress>
    </div>   

    <div v-if="recordedBlob != null">
      <button @click="onUpload"> Upload</button>
    </div>
  </div>

  <video-uploaded-modal v-if="uploaded" @close="newVideo"> 
  </video-uploaded-modal>

    
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import firebase from "firebase";
import db from "@/db.js";
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
//import VideoRecordUpload from "../components/VideoRecordUpload";
import NavBar from "../components/NavBar";
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
//import videojs from "video.js";
import "webrtc-adapter";
//import RecordRTC from "recordrtc";
//import Record from "videojs-record/dist/videojs.record.js";
import VideoUploadedModal from '../components/VideoUploadedModal.vue';
import VideoRecord from '../components/VideoRecord.vue';
import ImportVideo from '../components/ImportVideo.vue';

export default defineComponent({
  name: "AskQuestion",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    NavBar,
    VideoUploadedModal,
    VideoRecord,
    ImportVideo
  },
  data() {
    return {    
      upload: true,  
      id: this.$route.params.id,
      video: {
        // userId: null,
        // title: null,
        // topic: null,
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
      recordedBlob: null,
      uploadValue: 0,    
    }; 
  },
 
  methods: {
         videoRecorded(value){
      this.recordedBlob= value
    },
    previewVideo(value) {
      this.uploadValue = 0;
     
      this.recordedBlob = value;
      this.blobURL = URL.createObjectURL(value);
    },
    saveToFirestore() {
     // const { serverTimestamp } = firebase.firestore.FieldValue;
    //   const videoInfo = {
    //     title: this.video.title,
    //     link: this.video.url,
    //     topic: this.video.topic,
    //     userId: this.video.userId,
    //     createdAt: serverTimestamp(),
    //   };
      db.collection("videos")
        .doc(this.id)
        .update({
           link: this.video.url 
        })
        .then(() => {
          console.log("Video uploaded successfully!");
          this.uploaded = true;
          this.player.reset();         
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
      this.uploadValue = 0;
      this.showProgress = false;
      this.$refs.videoImportComponent.resetInput();

      this.video.title = null;
      this.video.topic = null;
      this.video.url = null;

      this.errorOnUploading = {
        errorOnStorage: null,
        errorOnFirestore: null,
      };
      this.resetRecorder = true;
      this.$refs.videoRecordComponent.resetRecorder();
      //this.player.record().getDevice();
    },
    onUpload(formData) {
     
      this.showProgress = true;      
      this.video.url = null;
      this.video.title = formData.title;
      this.video.topic = formData.topic;
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
        .put(this.recordedBlob);
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
    console.log(this.id)
    /* eslint-disable no-console */
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.userId = user.uid;
    //   console.log(`This is user's id : ${user.uid}`)
    // }); 
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            console.log(uid);
            // ...
        } else {
            // User is signed out
            // ...
            console.log("User is signed out")
        }
    }); 
  },   
  beforeMount() {
    // console.log(this.id);
    // db.collection("videos")
    //   .doc("gmOKtGq4MPrlY0tJQ4mz")
    //   .get()
    //   .then((snapshot) => {
    //     this.setDisplayVideo(snapshot.data());
    //   });
    firebase.auth().signInAnonymously()
    .then(() => {
        // Signed in..
        console.log("User signed in anonymously")
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("error while signing in anonymously", errorCode, errorMessage)
    });
  },
});
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
  .container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
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
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .center {
    width: 45%;
  }
}
</style>
