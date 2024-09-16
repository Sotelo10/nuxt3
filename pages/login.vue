<template>
  <div class="container mx-auto p-6">
    <div class="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from '#app';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; 
  try {
    const response = await fetch(`${useRuntimeConfig().public.apiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invalid email or password');
    }

    const { token } = await response.json();
    
   
    localStorage.setItem('authToken', token);

    router.push('/');
  } catch (error) {
    console.error('Error during login:', error); 
    errorMessage.value = error.message; 
  }
};
</script>
