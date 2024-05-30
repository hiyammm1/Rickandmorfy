<script setup>
import { ref } from "vue";
import CharacterZero from '../components/homepage/CharacterZero.vue';
import EpisodeZero from '../components/homepage/EpisodeZero.vue';
import FotterZEro from '../components/homepage/FotterZEro.vue';
import LocationZero from '../components/homepage/LocationZero.vue';
import MainBody from '../components/homepage/MainBody.vue';
import NavBar from '../components/homepage/NavBar.vue';



const mainbody = ref(null);
const episode = ref(null);
const character = ref(null);
const location = ref(null);

const scrollToComponent = (component) => {
   if (component === "mainbody" && mainbody.value) {
    mainbody.value.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (component === "episode" && episode.value) {
    episode.value.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (component === "character" && character.value) {
    character.value.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (component === "location" && location.value) {
    location.value.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div class="bg-white min-h-screen">
    <NavBar  @scrollTo="scrollToComponent" />
    <div>
      <div ref="mainbody">
        <MainBody/>
      </div>
      <div ref="episode">
        <EpisodeZero />
      </div>
      <div ref="character">
        <CharacterZero />
      </div>
      <div ref="location">
        <LocationZero class="mb-24"/>
      </div>
    </div>
  </div>

  <FotterZEro/>

</template>

<style scoped></style>
