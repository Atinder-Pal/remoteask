<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title><router-link to="/home">RemoteAsk</router-link> 
         <p> {{ user ? user.email : null }}</p></ion-title>
           
         </ion-col>


       <div  v-if="upload==true">  
        <ion-col>
          <router-link to="/upload">
            <ion-button fill="outline">Upload</ion-button>
          </router-link>
        </ion-col>
        <ion-col>
          <router-link to="/listVideos">
            <ion-button fill="outline">Listing</ion-button>
          </router-link>
        </ion-col>
                <ion-col>
    
          <ion-button fill="outline" type="submit" @click="logOut()">Log out</ion-button>
   

        </ion-col>
</div>

        <ion-col v-if="signup==true">
       <router-link to="/login">
            <ion-button fill="outline">Sign In</ion-button>
          </router-link>
        </ion-col>

        <ion-col v-if="togglelogin==true">
          <router-link to="/signup">
            <ion-button fill="outline">Sign Up</ion-button>
          </router-link>
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
//   name: "NavBar",
  props:['togglelogin','signup','upload'],
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
            this.$router.push("/login");
          });
        });
    },
  },
});
</script>

<style scoped>
</style>