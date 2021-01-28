<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>

        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">


      <h3>Welcome</h3>    <p v-if="user">You are logged in!</p>
      <p>{{ user ? user.email : null }}</p>
      <!-- <p>{{ user.providerData.email }}</p> -->
      <pre>{{ user }}</pre>
 
  

 <h3>Welcome</h3>
 <!-- ================================================= -->
         <router-link to="/upload">
        <ion-button>UPLOAD</ion-button>
        </router-link>
       
       <router-link to="/listVideos">
        <ion-button>LIST VIDEOS</ion-button>
        </router-link>
 <!-- ================================================= -->
    <!-- <p>{{ user.displayName }}</p> -->
    <!-- <p>{{ user.email }}</p> -->
<pre>{{ user }}</pre>
         

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
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from "../db";

import NavBar from "../components/NavBar";

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    // eslint-disable-next-line vue/no-unused-components
    IonTitle,
    IonToolbar,
    // eslint-disable-next-line vue/no-unused-components
    IonButton,
    NavBar,
  },
  // data() {
  //   return {
  //     user: null
  //   };
  // },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {


  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 15%;
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
}
</style>