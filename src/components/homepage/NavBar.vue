<template>
  <div class="carousel-container">
    <div class="fixed-buttons">
      <ul class="btne flex justify-end gap-5 text-sm pr-5 pt-5 items-center">
        <li>
          <a
            href="#"
            @click.prevent="$emit('scrollTo', 'mainbody')"
            class="bg-amber-200 px-8 py-2 text-gray-700 rounded-md"
            >Detail</a
          >
        </li>
        <li>
          <a
            href="#"
            @click.prevent="$emit('scrollTo', 'episode')"
            class="bg-amber-200 px-8 py-2 text-gray-700 rounded-md"
            >Episodes</a
          >
        </li>
        <li>
          <a
            href="#"
            @click.prevent="$emit('scrollTo', 'character')"
            class="bg-amber-200 px-8 py-2 text-gray-700 rounded-md"
            >Characters</a
          >
        </li>
        <li>
          <a
            href="#"
            @click.prevent="$emit('scrollTo', 'location')"
            class="bg-amber-200 px-8 py-2 text-gray-700 rounded-md"
            >Locations</a
          >
        </li>
      </ul>
    </div>
    <div class="carousel">
      <h1 class="afru text-8xl">Rick AND Morty</h1>
      <img
        src="https://kayakudos.com/wp-content/uploads/2020/07/5-Stars-rating-400px-4-2-300x70.jpg"
        alt=""
        class="afrah h-10 w-18"
      />
      <p class="rate">9.1/10</p>
      <div></div>
      <CarouselSlider />
    </div>
  </div>
</template>

<script setup>
import CarouselSlider from './carouselSlider.vue'
</script>

<style scoped>
.carousel-container {
  max-width: 100%;
  padding: 0;
  background-image: url('https://wallpapercave.com/wp/wp2065387.png');
  background-size: cover;
  background-position: center;
}

.fixed-buttons {
  position: fixed;
  top: 5%;
  right: 0;
  z-index: 50;
  background-color: white; /* Ensure background color is set */
  padding: 10px; /* Adjust padding as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better visibility */
}

.carousel {
  position: relative;
  width: 100%;
}

.rate {
  cursor: pointer;
  position: absolute;
  top: 61%;
  margin-left: 45%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  z-index: 100;
}
.afrah {
  cursor: pointer;
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  margin-left: 30%;
}
.afru {
  cursor: pointer;
  position: absolute;
  margin-left: 10%;
  top: 40%;
  transform: translateY(-50%);
  color: rgb(251 191 36);
}

.btne {
  cursor: pointer;
  position: absolute;
  top: 5%;
  right: 0;
  transform: translateY(-50%);
  color: white;
  border: none;
  padding: 10px;
  z-index: 100;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}
</style>
