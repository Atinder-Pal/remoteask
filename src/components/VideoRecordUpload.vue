<template>
	<ion-card class="center-ra">
		<ion-card-content>
			<video-record @videoRecorded="videoRecorded" ref="videoRecordComponent">
			</video-record>
			<p>or</p>

			<import-video @videoImported="previewVideo" ref="videoImportComponent">
			</import-video>

			<div v-if="showProgress" class="progress-bar">
				Progress: {{ uploadValue.toFixed() + '%' + ' ' }}
				<ion-progress-bar
					id="progress"
					color="primary"
					:value="uploadValue"
					max="100"
				></ion-progress-bar>
				<!-- <progress
					id="progress"
					:value="uploadValue"
					max="100"
					color="primary"
				></progress> -->
			</div>

			<div v-if="recordedBlob != null">
				<form-for-video-info @formSubmitted="onUpload" submitButton="Upload">
				</form-for-video-info>
			</div>
		</ion-card-content>
	</ion-card>
	<video-uploaded-modal v-if="uploaded" @close="newVideo">
	</video-uploaded-modal>
</template>

<script>
	/* eslint-disable */

	import 'video.js/dist/video-js.css';
	import 'videojs-record/dist/css/videojs.record.css';
	import videojs from 'video.js';
	import 'webrtc-adapter';
	import RecordRTC from 'recordrtc';
	import Record from 'videojs-record/dist/videojs.record.js';
	import firebase from 'firebase';
	import db from '@/db.js';
	import FormForVideoInfo from './FormForVideoInfo.vue';
	import VideoUploadedModal from './VideoUploadedModal.vue';
	import VideoRecord from './VideoRecord.vue';
	import ImportVideo from './ImportVideo.vue';
	import { IonCard, IonProgressBar } from '@ionic/vue';

	export default {
		data() {
			return {
				video: {
					userId: null,
					title: null,
					topic: null,
					url: null,
				},
				errorOnUploading: {
					errorOnStorage: null,
					errorOnFirestore: null,
				},
				deviceReady: false,
				showProgress: false,
				uploaded: false,
				blobURL: null,
				recordedBlob: null,
				uploadValue: 0,
			};
		},
		components: {
			FormForVideoInfo,
			VideoUploadedModal,
			VideoRecord,
			ImportVideo,
			IonCard,
			IonProgressBar,
		},
		methods: {
			videoRecorded(value) {
				this.recordedBlob = value;
			},
			previewVideo(value) {
				this.uploadValue = 0;

				this.recordedBlob = value;
				this.blobURL = URL.createObjectURL(value);
			},
			saveToFirestore() {
				const { serverTimestamp } = firebase.firestore.FieldValue;
				const videoInfo = {
					title: this.video.title,
					link: this.video.url,
					topic: this.video.topic,
					userId: this.video.userId,
					createdAt: serverTimestamp(),
				};
				db.collection('videos')
					.add(videoInfo)
					.then(() => {
						console.log('Video uploaded successfully!');
						this.uploaded = true;
						this.player.reset();
						console.log('Media File uploaded to Firestore');
					})
					.catch((error) => {
						this.errorOnUploading.errorOnFirestore =
							'Error uploading video info to Firestore' + error;
					});
			},
			newVideo() {
				this.uploaded = false;
				this.recordedBlob = null;
				this.uploadValue = 0;
				this.showProgress = false;
				this.$refs.videoImportComponent.resetInput();

				this.video.title = null;
				this.video.topic = null;
				this.video.url = null;

				this.errorOnUploading = {
					errorOnStorage: null,
					errorOnFirestore: null,
				};
				this.resetRecorder = true;
				this.$refs.videoRecordComponent.resetRecorder();
				//this.player.record().getDevice();
			},
			onUpload(formData) {
				this.showProgress = true;
				this.video.url = null;
				this.video.title = formData.title;
				this.video.topic = formData.topic;
				//Citation: Danish suggested to save file with timestamp name, referenced code from her
				const date = new Date();
				const fileName =
					date.toDateString() +
					'-' +
					date.getHours() +
					'-' +
					date.getMinutes() +
					'.webm';
				// Citation end
				const storageRef = firebase
					.storage()
					.ref(`${fileName}`)
					.put(this.recordedBlob);
				storageRef.on(
					`state_changed`,
					(snapshot) => {
						this.uploadValue =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					},
					(error) => {
						this.errorOnUploading.errorOnStorage =
							'Error uploading media file to Storage' + error;
					},
					() => {
						this.uploadValue = 100;
						storageRef.snapshot.ref.getDownloadURL().then((url) => {
							this.video.url = url;
							this.saveToFirestore();
						});
					}
				);
			},
		},
		mounted() {
			/* eslint-disable no-console */
			firebase.auth().onAuthStateChanged((user) => {
				this.video.userId = user.uid;
			});
		},
	};
</script>
<style scoped>
	.center-ra {
		max-width: 600px;
		margin-right: auto;
		margin-left: auto;
		text-align: center;
	}
</style>
