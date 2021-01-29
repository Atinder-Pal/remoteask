<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">               
        <router-link to="/home">
        <ion-button>HOME</ion-button>
        </router-link>
        <VideoRecordUpload />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import VideoRecordUpload from '../components/VideoRecordUpload';

export default defineComponent({
  name: 'Upload',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    VideoRecordUpload
  },

});
</script>

<style scoped>

</style>