<template>
	<ion-tabs>
		<!-- Tab bar -->
		<ion-tab-bar>
			<ion-tab-button>
				<router-link to="/upload">
					<ion-icon :icon="add" size="large"></ion-icon>
					UPLOAD
				</router-link>
			</ion-tab-button>

			<ion-tab-button>
				<router-link to="/askquestion">
					<ion-icon :icon="chatbubble" size="large"></ion-icon>
					ASK
				</router-link>
			</ion-tab-button>

			<ion-tab-button>
				<router-link to="/listVideos">
					<ion-icon :icon="list" size="large"></ion-icon>
					MY VIDEOS
				</router-link>
			</ion-tab-button>

			<ion-tab-button @click="logOut()">
				<ion-icon :icon="exit" size="large"></ion-icon>
				LOG OUT
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script>
	import { defineComponent } from 'vue';
	import firebase from 'firebase/app';

	import { chatbubble, add, list, exit } from 'ionicons/icons';

	export default defineComponent({
		name: 'NavBar',
		props: ['togglelogin', 'signup', 'upload'],
		components: {},

		methods: {
			logOut() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						firebase.auth().onAuthStateChanged(() => {
							this.$router.replace('login');
						});
					});
			},
		},

		setup() {
			return {
				chatbubble,
				add,
				list,
				exit,
			};
		},
	});
</script>

<style scoped>
	a {
		display: block;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		width: 100%;
	}
</style>
