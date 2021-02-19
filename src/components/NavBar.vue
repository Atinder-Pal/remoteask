<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-title
            ><router-link to="/upload">RemoteAsk</router-link>
            <!-- <p>{{ user ? user.email : null }}</p> -->
            <div v-if="user.loggedIn">
              {{ user.data.email }}
            </div>
          </ion-title>
        </ion-col>

        <div v-if="upload == true">
          <ion-col>
            <router-link to="/upload">
              <ion-button fill="outline">Upload</ion-button>
            </router-link>
          </ion-col>
          <ion-col>
            <router-link to="/askquestion">
              <ion-button fill="outline">Ask</ion-button>
            </router-link>
          </ion-col>
          <ion-col>
            <router-link to="/listVideos">
              <ion-button fill="outline">My Videos</ion-button>
            </router-link>
          </ion-col>
          <ion-col>
            <ion-button fill="outline" type="submit" @click="logOut()"
              >Log out</ion-button
            >
          </ion-col>
        </div>

        <ion-col v-if="signup == true">
          <router-link to="/login">
            <ion-button fill="outline">Sign In</ion-button>
          </router-link>
        </ion-col>

        <ion-col v-if="togglelogin == true">
          <router-link to="/signup">
            <ion-button fill="outline">Sign Up</ion-button>
          </router-link>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-toolbar>

  <ion-tabs>
    <!-- Tab bar -->
    <ion-tab-bar slot="bottom">
      <ion-tab-button > 
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
import { IonButton, IonGrid } from "@ionic/vue";
import { defineComponent } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { db } from "../db";
import { mapGetters } from "vuex";
import { chatbubble, add, list, exit } from "ionicons/icons";

export default defineComponent({
  name: "NavBar",
  props: ["togglelogin", "signup", "upload"],
  components: {
    IonButton,
    IonGrid,
  },
  //   created() {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         this.user = user;
  //       } else {
  //         this.user = null;
  //       }
  //     });
  //   },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            //this.$router.push({ path: '/login',query: { redirect: '/upload' } });
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
