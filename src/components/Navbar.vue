<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-vibrant">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Deezer Client</router-link>
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
            <router-link class="nav-link" to="/search">Buscar</router-link>
          </li>
        </ul>

        <div class="user-section">
          <template v-if="user">
            <img :src="user.avatar" alt="Avatar" class="user-avatar">
            <span class="user-name">{{ user.name }}</span>
            <button @click="logout" class="btn btn-danger btn-sm">Desconectar</button>
          </template>
          <template v-else>
            <button @click="openLogin" class="btn btn-vibrant btn-sm">Iniciar sesión</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

// Función para abrir el modal de login
const openLogin = () => {
  router.push({ name: 'Login' });
};

// Función para logout
const logout = () => {
  user.value = null;
  localStorage.removeItem("user");  // Borrar los datos del usuario en localStorage
  router.push({ name: 'Home' });  // Redirigir al Home
};

// Verificar si el usuario está logueado
onMounted(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});
</script>

<style scoped>
.navbar {
  background-color: #FF4081; /* Color vibrante como un rosa fuerte */
  color: white;
}

.navbar-nav .nav-link {
  color: white !important;
  font-weight: 600;
}

.navbar-nav .nav-link:hover {
  color: #FFEB3B !important; /* Amarillo vibrante */
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
  color: white;
}

button {
  border-radius: 5px;
}

button:hover {
  background-color: #FF80AB;
}

button:focus {
  outline: none;
  box-shadow: none;
}

.navbar-toggler {
  border-color: #000000;
}

.bg-vibrant {
  background-color: #FF4081 !important;
}

.btn-vibrant {
  background-color: #FF4081;
  color: rgb(0, 0, 0);
}
</style>
