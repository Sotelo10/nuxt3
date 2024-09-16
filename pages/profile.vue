<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const errorMessage = ref('');
const router = useRouter();

const { $auth } = useNuxtApp();

async function fetchUserProfile() {
  try {
    user.value = await $auth.getProfile();
  } catch (error) {
    errorMessage.value = 'Error fetching profile. Please log in again.';
    $auth.logout();
    router.push('/login');
  }
}

onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-6">Profile</h1>
      <div v-if="user">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
       
      </div>
      <div v-if="errorMessage" class="text-red-500 mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>


