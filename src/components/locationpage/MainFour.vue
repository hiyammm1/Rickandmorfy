<template> 
  <div class="p-6 bg-gray-50 rounded-lg shadow-md"> 
    <h1 class="text-2xl font-bold text-center text-amber-500 mb-6">Location Details</h1> 
    <div v-if="loading" class="text-lg text-gray-600">Loading...</div> 
    <div v-if="error" class="text-lg text-red-600">Error: {{ error.message }}</div> 
    <div v-if="location"> 
      <h2 class="text-xl font-semibold text-amber-400">{{ location.name }}</h2> 
      <p class="text-gray-600">Type: {{ location.type }}</p> 
      <p class="text-gray-600">Dimension: {{ location.dimension }}</p> 
      <p class="text-gray-600">Created: {{ location.created }}</p> 
      <h3 class="text-lg font-semibold text-amber-400 mt-4 mb-7">Residents:</h3> 
      <div class="relative overflow-hidden">
        <div class="flex mb-96" ref="residentsContainer">
          <div v-for="resident in location.residents" :key="resident.id" class="bg-gray-800 border border-gray-200 rounded-lg p-4 shadow-sm flex-none w-72 mr-4">
            <img :src="resident.image" alt="" class="w-32 h-32 rounded-full mx-auto mb-2" />
            <div class="text-center">
              <p class="text-lg font-semibold text-amber-200">{{ resident.name }}</p> 
              <p class="text-white">Status: {{ resident.status }}</p> 
              <p class="text-white">Species: {{ resident.species }}</p> 
              <p class="text-white">Gender: {{ resident.gender }}</p> 
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
import { ref, watchEffect } from "vue"; 
import gql from "graphql-tag"; 
import { useQuery } from "@vue/apollo-composable"; 
import { useRoute } from "vue-router"; 
 
const LOCATION_QUERY = gql` 
  query Location($id: ID!) { 
    location(id: $id) { 
      name 
      type 
      dimension 
      created 
      residents { 
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
    const { result, loading, error } = useQuery(LOCATION_QUERY, { 
      id: route.params.id, 
    }); 
    const location = ref(null); 
 
    // Watch for changes in the result 
    watchEffect(() => { 
      if (result.value) { 
        location.value = result.value.location; 
      } 
    }); 
 
    // Function to scroll residents
    const scroll = direction => {
      const container = this.$refs.residentsContainer
      container.scrollLeft += container.offsetWidth * direction
    }
 
    return { 
      location, 
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
