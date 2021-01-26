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
        <strong>List of Videos</strong>
        <router-link to="/home">
          <ion-button>HOME</ion-button>
        </router-link>
        <button @click="list">List videos</button>
        <ul>
          <li v-for="item in itemsArray" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import db from "../db.js";

export default defineComponent({
  name: "ListVideos",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      itemsArray: [],
    };
  },
  methods: {
    list() {
      db.collection("videos").onSnapshot((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        this.itemsArray.push(...items);
      });
    },
  },
});
</script>

<style scoped>
/* #container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
} */
</style>
