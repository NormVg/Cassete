<script setup>
import DefWall from "@/assets/wall2.gif";


const wallpaper = ref( DefWall)


const fetchWallpaper = async () => {
  try {

    const {data:src} = await useFetch("/api/box/getWallpaper")
    if(src.value === false){
      wallpaper.value = DefWall
    }else{
      wallpaper.value = src.value
    }


  } catch (error) {
    wallpaper.value = DefWall
  }
}

onMounted(async () => {
fetchWallpaper()
}

)
</script>

<template>
  <div id="wall-box" :style="`background-image: url(${wallpaper});`" >
    <!-- <img :src="DefWall" alt=""> -->


  </div>
</template>

<style scoped>

#wall-box{
  height: 220px;
  width: calc(100% - 80px);
  /* background-color:rgb(72, 55, 25) ; */
  margin-left:70px ;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;

  /* background-image: url(wallpaper); */
  background-position: 50% 20%;
  background-repeat: no-repeat;
  background-size: cover
;
}



</style>
