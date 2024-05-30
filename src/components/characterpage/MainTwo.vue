<template>
  <div class="p-6 bg-gray-50 rounded-lg ">
    <h1 class="text-2xl font-bold text-center text-amber-500 mb-6">Character Details</h1>
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div>
    <div v-if="error" class="text-lg text-red-600">Error: {{ error.message }}</div>
    <div v-if="character">
      <h2 class="text-xl font-semibold text-amber-400">{{ character.name }}</h2>
      <p class="text-gray-600">Species: {{ character.species }}</p>
      <p class="text-gray-600">Gender: {{ character.gender }}</p>
      <p class="text-gray-600">Status: {{ character.status }}</p>
      <p class="text-gray-600">Last known location: {{ character.location.name }}</p>
      <img :src="character.image" alt="" class="w-48 h-48 rounded-full mx-auto mb-10 mt-5" />
      <h3 class="text-lg font-semibold text-amber-400 mb-4">Episodes Participated:</h3>
      <div class="relative overflow-hidden">
        <div class="flex" ref="episodeContainer">
          <div v-for="episode in character.episode" :key="episode.id" class="bg-gray-800 border border-gray-200 rounded-lg p-4 shadow-sm flex-none w-72 mr-4">
            <h4 class="text-lg font-semibold text-amber-200">{{ episode.name }}</h4>
            <p class="text-white">Air Date: {{ episode.air_date }}</p>
            <p class="text-white">Episode: {{ episode.episode }}</p>
            <p class="text-white">Created: {{ episode.created }}</p>
          </div>
        </div>
        <!-- Arrow buttons -->
        <button
          class="absolute top-0 bottom-0 left-0 bg-gray-200 px-2 py-4 focus:outline-none"
          style="transform: translate(-100%, 50%);"
          @click="scroll(-1)"
        >
          &lt;
        </button>
        <button
          class="absolute top-0 bottom-0 right-0 bg-gray-200 px-2 py-4 focus:outline-none"
          style="transform: translate(100%, 50%);"
          @click="scroll(1)"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

const CHARACTER_DETAIL_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      species
      gender
      status
      image
      episode {
        id
        name
        air_date
        episode
        created
      }
      location {
        name
      }
    }
  }
`

export default {
  setup() {
    const route = useRoute()
    const { result, loading, error } = useQuery(CHARACTER_DETAIL_QUERY, {
      id: route.params.id
    })
    const character = ref(null)

    // Watch for changes in the result
    watchEffect(() => {
      if (result.value) {
        character.value = result.value.character
      }
    })

    // Function to scroll episodes
    const scroll = direction => {
      const container = this.$refs.episodeContainer
      container.scrollLeft += container.offsetWidth * direction
    }

    return {
      character,
      loading,
      error,
      scroll
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

/* Hide horizontal scrollbar */
.flex {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.flex::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
