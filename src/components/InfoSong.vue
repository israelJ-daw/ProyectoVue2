<template>
  <div v-if="song">
    <h2>{{ song.title }}</h2>
    <p><strong>Artista:</strong> {{ song.artist.name }}</p>
    <p><strong>Álbum:</strong> {{ song.album.title }}</p>
    <p><strong>Duración:</strong> {{ song.duration }} segundos</p>
    <img :src="song.album.cover_big" alt="Song album cover" />
  </div>
  <div v-else>
    <p>Cargando información de la canción...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const songId = route.params.id;
const song = ref(null);

const fetchSongInfo = async () => {
  try {
    const response = await axios.get(`https://api.deezer.com/track/${songId}`);
    song.value = response.data;
  } catch (error) {
    console.error("Error al cargar la canción:", error);
  }
};

onMounted(() => {
  fetchSongInfo();
});
</script>
