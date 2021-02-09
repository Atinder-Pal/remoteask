<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">        
        <h1>Ask a Question</h1>
        <form-for-video-info @clickedUpload="shareQuestion"> </form-for-video-info>
        <div v-if="modal" id="modal">
            <textarea
                name="copyContent"
                id="copyContent"
                cols="30"
                rows="10"
                :value="shareLink"
            ></textarea>
      <button @click="copyLink">Copy</button>
    </div>
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
import FormForVideoInfo from "../components/FormForVideoInfo";

export default defineComponent({
  name: "AskQuestion",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    NavBar,
    FormForVideoInfo
  },
  data() {
    return {    
      upload: true,
      userId: null,
      docId: null,
       modal: false,
      shareLink: "",
    };
  },
  methods: {
       shareQuestion(formData) {
         this.saveToFirestore(formData);          
      },
      copyLink() {
      document.querySelector("#copyContent").select();
      document.execCommand("copy");
    },
      saveToFirestore(formData) {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      const videoInfo = {
        title: formData.title,
        link: null,
        topic: formData.topic,
        userId: this.userId,
        createdAt: serverTimestamp(),
      };
      db.collection("videos")
        .add(videoInfo)
        .then((docRef) => {
          this.docId = docRef.id;
          console.log(`This is document id: ${docRef.id}`)
          this.modal = !this.modal;
          console.log(this.docId);
          this.shareLink = `http://localhost:8100/answerquestion/${this.docId}`;
        })
        .catch((error) => {
         console.log(error);
        });
    },
  },
   mounted() {
    /* eslint-disable no-console */
    firebase.auth().onAuthStateChanged((user) => {
      this.userId = user.uid;
      console.log(`This is user's id : ${user.uid}`)
    });  
  }, 
  beforeUnmount() {
    if (this.modal) {
      this.modal = !this.modal;
    }
  },
});
</script>

<style scoped></style>