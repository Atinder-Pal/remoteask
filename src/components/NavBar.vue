<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title>RemoteAsk</ion-title>
        </ion-col>
        <ion-col>
          <router-link to="/home">
            <ion-button>HOME</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/signup">
            <ion-button fill="outline">Sign In</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/signup">
            <ion-button fill="outline">Sign Up</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <ion-button type="submit" @click="logOut()">Log out</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>
</template>

<script>
import //   IonHeader,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//  IonButton,
"@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from "../db";

export default defineComponent({
  name: "LogoutTemplate",
  components: {
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar,
    //  IonButton,
  },
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
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/home");
          });
        });
    },
  },
});
</script>

<style scoped>
</style>