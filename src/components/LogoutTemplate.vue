<template>
  <!-- <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Welcome to Page after user login</ion-title>
        <router-link to="/home">
          <ion-button>HOME</ion-button>
        </router-link>

        <div>
          <router-link to="/signup">Sign up</router-link>
          <button type="submit" @click="logOut()">Log out</button>
          <p v-if="user">You are logged in!</p>
        </div>
      </ion-toolbar>
    </ion-header>
 -->
  <!-- <p>{{ user.displayName }}</p> -->
  <!-- <p>{{ user.providerData.email }}</p> -->
  <!-- <pre>{{ user }}</pre> -->
  <!-- </ion-page> -->
  <div>
    <router-link to="/home">
      <ion-button>Home</ion-button>
    </router-link>

    <!-- <router-link to="/signup"><ion-button>Sign Up</ion-button></router-link> -->
    <ion-button type="submit" @click="logOut()">Log out</ion-button>
    <p v-if="user">You are logged in!</p>
    <!-- <p>{{ user.displayName }}</p> -->
  </div>
</template>

<script>
import {
  //   IonHeader,
  //   IonPage,
  //   IonTitle,
  //   IonToolbar,
  IonButton,
} from "@ionic/vue";
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
    IonButton,
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
