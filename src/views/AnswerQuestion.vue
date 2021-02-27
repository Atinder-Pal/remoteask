<template>
	<ion-page>
		<ion-header :translucent="true">
			<NavBar v-bind:upload="upload" />
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-card class="center-ra">
				<login-prompt />
				<ion-card-header>
					<h1>Answer a Question</h1>
					<p>Question: {{ video.title }}</p>
					<p>Topic: {{ video.topic }}</p>
				</ion-card-header>
				<ion-card-content>
					<video-record
						@videoRecorded="videoRecorded"
						ref="videoRecordComponent"
					>
					</video-record>
					<p>or</p>
					<import-video
						@videoImported="previewVideo"
						ref="videoImportComponent"
					>
					</import-video>
					<div v-if="showProgress">
						Progress: {{ uploadValue.toFixed() + '%' + ' ' }}
						<progress
							id="progress"
							:value="uploadValue"
							max="100"
							color="primary"
						></progress>
					</div>

					<div v-if="recordedBlob != null">
						<ion-button
							expand="block"
							type="submit"
							class="margin-ra"
							@click="onUpload"
						>
							Upload
						</ion-button>
					</div>
				</ion-card-content>
			</ion-card>
			<video-uploaded-modal v-if="uploaded" @close="newVideo">
			</video-uploaded-modal>
		</ion-content>
	</ion-page>
</template>

<script>
	import firebase from 'firebase';
	import db from '@/db.js';
	import { IonContent, IonHeader, IonPage } from '@ionic/vue';
	import { defineComponent } from 'vue';
	import NavBar from '../components/NavBar';
	import 'video.js/dist/video-js.css';
	import 'videojs-record/dist/css/videojs.record.css';
	import 'webrtc-adapter';
	import VideoUploadedModal from '../components/VideoUploadedModal.vue';
	import VideoRecord from '../components/VideoRecord.vue';
	import ImportVideo from '../components/ImportVideo.vue';
	import LoginPrompt from '../components/LoginPrompt.vue';

	export default defineComponent({
		name: 'AskQuestion',
		components: {
			IonContent,
			IonHeader,
			IonPage,
			NavBar,
			VideoUploadedModal,
			VideoRecord,
			ImportVideo,
			LoginPrompt,
		},
		data() {
			return {
				upload: true,
				id: this.$route.params.id,
				video: {
					url: null,
					title: null,
					topic: null,
				},
				errorOnUploading: {
					errorOnStorage: null,
					errorOnFirestore: null,
				},
				docId: null,
				deviceReady: false,
				showProgress: false,
				uploaded: false,
				blobURL: null,
				recordedBlob: null,
				uploadValue: 0,
			};
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

				db.collection('videos')
					.doc(this.docId)
					.update({
						link: this.video.url,
						createdAt: serverTimestamp(),
					})
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
			},
			onUpload() {
				this.showProgress = true;
				this.video.url = null;

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
			async createNewVideoDoc(data) {
				const { serverTimestamp } = firebase.firestore.FieldValue;
				const videoInfo = {
					title: data.title,
					link: null,
					topic: data.topic,
					userId: data.userId,
					createdAt: serverTimestamp(),
				};
				await db
					.collection('videos')
					.add(videoInfo)
					.then((docRef) => {
						this.docId = docRef.id;
						console.log(`This is new document id: ${docRef.id}`);
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
		mounted() {
			console.log(this.id);
			/* eslint-disable no-console */

			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/firebase.User
					let uid = user.uid;
					console.log(uid);
					db.collection('videos')
						.doc(this.id)
						.get()
						.then((snapshot) => {
							console.log(snapshot.data());
							this.video.title = snapshot.data().title;
							this.video.topic = snapshot.data().topic;
							if (snapshot.data().link) {
								this.createNewVideoDoc(snapshot.data());
							} else {
								this.docId = this.id;
							}
						});
				} else {
					// User is signed out
					console.log('User is signed out');
				}
			});
		},
		beforeMount() {
			firebase
				.auth()
				.signInAnonymously()
				.then(() => {
					// Signed in..
					console.log('User signed in anonymously');
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					// ...
					console.log(
						'error while signing in anonymously',
						errorCode,
						errorMessage
					);
				});
		},
	});
</script>
<style scoped>
	.center-ra {
		max-width: 600px;
		margin-right: auto;
		margin-left: auto;
		text-align: center;
	}
</style>
