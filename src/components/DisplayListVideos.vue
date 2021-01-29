<template>
  <section class="display">
    <iframe id="video-frame" :src="selectedItem.link" frameborder="0"></iframe>
    <div id="video-info">
      <h3 id="video-title">{{ selectedItem.title }}</h3>
      <p id="video-topic">{{ selectedItem.topic }}</p>
      <p id="video-timestamp">{{ selectedItem.createdAt }}</p>
    </div>
  </section>
  <hr />
  <ul class="videosList">
    <li
      v-for="item in itemsArray"
      :key="item"
      :id="JSON.stringify(item)"
      class="listItem"
      @click.capture="selectVideo"
    >
      <span
        class="list-title"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.title }}</span
      >
      <span
        class="list-topic"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.topic }}</span
      >
      <span
        class="list-timestamp"
        :class="JSON.stringify(item)"
        @click.capture="selectVideo"
        >{{ item.createdAt.toDate().toDateString() }}</span
      >
    </li>
  </ul>
</template>

<script>
import db from "../db.js";
import firebase from "firebase";

export default {
  data() {
    return {
      selectedItem: {},
      itemsArray: [],
    };
  },
  methods: {
    setDisplayVideo(video) {
      this.selectedItem = {
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
      const video = JSON.parse(e.target.id);
      this.setDisplayVideo(video);
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("videos")
        .where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          this.itemsArray.push(...items);
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
  padding: 0px;
}

.listItem {
  display: block;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  outline: solid 0.1px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
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
</style>
