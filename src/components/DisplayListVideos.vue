<template>
  <section class="display" v-if="selectedItem.id">
    <iframe
      v-if="selectedItem.link"
      id="video-frame"
      :src="selectedItem.link"
      frameborder="0"
    ></iframe>
    <div v-if="!selectedItem.link">
      <h3>This question does not have an answer yet</h3>
    </div>

    <ion-card id="video-info">
      <h3 id="video-title">{{ selectedItem.title }}</h3>
      <p id="video-topic">{{ selectedItem.topic }}</p>
      <p id="video-timestamp">{{ selectedItem.createdAt }}</p>
    
    <ion-button @click="openModal">Share</ion-button>
    <div v-if="modal" id="modal">
      <textarea
        name="copyContent"
        id="copyContent"
        cols="55"
        rows="4"
        :value="shareLink"
      ></textarea>
      <ion-button @click="copyLink">Copy</ion-button>
    </div>
    </ion-card>
  </section>
  <div v-else>
    <h3>You have no videos yet!</h3>
    <router-link to="/upload">
      <button>Create a Video</button>
    </router-link>
  </div>
  <hr />
  <!-- <ul class="videosList">
    <li
      v-for="item in itemsArray"
      :key="item"
      :data-item="JSON.stringify(item)"
      class="listItem"
      @click.capture="selectVideo"
    >
      <span
        class="list-title"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.title }}</span
      >
      <span
        class="list-topic"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.topic }}</span
      >
      <span
        class="list-timestamp"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.createdAt.toDate().toDateString() }}</span
      >
    </li>
  </ul> -->


    <div class="videosList">
    <ion-card
      v-for="item in itemsArray"
      :key="item"
      :data-item="JSON.stringify(item)"
      class="listItem"
      @click.capture="selectVideo"
    >
      <span
        class="list-title"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.title }}</span
      >
      <span
        class="list-topic"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.topic }}</span
      >
      <span
        class="list-timestamp"
        :data-item="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.createdAt.toDate().toDateString() }}</span
      >
    </ion-card>
  </div>

  
</template>

<script>
import db from "../db.js";
import firebase from "firebase";

export default {
  data() {
    return {
      selectedItem: {},
      itemsArray: [],
      modal: false,
      shareLink: "",
      videosExist: false,
      qWithoutA: false,
    };
  },
  methods: {
    setDisplayVideo(video) {
      if (!video.link) {
        this.qWithoutA = false;
        console.log("doesn't exist");
      }
      this.selectedItem = {
        id: video.id,
        link: video.link,
        title: video.title,
        topic: video.topic,
        createdAt: video.createdAt,
      };

      let timestamp = this.selectedItem.createdAt; // firebase data
      let myDate = new Date(timestamp.seconds * 1000); // date object
      this.selectedItem.createdAt = myDate.toDateString();
    },
    selectVideo(e) {
      const video = JSON.parse(e.target.getAttribute("data-item"));
      this.setDisplayVideo(video);
      this.modal = false;
    },
    openModal() {
      this.modal = !this.modal;
      this.shareLink = `${window.location.protocol}//${window.location.host}/video/${this.selectedItem.id}`;
    },
    copyLink() {
      document.querySelector("#copyContent").select();
      document.execCommand("copy");
    },
  },
  beforeMount() {
    console.log(`${window.location.protocol}//${window.location.host}`);
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("videos")
        .where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            link: doc.data().link,
            title: doc.data().title,
            topic: doc.data().topic,
            createdAt: doc.data().createdAt,
          }));
          if (items && items[0].link) {
            this.videosExist = false;
          }
          this.itemsArray = items;
          this.setDisplayVideo(items[0]);
        });
    });
  },
};
</script>
<style scoped="">
#video-frame {
  width: 100%;
  height: 200px;
}

#video-info {
  padding: 15px;
}

#video-title {
  text-transform: capitalize;
  margin: 0px;
}

#video-topic {
  margin-bottom: 0px;
}

#video-timestamp {
  margin: 0px;
  font-size: 13px;
  opacity: 0.5;
}

.videosList {
  padding: 10px;
  
}

.listItem {
  display: block;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  outline: solid 2.1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.1);
}

.list-title {
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  width: max-content;
  margin-bottom: 2px;
}
.list-topic {
  width: max-content;
  font-size: 14px;
  font-weight: 300;
}
.list-timestamp {
  width: max-content;
  font-size: 11px;
  opacity: 0.5;
}

@media screen and (min-width: 500px) {
  #video-frame {
    height: 300px;
  }
}


ion-card{
  color:#474547;
  text-transform: capitalize; 
}
</style>
