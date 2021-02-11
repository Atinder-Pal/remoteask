<template>
  <ion-page>
    <ion-header :translucent="true">
      <NavBar v-bind:togglelogin="togglelogin" />
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

            <ion-button expand="block" type="submit" class="margin-ra">
              Sign In
            </ion-button>
          </form>

          <ion-button
            expand="block"
            fill="outline"
            class="margin-ra"
            @click="googleLogin"
            >Sign In With Google</ion-button
          >

                    <ion-button
            expand="block"
            fill="outline"
            class="margin-ra"
            @click="googleCapacitorLogin"
            >Sign In With Capacitor Google</ion-button
          >

          <hr />
          <PhoneLogin />
        </ion-card-content>

        <ion-card-footer>
          <p class="margin-ra">
            Dont have an account yet click here to
            <router-link to="/signup">Sign Up</router-link>
          </p>
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
  IonButton,
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from "../db";

import NavBar from "../components/NavBar";
import PhoneLogin from "../components/PhoneLogin";

import'@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core'

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonButton,
    IonInput,
    NavBar,
    PhoneLogin,
  },

  data() {
    return {
      togglelogin: true,
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
          this.user.email = "";
          this.user.password = "";
          setTimeout(() => this.$router.push({ path: "/upload" }), 1000);
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
          this.user.email = "";
          this.user.password = "";
          setTimeout(() => this.$router.push({ path: "/upload" }), 1000);
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },

    // https://devdactic.com/capacitor-google-sign-in/

        async googleCapacitorLogin() {
  
   let googleUser =  await Plugins.GoogleAuth.signIn();
console.log('my user: ', googleUser);
const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);

  firebase
        .auth()
        .signInWithCredential(credential)
        // eslint-disable-next-line no-unused-vars
        .then((result) => {
          // this.user.email = "";
          // this.user.password = "";
          setTimeout( () => this.$router.push({ path: '/upload'}), 1000);
        })
        .catch((err) => {
          alert("Oops. " + err);
        });
        

    }, // end google capacitor login


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
  margin-left: auto;
}
</style>
