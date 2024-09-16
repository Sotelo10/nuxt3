<template>
    <div class="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Registro de Usuario</h1>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            id="username"
            type="text"
            placeholder="Username"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from '#app';
  
  const router = useRouter();
  const email = ref('');
  const username = ref('');
  const password = ref('');
  
  const registerUser = async () => {
    try {
      const config = useRuntimeConfig();
      const response = await useFetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result); // Maneja la respuesta del backend
  
      if (response.status === 200) {
        // Redirige al usuario a la página de inicio
        router.push('/');
      } else {
        // Maneja errores, como mostrar un mensaje de error
        console.error('Registration failed:', result.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  </script>
  