<template>
  <ion-page id="full-page">
    <ion-header :translucent="true">
      <NavBar v-bind:upload="upload" id="navbar" />
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <DisplayListVideos />
      </div>
    </ion-content>
    <footer>
      <TabBar id="tabbar" />
    </footer>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import DisplayListVideos from "../components/DisplayListVideos.vue";
import NavBar from "../components/NavBar";
import TabBar from "../components/TabBar";

export default defineComponent({
  name: "ListVideos",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    DisplayListVideos,
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
#full-page {
  display: flex;
  flex-direction: column;
}

#container {
  max-width: 600px;
  margin: auto;
  overflow: scroll;
  margin-bottom: 0px;
}

#full-page > * {
  overflow: scroll;
}
</style>
