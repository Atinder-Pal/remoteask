<template>
 
    <ion-tabs>
      <!-- Tab bar -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button>
          <router-link to="/upload">
            <ion-icon :icon="add" size="large"></ion-icon>
          </router-link>
          UPLOAD
        </ion-tab-button>

        <ion-tab-button>
          <router-link to="/askquestion">
            <ion-icon :icon="chatbubble" size="large"></ion-icon>
          </router-link>
          ASK
        </ion-tab-button>

        <ion-tab-button>
          <router-link to="/listVideos">
            <ion-icon :icon="list" size="large"></ion-icon>
          </router-link>
          MY VIDEOS
        </ion-tab-button>

        <ion-tab-button @click="logOut()">
          <ion-icon :icon="exit" size="large"></ion-icon>
          LOG OUT
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

</template>

<script>
import { defineComponent } from "vue";
import firebase from "firebase/app";

import { chatbubble, add, list, exit } from "ionicons/icons";

export default defineComponent({
  name: "NavBar",
  props: ["togglelogin", "signup", "upload"],
  components: {},

  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.replace("login");
          });
        });
    },
  },

  setup() {
    return {
      chatbubble,
      add,
      list,
      exit,
    };
  },
});
</script>

<style scoped></style>
