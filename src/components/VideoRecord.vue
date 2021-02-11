<template>
    
    <div class="video-player">
      <video
        id="myVideo"
        class="video-js vjs-default-skin vjs-16-9"
        data-setup='{"fluid": true}'
        playsinline
      ></video>
      <p class="align-center" v-if="!deviceReady">
        Click or Tap on Camera Icon to enable the camera
      </p>
      <p class="align-center" v-if="deviceReady">Record a video</p>
    </div>
   
</template>

<script>
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";
import "webrtc-adapter";
import RecordRTC from "recordrtc";
//import Record from "videojs-record/dist/videojs.record.js";

export default {
    data() {
        return {
             deviceReady: false,
             player: "",
            options: {
                controls: true,
                autoplay: false,
                fluid: false,
                loop: false,
                bigPlayButton: true,
                controlBar: {
                    volumePanel: true,
                },
                plugins: {
                    // configure videojs-record plugin
                    record: {
                        audio: true,
                        video: {
                            mandatory: {
                                // chromeMediaSource: 'screen',
                                minWidth: 1280,
                                minHeight: 720,
                                maxWidth: 1920,
                                maxHeight: 1080,
                                minAspectRatio: 1.77
                            },
                            optional: []
                        },
                        minFrameRate: 30,
                        maxFramerate:30,                        
                        debug: true,
                        maxLength: 600,
                        videoMimeType: "video/webm;codecs=vp9",
                    },
                },
            }
        }
    },
   methods: {
       resetRecorder() {
           this.player.record().getDevice();
       }
   },
    mounted() {
    /* eslint-disable no-console */
    
    this.player = videojs("#myVideo", this.options, () => {
      // print version information at startup
      var msg =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and recordrtc " +
        RecordRTC.version;
      videojs.log(msg);
    });
    // device is ready
    this.player.on("deviceReady", () => {
      console.log("device is ready!");
      this.deviceReady = true;      
    });
    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("started recording!");
    
    });
    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      //this.recordedBlob = this.player.recordedData;
      this.$emit('videoRecorded', this.player.recordedData)
      // ==========================save video on desktop====================================
       this.player.record().saveAs({'video': 'recording.mp4'});
      // ===================================================================================
    });
    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });
    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
}
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
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px #888;
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
