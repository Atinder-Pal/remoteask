<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" />
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <DisplayListVideos />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import DisplayListVideos from "../components/DisplayListVideos.vue";
import NavBar from "../components/NavBar";

export default defineComponent({
  name: "ListVideos",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    DisplayListVideos,
    NavBar,
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
