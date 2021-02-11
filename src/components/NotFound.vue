<template>
  <div>
    <h2>404 {{ pageName }} not found!</h2>
  </div>
</template>

<script>
export default {
  name: "not-found",
  props: ["pageName"],
};
</script>
