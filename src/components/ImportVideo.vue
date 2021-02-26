<template>
  <div class="show-border">
    <ion-label class="import-video-label" stacked
      >Add video from Device</ion-label
    >

    <section>
      <ion-input
        class="center"
        type="file"
        @change="previewVideo"
        accept="video/*"
        ref="inputForFile"
      ></ion-input>
    </section>
  </div>
  <div v-if="videoData != null">
    <p>Preview Video before uploading:</p>
    <div class="resp-container">
      <iframe
        class="preview resp-iframe"
        :src="blobURL"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
import { IonLabel, IonInput } from "@ionic/vue";
export default {
  data() {
    return {
      videoData: null,
      blobURL: null,
    };
  },
  components: {
    IonLabel,
    IonInput,
  },
  methods: {
    previewVideo() {
      // this.uploadValue = 0;
      //this.videoData = this.$refs.inputForFile.files[0];
      this.videoData = event.target.files[0];
      // this.recordedBlob = this.videoData;
      this.blobURL = URL.createObjectURL(this.videoData);
      this.$emit("videoImported", this.videoData);
    },
    resetInput() {
      this.$refs.inputForFile.value = null;
      this.videoData = null;
    },
  },
};
</script>

<style scoped="">
.resp-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
}
.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

#myVideo {
  margin-right: auto;
  margin-bottom: 1.5em;
}
.video-player {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
iframe {
  object-fit: fill;
}
.align-center {
  text-align: center;
}

.show-border {
  border: 2px solid #bbb0ba ;
  padding: 10px;
  margin: 20px;
  box-shadow: 0px 5px 20px #888;
  border-radius: 5px;
}
section {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.label-class {
  font-size: small;
}
.progress-bar {
  margin-top: 2em;
}
h4 {
  text-align: center;
  color: green;
}
@media only screen and (min-width: 760px) {
  .container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .progress-bar {
    font-size: 1.3em;
  }
  p {
    font-size: 1.3em;
  }
  .import-video-label {
    font-size: 1.3em;
  }
  .center {
    font-size: 1.3em;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
  .label-class {
    font-size: large;
  }
}
@media screen and (min-width: 1024px) {
  .container {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .center {
    width: 45%;
  }
}
</style>
