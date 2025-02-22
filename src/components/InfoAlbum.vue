<template>
  <div v-if="album">
    <h2>{{ album.title }}</h2>
    <p><strong>Artista:</strong> {{ album.artist.name }}</p>
    <p><strong>Año de Lanzamiento:</strong> {{ album.release_date }}</p>
    <img :src="album.cover_big" alt="Album cover" />
  </div>
  <div v-else>
    <p>Cargando información del álbum...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const albumId = route.params.id;
const album = ref(null);

const fetchAlbumInfo = async () => {
  try {
    const response = await axios.get(`https://api.deezer.com/album/${albumId}`);
    album.value = response.data;
  } catch (error) {
    console.error("Error al cargar el álbum:", error);
  }
};

onMounted(() => {
  fetchAlbumInfo();
});
</script>
