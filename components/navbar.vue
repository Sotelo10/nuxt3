<template>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white text-lg font-semibold">
          <router-link to="/" class="hover:text-gray-300">Home</router-link>
        </div>
        <div>
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
          >
            Logout
          </button>
         
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from '#app';
  
  const isAuthenticated = ref(false);
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
    router.push('/login');
  };
  
  onMounted(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      isAuthenticated.value = true;
    }
  });
  </script>
  
