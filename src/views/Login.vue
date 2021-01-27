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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login Page</ion-title>
        </ion-toolbar>
      </ion-header>
    


      <div>
      <p>Dont have an account yet click here to
                   <router-link to="/signup"
              >Sign up</router-link ></p>
        </div>

   <form @submit.prevent="userLogin">

  <h1>SignIn to Your RemoteAsk account</h1>

      <div>
        <label>Email</label>
        <ion-input
          type="email"
          v-model="user.email"
        placeholder="Enter email"></ion-input>
      </div>

      <div>
        <label>Password</label>
        <ion-input
          type="password"
          v-model="user.password"
        placeholder="Enter Password"></ion-input>
      </div>

      <ion-button type="submit">
        Sign In
      </ion-button>


     </form>


   <ion-button @click="googleLogin">SignIn With Google</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from '../db'

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput
  },
 data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        // eslint-disable-next-line no-unused-vars
        .then(data => {
         // this.$router.push("/signedin");
          this.$router.replace({ name: "Signedin" });
        })
        .catch(error => {
          alert(error.message);
        });
    },
    googleLogin(){
       // Firebase Google Sign-in

    const provider = new firebase.auth.GoogleAuthProvider();
        // eslint-disable-next-line no-unused-vars
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.$router.replace('Signedin');
        }).catch((err) => {
          alert('Oops. ' + err.message)
        });
    
    },
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