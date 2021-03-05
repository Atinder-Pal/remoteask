<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card class="center-ra">
        <ion-card-header>
          <h1>Ask a Question</h1>
        </ion-card-header>

        <ion-card-content>
          <form-for-video-info
            @formSubmitted="shareQuestion"
            submitButton="Share Question"
            ref="form"
          >
          </form-for-video-info>

          <ion-button
            expand="block"
            class="button-margin"
            @click.prevent="newQuestion"
            >New Question</ion-button
          >
        </ion-card-content>

        <link-share-modal
          v-if="modal"
          :link="shareLink"
          @close="modal = false"
          @copyLink="copyLink"
        >
        </link-share-modal>
      </ion-card>
    </ion-content>
    <TabBar />
  </ion-page>
</template>

<script>
import firebase from "firebase";
import db from "@/db.js";
import configData from "../config.json";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";
import FormForVideoInfo from "../components/FormForVideoInfo";
import LinkShareModal from "../components/LinkShareModal";
import Modal from "../components/IonModal.vue";
export default defineComponent({
  name: "AskQuestion",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonButton,
    NavBar,
    FormForVideoInfo,
    LinkShareModal,
    TabBar,
  },
  data() {
    return {
      upload: true,
      userId: null,
      docId: null,
      // modal: false,
      shareLink: null,
    };
  },
  methods: {
    async shareQuestion(formData) {
      console.log("Share Link: ", this.shareLink);
      if (this.shareLink == null) {
        await this.saveToFirestore(formData);
        if (navigator.share) {
          navigator
            .share({
              title: "WebShare API Demo",
              url: this.shareLink,
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch(console.error);
        } else {
          // fallback
          console.log("WEB share API not supported!");
          //this.modal = true;
          //console.log("modal: "+ this.modal)
          this.openModal();
        }
      } else {
        if (navigator.share) {
          navigator
            .share({
              title: "WebShare API Demo",
              url: this.shareLink,
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch(console.error);
        } else {
          // fallback
          console.log("WEB share API not supported!");
          //this.modal = true;
          //console.log("modal: "+ this.modal)
          this.openModal();
        }
      }
    },
    // copyLink() {
    // 	let textField = document.createElement('textarea');
    // 	textField.innerText = this.shareLink;
    // 	document.body.appendChild(textField);
    // 	textField.select();
    // 	textField.focus(); //SET FOCUS on the TEXTFIELD
    // 	document.execCommand('copy');
    // 	textField.remove();
    // 	console.log('should have copied ' + this.shareLink);
    // },
    async saveToFirestore(formData) {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      const videoInfo = {
        title: formData.title,
        link: null,
        topic: formData.topic,
        userId: this.userId,
        createdAt: serverTimestamp(),
      };
      await db
        .collection("videos")
        .add(videoInfo)
        .then((docRef) => {
          this.docId = docRef.id;
          console.log(`This is document id: ${docRef.id}`);
          console.log(this.docId);
          //Citation- Borrowed code for getting dynamic link from Birm
          this.shareLink = `${window.location.protocol}//${window.location.host}/answerquestion/${this.docId}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newQuestion() {
      this.shareLink = null;
      this.$refs.form.clearInputFields();
    },
    async openModal() {
      const modal = await modalController.create({
        component: Modal,
        cssClass: "my-custom-class",
        componentProps: {
          link: this.shareLink,
        },
      });
      return modal.present();
    },
  },
  mounted() {
    /* eslint-disable no-console */
    firebase.auth().onAuthStateChanged((user) => {
      this.userId = user.uid;
      console.log(`This is user's id : ${user.uid}`);
    });
  },
  beforeUnmount() {
    if (this.modal) {
      this.modal = !this.modal;
    }
  },
});
</script>

<style scoped>
.my-custom-class {
  --backdrop-opacity: 0.8 !important;
  --max-width: 400px !important;
  --max-height: 100px !important;
}

.button-margin {
  margin: 20px;
}

.center-ra {
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
}
</style>
