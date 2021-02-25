<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Share this link </ion-title>
			<ion-buttons slot="end">
				<ion-button @click="copyLink">Copy</ion-button>
			</ion-buttons>
			<ion-buttons slot="end">
				<ion-button @click="dismissModal">Close</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		{{ link }}
	</ion-content>
</template>

<script>
	/* eslint-disable */
	import {
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButtons,
		IonButton,
		modalController,
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Modal',
		props: {
			link: { type: String, default: 'Error: Link not available' },
		},
		components: {
			IonContent,
			IonHeader,
			IonTitle,
			IonToolbar,
			IonButtons,
			IonButton,
			modalController,
		},
		methods: {
			dismissModal() {
				modalController.dismiss();
			},
			copy() {
				this.$parent.$emit('copy');
			},
			copyLink() {
				let textField = document.createElement('textarea');
				textField.innerText = this.link;
				document.body.appendChild(textField);
				textField.select();
				textField.focus(); //SET FOCUS on the TEXTFIELD
				document.execCommand('copy');
				textField.remove();
				console.log('should have copied ' + this.link);
			},
		},
	});
</script>
<style scoped>
	.my-custom-class {
		--backdrop-opacity: 0.8 !important;
		--border-color: red;
		--max-width: 60% !important;
		--max-height: 50% !important;
	}
</style>
