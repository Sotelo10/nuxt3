<template>
    <div class="container mx-auto p-6">
      <Navbar />
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-6">Products</h1>
        <div v-if="isAuthenticated" class="mb-4">
          <p class="text-lg font-bold">Welcome, {{ username }}!</p>
         
        </div>
        <div v-else class="mb-4">
          <p class="text-lg font-bold">Please log in to access more features.</p>
          <router-link
            to="/login"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </router-link>
        </div>
        <div v-if="data" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in data" :key="product.id" class="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
            <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover rounded-t-lg mb-4"/>
            <div class="product-info">
              <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
              <p class="text-gray-700 mb-2">{{ product.description }}</p>
              <p class="text-lg font-bold"><strong>Price:</strong> ${{ product.price }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">Loading...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from '#app';
  import { repository } from '~/utils/repository'; 
  
  const router = useRouter();
  const { $api } = useNuxtApp();
  const productRepo = repository($api);
  
  const isAuthenticated = ref(false);
  const username = ref('');
  const { data, error } = await useAsyncData('products', () => productRepo.getProducts());
  
  onMounted(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
     
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      username.value = decodedToken.email; 
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
  });
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
    username.value = '';
    router.push('/login');
  };
  
  
  if (error.value) {
    console.error('Failed to fetch products:', error.value);
  }
  </script>
  
