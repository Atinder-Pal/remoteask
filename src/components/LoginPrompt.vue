<template>
  <div>
    <router-link to="/login">
      <ion-button>Login</ion-button>
    </router-link>
    <router-link to="/signup">
      <ion-button>Register</ion-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LoginPrompt",
};
</script>
