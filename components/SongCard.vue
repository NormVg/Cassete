<script setup>
import DefThumb from "@/assets/def-thumb.png"
import { useActiveAreaStore } from "~/store/ActiveAreaState";
import { useAppBasicStore } from "~/store/AppBasicState";
const prop = defineProps(
  {
    title: {
      type: String,
      default: "Song Title",
    },
    artist: {
      type: String,
      default: "Artist",
    },
    idsong: {
      type: String,
      default: "1802275278415"
    },
    currentTrackList:{
      type:Object,
      default:undefined
    }
  }
);

const AppBasic = useAppBasicStore()
const ActiveArea = useActiveAreaStore()

const handleClick = async () => {

  console.log(prop.currentTrackList)




    var mainList = []

    prop.currentTrackList.forEach(element => {
      if (element.type === 'file'){

      mainList.push({
        name:element.name,
        id:element.id,
        artist:prop.artist
      })
    }
    });


    console.log(mainList)
    AppBasic.SetCurrentTrackList(mainList)





  console.log(prop.idsong)

  const { data: srcURL } = await useFetch("/api/box/songURL?song_id=" + prop.idsong)

  AppBasic.SetcurrentSong({
    name: prop.title,
    artist: prop.artist,
    src: srcURL.value.src,
    songID: prop.idsong
  })

  ActiveArea.setCurrentArea('TRACKLIST')
}




const thumbnail = ref(DefThumb); // Make sure it starts as a reactive variable


const getThumbNail = async () => {



  try {
    // console.log("SONG ID",AppBasic.currentSong.songID)
    const { data: thumb_data } = await useFetch("/api/checkAndGetThumb?username=" + AppBasic.SessionUsername + "&thumbID=" + prop.idsong)

    if (thumb_data.value === false) {
      thumbnail.value = DefThumb

    } else {
      console.log(thumb_data.value)
      thumbnail.value = thumb_data.value

    }


  } catch (error) {
    console.log(error)
    thumbnail.value = DefThumb
  }


}











onMounted(async () => {
  getThumbNail()
})


</script>

<template>
  <div class="song-card" @click="handleClick">

    <div class="song-card-thumb">
      <img :src="thumbnail" alt="">
    </div>

    <div class="song-info">
      <div class="song-card-artist">
        {{ artist }}
      </div>
      <div class="song-card-title">
        {{ title }}
      </div>

    </div>


  </div>
</template>

<style scoped>
.song-card {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  /* padding: 10px; */
  border-radius: 10px;
  background-color: #0A090C;
  color: white;
  transition: all ease-in-out 200ms;

}

.song-card:hover {
  background-color: #17151b;

}
.song-card:active {
  scale: 0.98;

}

.song-card-thumb {
  width: 100px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
}

.song-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.song-card-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #E9DBC7;
}

.song-card-artist {
  font-size: 13px;
  color: #989084;
}

.song-info {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
