<script>
import {
  VueFlux,
  FluxPreloader,
  FluxControls,
  FluxPagination,
  FluxImage,
  Img,
  Size,
  Wave
} from 'vue-flux'
import { reactive, shallowReactive } from 'vue'

export default {
  components: {
    VueFlux,
    FluxPreloader,
    FluxControls,
    FluxPagination,
    FluxImage
  },
  setup() {
    const options = reactive({
      allowFullscreen: false,
      allowToSkipTransition: true,
      // autohideTime: 1500,
      autoplay: true,
      bindKeys: false,
      delay: 2000,
      enableGestures: false,
      infinite: true,
      lazyLoad: true,
      lazyLoadAfter: 3
    })
    const rscs = shallowReactive([
      new Img('https://wallpapercave.com/wp/wp2065387.png'),
      new Img('https://wallpaperaccess.com/full/831757.png'),
      new Img('https://wallpapercave.com/wp/wp7227833.jpg'),
      new Img(
        'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/10/Dead-Ricks-and-Mortys-floating-through-space-in-Rick-and-Morty.jpg'
      )
    ])

    const rsc = new Img('https://wallpapercave.com/wp/wp2065387.png')
    const a = new Img('https://wallpaperaccess.com/full/831757.png')
    const b = new Img('https://wallpapercave.com/wp/wp7227833.jpg')
    const c = new Img(
      'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/10/Dead-Ricks-and-Mortys-floating-through-space-in-Rick-and-Morty.jpg'
    )

    const size = new Size({
      width: 500,
      height: 200
    })

    const transitions = shallowReactive([Wave])

    return {
      options,
      rscs,
      rsc,
      size,
      transitions,
      a,
      b,
      c
    }
  }
}
</script>

<template>
  <div class="vue-flux-container">
    <!-- <FluxImage :rsc="rsc" :size="size" />
    <FluxImage :rsc="a" :size="size" /> -->
    <!-- <FluxImage :rsc="b" :size="size" />
    <FluxImage :rsc="c" :size="size" />
    <FluxImage :rsc="d" :size="size" /> -->

    <VueFlux :options="options" :rscs="rscs" :transitions="transitions">
      <template #preloader="preloaderProps">
        <FluxPreloader v-bind="preloaderProps" />
      </template>

      <template #controls="controlsProps">
        <FluxControls v-bind="controlsProps" />
      </template>

      <template #pagination="paginationProps">
        <FluxPagination v-bind="paginationProps" />
      </template>
    </VueFlux>
  </div>
</template>

<style scoped>
.vue-flux-container {
  max-width: 600px; /* Ensure the container size matches the image size */
  margin: auto;
  padding-left: 400px;
  padding-top: 200px;
  padding-bottom: 200px;
}

.vue-flux-container img {
  width: 100%;
  height: auto;
}
</style>
