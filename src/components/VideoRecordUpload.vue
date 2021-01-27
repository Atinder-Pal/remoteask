<template>
    <p>Record video and upload it </p>
    <video id="myVideo" class="video-js vjs-default-skin" playsinline></video>
    <div v-if="recordedBlob!=null">      
        <form @submit.prevent="onUpload(recordedBlob)">            
            <label for="videoName">Name of Video</label><br />
            <input type="text" id="videoName" v-model="videoName" ><br />
            <label for="topic">Topic of Video</label><br />
            <input type="text" id="topic" v-model="topic" >
            <button type="submit"> Upload </button>            
        </form>      
    </div>
    <div>
        <p>or Upload video from Device:</p>
        <input type="file" @change="previewVideo" accept="video/*" >
    </div>
    <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <div v-if="videoData!=null">
        <p>Preview Video before uploading:</p>
        <iframe class="preview" :src="blobURL"></iframe>
        <br />
        <form @submit.prevent="onUpload(videoData)">
            <label for="videoName">Name of Video</label><br />
            <input type="text" id="videoName" v-model="videoName" ><br />
            <label for="topic">Topic of Video</label><br />
            <input type="text" id="topic" v-model="topic" >
            <button type="submit"> Upload </button>            
        </form>        
    </div>

    <div v-if="url!=null">
    <p> Here is the video you just uploaded:</p>
    <iframe id="recordedVideo" :src="url"></iframe>     
    </div>
   
</template>

<script>
    /* eslint-disable */
    import 'video.js/dist/video-js.css'
    import 'videojs-record/dist/css/videojs.record.css'
    import videojs from 'video.js'
    import 'webrtc-adapter'
    import RecordRTC from 'recordrtc'    
    import Record from 'videojs-record/dist/videojs.record.js'    
    import firebase from 'firebase';  
    import db from '@/db.js'
    export default {        
        data() {
            return { 
                userId: null,
                recordings: {}, 
                videoName: '',                                  
                i:0,                
                blobURL:null,
                videoData: null,
                recordedBlob: null,
                url: null,
                topic:'',
                uploadValue: 0,
                storageRef: '',
                player: '',
                options: {
                    controls: true,
                    autoplay: false,
                    fluid: false,
                    loop: false,
                    width: 320,
                    height: 240,
                    bigPlayButton: true,
                    controlBar: {
                        volumePanel: true
                    },                    
                    plugins: {                       
                        // configure videojs-record plugin
                        record: {
                            audio: true,
                            video: true,
                            debug: true,
                            maxLength: 100,
                            videoMimeType: 'video/webm;codecs=vp9'
                        }
                    }
                }
            };
        },        
        methods:{
            previewVideo(event) {
            this.uploadValue=0;
            this.url=null;
            this.videoData = event.target.files[0];
            this.blobURL = URL.createObjectURL(this.videoData);
            },
            onUpload(video){
                this.videoData=null;
                this.url=null;
                this.i++;                
               
                const storageRef=firebase.storage().ref(`${video.name}`).put(video);
                storageRef.on(`state_changed`,snapshot=>{
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.url =url;                        
                        const videoInfo = {
                            //name: video.name,
                            name: this.videoName,
                            link: this.url,
                            topic: this.topic,
                            userId: this.userId
                        }
                        db.collection('videos').add(videoInfo).then(()=>{this.topic = '';
                            this.videoName = ''});                        
                        });
                    });
                    this.recordedBlob = null;
                    this.videoData = null;
                    console.log(this.topic);
            }            
               
        },        
        mounted() {                
            /* eslint-disable no-console */
            //=================this code needs testing with Authentication
             firebase.auth().onAuthStateChanged(user => {
                    this.userId = user.uid;
                });
            //=================================================================
            this.player = videojs('#myVideo', this.options, () => {
                // print version information at startup
                var msg = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-record ' + videojs.getPluginVersion('record') +
                    ' and recordrtc ' + RecordRTC.version;
                videojs.log(msg);
            });
            
            // device is ready
            this.player.on('deviceReady', () => {
                console.log('device is ready!');               
            });

            // user clicked the record button and started recording
            this.player.on('startRecord', () => {
                console.log('started recording!');
            });

            // user completed recording and stream is available
            this.player.on('finishRecord', () => {
                this.i++;
                // the blob object contains the recorded data that
                // can be downloaded by the user, stored on server etc.
                console.log('finished recording: ', this.player.recordedData);                          
                this.recordedBlob = this.player.recordedData;
                // show save as dialog
                this.player.record().saveAs({'video': 'recording'+this.i+'.mp4'});                
            });

            // error handling
            this.player.on('error', (element, error) => {
                console.warn(error);
            });

            this.player.on('deviceError', () => {
                console.error('device error:', this.player.deviceErrorCode);
            });
        },
        beforeUnmount() { 
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>
<style scoped="">
img.preview {
    width: 200px;
}
#myVideo {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3em;
}

</style>