<template>
	<div>
		<video
			id="myVideo"
			class="video-js vjs-default-skin vjs-16-9"
			data-setup='{"fluid": true}'
			playsinline
		></video>

		<ion-item>
			<ion-button
				class="video-control-buttons"
				fill="outline"
				@click.prevent="startCamera"
				>Start Camera</ion-button
			>
			<ion-button
				class="video-control-buttons"
				fill="outline"
				@click.prevent="startRecording"
				>Start Recording</ion-button
			>
			<ion-button
				class="video-control-buttons"
				fill="outline"
				@click.prevent="stopRecording"
				>Stop Recording</ion-button
			>
		</ion-item>
		<p class="align-center" v-if="!deviceReady">
			Click or Tap on Start Camera Button to enable the camera
		</p>
		<p class="align-center" v-if="deviceReady">Record a video</p>
	</div>
</template>

<script>
	import 'video.js/dist/video-js.css';
	import 'videojs-record/dist/css/videojs.record.css';
	import videojs from 'video.js';
	import 'webrtc-adapter';
	import RecordRTC from 'recordrtc';
	//import Record from "videojs-record/dist/videojs.record.js";

	export default {
		data() {
			return {
				deviceReady: false,
				player: '',
				options: {
					controls: true,
					autoplay: false,
					fluid: false,
					loop: false,
					bigPlayButton: false,
					controlBar: {
						volumePanel: true,
						deviceButton: false,
						recordToggle: false,
						pipTggle: false,
					},
					plugins: {
						// configure videojs-record plugin
						record: {
							audio: true,
							pip: false,
							video: {
								mandatory: {
									// chromeMediaSource: 'screen',
									minWidth: 1280,
									minHeight: 720,
									maxWidth: 1920,
									maxHeight: 1080,
									minAspectRatio: 1.77,
								},
								optional: [],
							},
							minFrameRate: 30,
							maxFramerate: 30,
							debug: true,
							maxLength: 600,
							videoMimeType: 'video/webm;codecs=vp9',
						},
					},
				},
			};
		},
		methods: {
			resetRecorder() {
				this.player.record().reset();
			},
			startCamera() {
				this.player.record().getDevice();
			},
			startRecording() {
				this.player.record().start();
			},
			stopRecording() {
				this.player.record().stop();
				//this.player.record().stopDevice();
			},
		},
		mounted() {
			/* eslint-disable no-console */

			this.player = videojs('#myVideo', this.options, () => {
				// print version information at startup
				var msg =
					'Using video.js ' +
					videojs.VERSION +
					' with videojs-record ' +
					videojs.getPluginVersion('record') +
					' and recordrtc ' +
					RecordRTC.version;
				videojs.log(msg);
			});
			// device is ready
			this.player.on('deviceReady', () => {
				console.log('device is ready!');
				this.deviceReady = true;
			});
			// user clicked the record button and started recording
			this.player.on('startRecord', () => {
				console.log('started recording!');
			});
			// user completed recording and stream is available
			this.player.on('finishRecord', () => {
				// the blob object contains the recorded data that
				// can be downloaded by the user, stored on server etc.
				console.log('finished recording: ', this.player.recordedData);
				//this.recordedBlob = this.player.recordedData;
				this.$emit('videoRecorded', this.player.recordedData);
				// ==========================save video on desktop====================================
				this.player.record().saveAs({ video: 'recording.mp4' });
				// ===================================================================================
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
		},
	};
</script>
<style scoped>
	/* #myVideo {
		background-color: rgb(68, 15, 105);
	} */

	.video-control-buttons {
		padding: 0;
		font-size: 9px;
		font-weight: 400;
	}

	@media only screen and (min-width: 768px) {
		.video-control-buttons button {
			padding: 5px;
			font-size: 14px;
			font-weight: 500;
		}
	}
</style>
