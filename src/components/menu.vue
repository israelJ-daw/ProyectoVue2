<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand d-none" to="/"></router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-4">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/playlists">Playlists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Buscador</router-link>
          </li>
        </ul>

        <!-- Sección de usuario -->
        <div class="user-section">
          <template v-if="user">
            <img :src="user.avatar" alt="Avatar" class="user-avatar">
            <span class="user-name">{{ user.name }}</span>
            <button @click="logout" class="btn btn-danger btn-sm">Logout</button>
          </template>
          <template v-else>
            <button @click="login" class="btn btn-primary btn-sm">Iniciar sesión</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// **Simulación de usuario logueado (esto podría venir de Vuex, Pinia o Firebase)**
const user = ref(null);

// **Simulación de login/logout con localStorage**
const login = () => {
  user.value = {
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/40"
  };
  localStorage.setItem("user", JSON.stringify(user.value));
};

const logout = () => {
  console.log("Cerrando sesión...")
  user.value = null
  localStorage.removeItem("user");
};

// **Cargar usuario desde localStorage al iniciar**
onMounted(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-name {
  font-weight: bold;
  color: black; 
}

button {
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
