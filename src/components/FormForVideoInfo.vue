<template>
	<form @submit.prevent="formSubmitted">
		<ion-list>
			<ion-item>
				<ion-label class="label-class" stacked>Video Title</ion-label>
				<ion-input
					type="text"
					id="title"
					name="title"
					autocomplete="off"
					v-model="video.title"
					required
				></ion-input>
			</ion-item>

			<ion-item>
				<ion-label class="label-class" stacked>Video Topic</ion-label>
				<ion-input
					type="text"
					id="topic"
					name="topic"
					autocomplete="off"
					v-model="video.topic"
					required
				></ion-input>
			</ion-item>
		</ion-list>

		<ion-button expand="block" type="submit" class="margin-ra">
			{{ submitButton }}</ion-button
		>
	</form>
</template>

<script>
	import { IonList, IonItem, IonButton, IonInput, IonLabel } from '@ionic/vue';
	export default {
		data() {
			return {
				video: {
					title: '',
					topic: '',
				},
			};
		},
		props: ['submitButton'],
		components: {
			IonList,
			IonItem,
			IonButton,
			IonInput,
			IonLabel,
		},
		methods: {
			formSubmitted() {
				this.$emit('formSubmitted', this.video);
			},
			clearInputFields() {
				this.video.title = null
				this.video.topic = null
				console.log("clearInputFields was called")
			}
		},
	};
</script>
