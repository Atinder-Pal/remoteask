<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <!-- <router-link to="/home">
        <ion-button>HOME</ion-button>
        </router-link> -->
        <VideoRecordUpload />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import VideoRecordUpload from "../components/VideoRecordUpload";
import NavBar from "../components/NavBar";

export default defineComponent({
  name: "Upload",
  components: {
    IonContent,
    IonHeader,
    IonPage,

    VideoRecordUpload,
    NavBar,
  },
  data() {
    return {
      upload: true,
    };
  },
});
</script>

<style scoped></style>
