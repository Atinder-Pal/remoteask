<template>
	<ion-label stacked>Add video from Device</ion-label>
	<ion-card>
		<ion-card-content class="input-for-file">
			<ion-input
				type="file"
				@change="previewVideo"
				accept="video/*"
				ref="inputForFile"
				id="input-for-file"
			></ion-input>
		</ion-card-content>
	</ion-card>
	<div v-if="videoData != null">
		<p>Preview Video before uploading:</p>
		<div>
			<iframe
				:src="blobURL"
				id="video-frame"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>
	</div>
</template>
<script>
	import { IonLabel, IonInput } from '@ionic/vue';
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
				this.videoData = event.target.files[0];
				this.blobURL = URL.createObjectURL(this.videoData);
				this.$emit('videoImported', this.videoData);
			},
			resetInput() {
				//this.$refs['inputForFile'].value = '';
				this.videoData = null;
				document.querySelector('#input-for-file').value = null;
			},
		},
	};
</script>
<style scoped>
	#video-frame {
		width: 100%;
		height: 300px;
	}

	.input-for-file {
		margin-left: auto;
		margin-right: auto;
		width: 50%;
	}
</style>
