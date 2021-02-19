<template>
	<ion-page>
		<ion-header :translucent="true">
			<NavBar v-bind:upload="upload" />
		</ion-header>

		<ion-content :fullscreen="true">
			<div id="container">
				<h1>Ask a Question</h1>
				<form-for-video-info
					@formSubmitted="shareQuestion"
					submitButton="Share Question"
				>
				</form-for-video-info>
				<link-share-modal v-if="modal" :link="shareLink" @close="modal=false">
				</link-share-modal>
				<!-- <div v-if="modal" id="modal">
					<textarea
						name="copyContent"
						id="copyContent"
						cols="30"
						rows="10"
						:value="shareLink"
					></textarea>
					<button @click="copyLink">Copy</button>
				</div> -->
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
	import firebase from 'firebase';
	import db from '@/db.js';
	import { IonContent, IonHeader, IonPage } from '@ionic/vue';
	import { defineComponent } from 'vue';
	import NavBar from '../components/NavBar';
	import FormForVideoInfo from '../components/FormForVideoInfo';
	import LinkShareModal from '../components/LinkShareModal';

	export default defineComponent({
		name: 'AskQuestion',
		components: {
			IonContent,
			IonHeader,
			IonPage,
			NavBar,
			FormForVideoInfo,
			LinkShareModal
		},
		data() {
			return {
				upload: true,
				userId: null,
				docId: null,
				modal: false,
				shareLink: '',
			};
		},
		methods: {
			async shareQuestion(formData) {
				await this.saveToFirestore(formData);
				if (navigator.share) {
					navigator
						.share({
							title: 'WebShare API Demo',
							url: this.shareLink,
						})
						.then(() => {
							console.log('Thanks for sharing!');
						})
						.catch(console.error);
				} else {
					// fallback
					console.log('WEB share API not supported!');
					this.modal = true;
					console.log("modal: "+ this.modal)
				}
			},
			copyLink() {
				document.querySelector('#copyContent').select();
				document.execCommand('copy');
			},
			saveToFirestore(formData) {
				const { serverTimestamp } = firebase.firestore.FieldValue;
				const videoInfo = {
					title: formData.title,
					link: null,
					topic: formData.topic,
					userId: this.userId,
					createdAt: serverTimestamp(),
				};
				db.collection('videos')
					.add(videoInfo)
					.then((docRef) => {
						this.docId = docRef.id;
						console.log(`This is document id: ${docRef.id}`);
						console.log(this.docId);
						this.shareLink = `http://localhost:8100/answerquestion/${this.docId}`;
					})
					.catch((error) => {
						console.log(error);
					});
			},
			webShare() {
				this.shareLink = `http://localhost:8100/answerquestion/${this.docId}`;
				if (navigator.share) {
					navigator
						.share({
							title: 'WebShare API Demo',
							url: this.shareLink,
						})
						.then(() => {
							console.log('Thanks for sharing!');
						})
						.catch(console.error);
				} else {
					// fallback
					console.log('WEB share API not supported!');
					this.modal = !this.modal;
				}
			},
		},
		mounted() {
			/* eslint-disable no-console */
			firebase.auth().onAuthStateChanged((user) => {
				this.userId = user.uid;
				console.log(`This is user's id : ${user.uid}`);
			});
		},
		beforeUnmount() {
			if (this.modal) {
				this.modal = !this.modal;
			}
		},
	});
</script>

<style scoped></style>
