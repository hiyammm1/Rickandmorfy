<template>
  <div>
    <h1 class="font-bold  text-amber-400 text-lg mt-7 ml-6 ">DEtails:</h1> 
   </div>
  <div class="relative ml-16 mt-1">
    <nav class="flex  mt-7">
      <ul class="flex space-x-4">
        <li class="relative group">
          <button @click="toggleDropdown(1)" class="text-black border shadow-lg border-amber-200 px-8 py-2">Description</button>
          <div v-if="dropdownOpen === 1" class=" relative grid grid-cols-1 sm:grid-cols-2 left-1/2 transform -translate-x-1/2 gap-6 mt-4 ml-20">
            
        <p class=" ">
          Rick and Morty" is a TV show that follows the adventures of an eccentric and alcoholic scientist, Rick Sanchez, and his good-hearted but easily influenced grandson, Morty Smith. Together, they embark on wild interdimensional escapades, encountering bizarre creatures, exploring strange worlds, and facing off against powerful adversaries. The show blends humor, satire, and philosophical themes, offering a unique mix of comedy and thought-provoking storytelling. With its irreverent wit, meta-humor, and clever pop culture references, "Rick and Morty" has garnered a dedicated fanbase and critical acclaim for its inventive storytelling and boundary-pushing humor.
        </p>
  
          </div>
        </li>
        <li class="relative group">
          <button @click="toggleDropdown(2)" class="text-black border shadow-lg border-amber-200 px-8 py-2">Genre</button>
          <div v-if="dropdownOpen === 2" class="relative left-1/2 transform -translate-x-1/2 mt-5 bg-white p-4 shadow-lg">
            <div class="flex flex-col items-center space-y-4">
              <p class="mt-2 text-center"> fiction</p>
                <p class="mt-2 text-center"> science </p>
                <p class="mt-2 text-center">animated</p>
                <p class="mt-2 text-center"> sitcom</p>
              </div>
          </div>
        </li>
        <li class="relative group">
          <button @click="toggleDropdown(3)" class="text-black  border shadow-lg border-amber-200 px-8 py-2">Creators</button>
          <div v-if="dropdownOpen === 3" class="relative  left-1/2 transform -translate-x-1/2 mt-5 p-4 shadow-lg">
            <p class="">Justin Roiland</p> and
            <p class=""> Dan Harmon</p>
          </div>
        </li>
        <li class="relative group">
          <button @click="toggleDropdown(4)" class="text-black  border shadow-lg border-amber-200 px-8 py-2">Stars</button>
          <div v-if="dropdownOpen === 4" class="relative  left-1/2 transform -translate-x-1/2 mt-5 p-4 shadow-lg">
            <p class="">  Justin Roiland</p>
            <p class="">   Chris Parnell</p>
            <p class=""> Sarah Chalke</p>
             <p class="">  Spencer Grammer</p>
             <p class="">  Kari Wahlgren</p>

          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: null,
    };
  },
  methods: {
    toggleDropdown(menu) {
      this.dropdownOpen = this.dropdownOpen === menu ? null : menu;
    },
  },
};
</script>

<style scoped>

</style>
