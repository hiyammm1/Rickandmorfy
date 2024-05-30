<template> 
  <div class="p-6 bg-gray-50 rounded-lg "> 
    <h1 class="text-2xl text-center font-bold text-amber-500 mb-6">Episode Details</h1> 
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div> 
    <div v-if="error" class="text-lg text-red-600">Error: {{ error.message }}</div> 
    <div v-if="episode"> 
      <h2 class="text-xl font-semibold text-amber-400">{{ episode.name }}</h2> 
      <p class="text-gray-600">Air Date: {{ episode.air_date }}</p> 
      <p class="text-gray-600">Episode: {{ episode.episode }}</p> 
      <p class="text-gray-600">Created: {{ episode.created }}</p> 
      <h3 class="text-lg font-semibold text-amber-400 mt-4">Characters:</h3> 
      <div class="relative overflow-hidden">
        <div class="flex" ref="charactersContainer">
          <div 
            v-for="character in episode.characters" 
            :key="character.id" 
            class="bg-gray-800 border border-gray-200 rounded-lg p-4 shadow-sm flex-none w-72 mr-4">
            <img :src="character.image" alt="" class="w-32 h-32 rounded-full mx-auto mb-2" /> 
            <div class="text-center"> 
              <p class="text-lg font-semibold text-amber-200">{{ character.name }}</p> 
              <p class="text-gray-600">Status: {{ character.status }}</p> 
              <p class="text-gray-600">Species: {{ character.species }}</p> 
              <p class="text-gray-600">Gender: {{ character.gender }}</p> 
            </div> 
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
import { ref, watch } from "vue"; 
import gql from "graphql-tag"; 
import { useQuery } from "@vue/apollo-composable"; 
import { useRoute } from "vue-router"; 
 
const EPISODE_QUERY = gql` 
  query Episode($id: ID!) { 
    episode(id: $id) { 
      name 
      air_date 
      episode 
      created 
      characters { 
        id 
        name 
        status 
        species
        gender 
        image 
      } 
    } 
  } 
`; 
 
export default { 
  setup() { 
    const route = useRoute(); 
    const episodeId = ref(route.params.id); // Use ref to make it reactive 
    const { result, loading, error } = useQuery( 
      EPISODE_QUERY, 
      { id: episodeId.value }, // Use .value to access the reactive variable 
      { fetchPolicy: "network-only" } // Fetch policy set to "network-only" 
    ); 
    const episode = ref(null); 
 
    // Watch for changes in the route parameters 
    watch( 
      () => route.params.id, 
      (newId) => { 
        episodeId.value = newId; // Update the episodeId when the route parameter changes 
      } 
    ); 
 
    watch(result, (newResult) => { 
      if (newResult) { 
        episode.value = newResult.episode; 
      } 
    }); 
 
    // Function to scroll characters
    const scroll = direction => {
      const container = this.$refs.charactersContainer
      container.scrollLeft += container.offsetWidth * direction
    }

    return { 
      episode, 
      loading, 
      error,
      scroll
    }; 
  }, 
}; 
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
