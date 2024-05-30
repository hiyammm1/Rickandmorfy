<template>
  <div>
    <h1 class="font-bold text-amber-400 text-lg mt-7 mb-7 ml-6">Episodes:</h1>
    <div class="container mx-auto relative">
      <button @click="scrollLeft" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9664; 
      </button>
      <div ref="scrollContainer" class="flex overflow-x-auto scroll-smooth">
        <router-link
          v-for="episode in episodes"
          :key="episode.id"
          class="text-amber-200 p-4 w-48 h-56 rounded-3xl shadow-3xl mr-4 border flex-shrink-0 bg-gray-800"
          :to="{ name: 'EpisodeDetail', params: { id: episode.id } }"
        >
          <h2 class="text-lg font-bold mb-2">{{ episode.episode }}</h2>
          <p class="text-white" style="word-break: break-all; white-space: normal;">{{ episode.name }}</p>
          <div class="flex space-x-2 mt-4">
            <img
              v-for="(character, index) in episode.characters.slice(0, 3)"
              :key="index"
              :src="character.image"
              class="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </router-link>
      </div>
      <button @click="scrollRight" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow z-10">
        &#9654; 
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const EPISODES_QUERY = gql`
  query Episodes($page: Int) {
    episodes(page: $page) {
      info {
        next
      }
      results {
        id
        episode
        name
        characters {
          id
          image
        }
      }
    }
  }
`;

export default {
  setup() {
    const { result, loading, error, refetch } = useQuery(EPISODES_QUERY, { page: 1 }, { fetchPolicy: "network-only" });
    const episodes = ref([]);
    const scrollContainer = ref(null);

    watch(result, (newResult) => {
      if (newResult) {
        episodes.value = newResult.episodes.results;
      }
    });

    const fetchAllEpisodes = async () => {
      let nextPage = 1;
      let allEpisodes = [];

      while (nextPage) {
        const { data, error } = await refetch({ page: nextPage });

        if (error) {
          console.error("Error fetching episodes:", error);
          break;
        }

        allEpisodes.push(...data.episodes.results);
        nextPage = data.episodes.info.next;
      }

      episodes.value = allEpisodes;
    };

    const scrollLeft = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: -300,
          behavior: 'smooth',
        });
      }
    };

    const scrollRight = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    };

    fetchAllEpisodes();

    return {
      episodes,
      loading,
      error,
      refetch,
      scrollLeft,
      scrollRight,
      scrollContainer,
    };
  },
};
</script>

<style scoped>
.flex {
  overflow-x: auto;
  white-space: nowrap;
}

.flex > div {
  display: inline-block;
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
