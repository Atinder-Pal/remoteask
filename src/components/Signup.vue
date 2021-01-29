<template>
  <ion-page>
    <ion-header :translucent="true">
 <NavBar v-bind:signup="signup"/>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card class="center-ra">
        <ion-card-header>
          <h1>SignUp to to create your RemoteAsk account</h1>
        </ion-card-header>

        <ion-card-content>
          <form @submit.prevent="userRegistration">
            <ion-list>
              <ion-item>
                <ion-label stacked>Name</ion-label>
                <ion-input
                  type="text"
                  v-model="user.name"
                  placeholder="Enter Name"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label stacked>Email</ion-label>
                <ion-input
                  type="email"
                  v-model="user.email"
                  placeholder="Enter Email"
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
              Sign Up
            </ion-button>
          </form>
        </ion-card-content>

        <ion-card-subtitle>
          <p class="margin-ra">
            Already have an account click here to
            <router-link to="/login">Sign In</router-link>
          </p>
        </ion-card-subtitle>
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
  IonCard,
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
    IonButton,
    IonInput,
    NavBar,
    IonCard,
  },

  data() {
    return {
        signup:true,
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.user.name = "";
              this.user.email = "";
              this.user.password = "";

              this.$router.push("/login");
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
</script>

<style scoped>

</style>