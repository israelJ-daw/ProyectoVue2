<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  }
};
</script>

<style>
/* Estilos Globales */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
  color: #333;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1, h2 {
  font-family: 'Helvetica', sans-serif;
  color: #FF5733; /* Naranja brillante */
}

button {
  background-color: #FF5733; /* Naranja brillante */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #D94E29; /* Un tono más oscuro de naranja */
}

a {
  color: #FF5733;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
