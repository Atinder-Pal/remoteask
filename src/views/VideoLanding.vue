<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <VideoLandingPage v-bind:videoDocUID="$route.params.uid" />
        <!-- Log in option if not logged in -->
        <LoginPrompt />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import NavBar from "../components/NavBar";
import VideoLandingPage from "../components/VideoLandingPage";
import LoginPrompt from "../components/LoginPrompt";

export default defineComponent({
  name: "VideoLanding",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    VideoLandingPage,
    NavBar,
    LoginPrompt,
  },
  data() {
    return {
      upload: true,
    };
  },
});
</script>

<style scoped>
#container {
  max-width: 600px;
  margin: auto;
}
</style>
