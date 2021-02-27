<template>
	<ion-label stacked>Add video from Device</ion-label>

	<ion-input
		type="file"
		@change="previewVideo"
		accept="video/*"
		ref="inputForFile"
	></ion-input>

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
				this.$refs.inputForFile.value = null;
				this.videoData = null;
			},
		},
	};
</script>
<style scoped>
	#video-frame {
		width: 100%;
		height: 300px;
	}
</style>
