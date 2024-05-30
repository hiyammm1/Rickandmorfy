<template>
  <div class="p-6 rounded-lg">
    <h1 class="font-bold text-amber-400 text-lg mb-6">Locations:</h1>
    <div class="container mx-auto relative">
      <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9664; <!-- Left arrow -->
      </button>
      <div class="flex overflow-x-auto" ref="scrollContainer">
        <div 
          v-for="location in locations" 
          :key="location.id" 
          @click="navigateToLocation(location.id)"
          class="bg-gray-900 p-14 w-48 h-56 rounded-3xl shadow mr-4"
        >
          <h2 class="text-amber-200 text-lg font-bold mb-2">{{ location.id }}</h2>
          <p class="text-white">{{ location.name }}</p>
        </div>
      </div>
      <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9654; <!-- Right arrow -->
      </button>
    </div>
  </div>
</template>

<script setup> 
import { ref, watch } from "vue"; 
import gql from "graphql-tag"; 
import { useQuery } from "@vue/apollo-composable"; 
import { useRouter } from "vue-router"; 

const LOCATIONS_QUERY = gql` 
  query Locations { 
    locations { 
      results { 
        id 
        name 
      } 
    } 
  } 
`; 

const { result } = useQuery(LOCATIONS_QUERY, null, { 
  fetchPolicy: "network-only", 
}); 

const locations = ref([]); 
const router = useRouter(); 
let scrollContainer;

watch(result, (newResult) => { 
  if (newResult && newResult.locations) { 
    locations.value = newResult.locations.results; 
  } 
}); 

const navigateToLocation = (locationId) => { 
  router.push({ 
    name: "LocationDetail", 
    params: { id: locationId }, 
  }); 
};

const scrollLeft = () => {
  if (scrollContainer) {
    scrollContainer.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }
};

const scrollRight = () => {
  if (scrollContainer) {
    scrollContainer.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }
};

</script> 

<style scoped>
.flex::-webkit-scrollbar {
  display: none; /* Hide the scrollbar */
}

button {
  z-index: 10;
}

button:hover {
  background-color: #555;
}
</style>
