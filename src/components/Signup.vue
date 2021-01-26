<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Welcome to SignUp Page</ion-title>
        <router-link to="/home">
          <ion-button>HOME</ion-button>
        </router-link>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login Page</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <router-link to="/">Sign In</router-link>

        <p>SignUp</p>
      </div>

      <form @submit.prevent="userRegistration">
        <div>
          <label>Name</label>
          <input type="text" v-model="user.name"/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" v-model="user.email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password"  v-model="user.password" />
        </div>

          <ion-button type="submit">
        Sign Up
      </ion-button>


      </form>
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
import { db } from '../db'

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
  },

 data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(res => {
          res.user
            .updateProfile({
              displayName: "this.user.name",
              phoneNumber: "employee"
            })
            .then(() => {
              this.$router.push("/upload");
            });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }

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