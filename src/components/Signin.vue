<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Welcome to Pafe after user login</ion-title>
          <router-link to="/home">
        <ion-button>HOME</ion-button>
        </router-link>
   
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Page after user logggs in</ion-title>
        </ion-toolbar>
      </ion-header>
    


      <div>
      <p>Dont have an account yet click here to
                   <router-link to="/signup"
              >Sign up</router-link ></p>
        </div>

  

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
    <button
      type="submit"

      @click="logOut()"
    >
      Log out
    </button>


        

    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
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
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
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