<template> <h1>Landing page</h1></template>

<script>
import db from "../db.js";

export default {
  data() {
    return {
      video: "gmOKtGq4MPrlY0tJQ4mz",
    };
  },
  methods: {
    setDisplayVideo() {},
  },
  beforeMount() {
    db.collection("videos")
      .doc(this.video)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
      });
  },
};
</script>
