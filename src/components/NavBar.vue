<template>
  <ion-toolbar>
    <ion-grid>
      <ion-row>
        <ion-col id="logo-col">
          <ion-title
            ><router-link to="/upload"
              ><div id="logo">remote<span>ask</span></div></router-link
            >
          </ion-title>
        </ion-col>

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
</template>

<script>
import { IonButton, IonGrid } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "NavBar",
  props: ["togglelogin", "signup", "upload"],
  components: {
    IonButton,
    IonGrid,
  },

  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
});
</script>

<style scoped>
ion-toolbar {
  --ion-text-color: #fff;
}

a {
  text-decoration: none;
}

#logo-col {
  display: flex;
  align-items: center;
}

#logo {
  padding: 0.5%;
  text-transform: uppercase;
  text-decoration: none;
  width: max-content;
}

#logo > span {
  color: #fca739;
}
</style>
