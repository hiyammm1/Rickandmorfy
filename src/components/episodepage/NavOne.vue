<script setup></script>
<template>
  <div class="fixed-buttons">
   <router-link :to="{ path: '/', hash: '#episode' }" class="bg-amber-200 px-8 py-2 text-gray-700 rounded-md">home</router-link>
   
  </div>
  </template>
<style>
.fixed-buttons {
  position: fixed;
  top: 5%;
  right: 0;
  z-index: 50;
  padding: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}
</style>