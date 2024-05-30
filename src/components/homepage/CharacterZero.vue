<template>
  <div>
    <h1 class="font-bold text-amber-400 text-lg mt-7 ml-6">Characters:-</h1>
    <div class="container mx-auto relative">
      <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9664; 
      </button>
      <div ref="scrollContainer" class="flex overflow-x-auto space-x-4 p-4">
        <router-link
          v-for="character in characters"
          :key="character.id"
          class="flex flex-col items-center cursor-pointer"
          :to="{ name: 'CharacterDetail', params: { id: character.id } }"
        >
          <img
            :src="character.image"
            alt=""
            srcset=""
            class="ml-28 rounded-full w-32"
            :class="{ 'h-auto': true, 'w-48': character.width === 48 }"
          />
          <h1>{{ character.id }}:</h1>
          <p>{{ character.name }}</p>
        </router-link>
      </div>
      <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9654; 
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

    const { result} = useQuery(CHARACTERS_QUERY, null, { 
  fetchPolicy: "network-only", 
})
    const characters = ref([])
    const scrollContainer = ref(null)

    watch(result, (newResult) => {
      if (newResult && newResult.characters) {
        characters.value = newResult.characters.results
      }
    });

    const scrollLeft = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: -300,
          behavior: 'smooth',
        })
      }
    }

    const scrollRight = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: 300,
          behavior: 'smooth',
        })
      }
    }
</script>

<style scoped>
.container {
  position: relative;
}

.flex::-webkit-scrollbar {
  display: none; 
}

button {
  z-index: 10;
}

button:hover {
  background-color: #555;
}
</style>
