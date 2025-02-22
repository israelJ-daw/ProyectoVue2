<template>
  <div class="info-artist">
    <div v-if="artist">
      <h2>{{ artist.name }}</h2>
      <p><strong>Género:</strong> {{ artist.genre || 'Desconocido' }}</p>
      <p><strong>Fans:</strong> {{ artist.nb_fan }} fans</p>
      <img :src="artist.picture_big" alt="Imagen del artista" />
    </div>
    <div v-else>
      <p>Cargando información del artista...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { defineProps } from "vue";

// Recibe el ID del artista como prop
const props = defineProps({
  artistId: String,
});

const artist = ref(null);

const fetchArtistInfo = async () => {
  if (!props.artistId) return;

  try {
    const response = await axios.get(`https://api.deezer.com/artist/${props.artistId}`);
    artist.value = response.data;
  } catch (error) {
    console.error("Error al cargar el artista:", error);
  }
};

// Vuelve a cargar los datos si cambia el ID del artista
watchEffect(() => {
  fetchArtistInfo();
});
</script>

<style scoped>
.info-artist {
  text-align: center;
  padding: 20px;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
