<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Welcome to Login Page</ion-title>
        <router-link to="/home">
          <ion-button>HOME</ion-button>
        </router-link>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card class="center-ra">
        <ion-card-header>
          <h1>SignIn to Your RemoteAsk account</h1>
        </ion-card-header>

        <ion-card-content>
          <form @submit.prevent="userLogin">
            <ion-list>
              <ion-item>
                <ion-label stacked>Email</ion-label>
                <ion-input
                  type="email"
                  v-model="user.email"
                  placeholder="Enter email"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label stacked>Password</ion-label>
                <ion-input
                  type="password"
                  v-model="user.password"
                  placeholder="Enter Password"
                ></ion-input>
              </ion-item>
            </ion-list>

            <ion-button expand="block" type="submit" class="margin-ra"> Sign In </ion-button>
          </form>

          <ion-button expand="block" fill="outline" class="margin-ra" @click="googleLogin"
            >Sign In With Google</ion-button
          >
        </ion-card-content>

        <ion-card-footer>
          Dont have an account yet click here to
          <router-link to="/signup">Sign Up</router-link>
        </ion-card-footer>
      </ion-card>


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
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from "../db";

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          // this.$router.push("/signedin");
          this.$router.replace({ name: "Signedin" });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    googleLogin() {
      // Firebase Google Sign-in

      const provider = new firebase.auth.GoogleAuthProvider();
     
      firebase
        .auth()
        .signInWithPopup(provider)
         // eslint-disable-next-line no-unused-vars
        .then((result) => {
          this.$router.replace("Signedin");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
  },
});
</script>

<style>
.margin-ra {
  margin: 20px;
}

.center-ra {
  max-width: 400px;
  margin-right: auto;
  margin-left:auto;
}

</style>