<template>
  <ion-page id="upload-page">
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
    <footer>
      <TabBar />
    </footer>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import VideoRecordUpload from "../components/VideoRecordUpload";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";

export default defineComponent({
  name: "Upload",
  components: {
    IonContent,
    IonHeader,
    IonPage,

    VideoRecordUpload,
    NavBar,
    TabBar,
  },
  data() {
    return {
      upload: true,
    };
  },
});
</script>

<style scoped>
#upload-page {
  display: flex;
  flex-direction: column;
}

#upload-page > * {
  overflow: scroll;
}
</style>
