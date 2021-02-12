<template>
  <div>
    <router-link to="/login">
      <button>Login</button>
    </router-link>
    <router-link to="/signup">
      <button>Register</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LoginPrompt",
};
</script>
