<template>
  <div class="info-view">
    <!-- Mensaje de carga si no tenemos los detalles de la canción -->
    <div v-if="!isLoaded">
      <p>Cargando detalles de la canción...</p>
    </div>

    <!-- Mostrar los detalles de la canción una vez cargados -->
    <div v-else>
      <h1>{{ track.title }}</h1>
      <h2>{{ track.artist.name }}</h2>
      <img :src="track.album.cover_big" alt="Album cover" />
      <p>{{ track.album.title }}</p>

      <!-- Usamos el MusicPlayer en vez del <audio> -->
      <MusicPlayer :src="track.preview" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MusicPlayer from "@/components/MusicPlayer.vue"; // Importamos el nuevo reproductor

export default {
  name: "InfoView",
  components: {
    MusicPlayer,
  },
  setup() {
    const route = useRoute();
    const track = ref(null);
    const isLoaded = ref(false);

    const fetchSongDetails = async (songId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/https://api.deezer.com/track/${songId}`
        );
        track.value = response.data;
        isLoaded.value = true;
      } catch (error) {
        console.error("Error al cargar los detalles de la canción:", error);
        isLoaded.value = true;
      }
    };

    onMounted(() => {
      const songId = route.params.songId;
      fetchSongDetails(songId);
    });

    return { track, isLoaded };
  },
};
</script>

<style scoped>
.info-view {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}
</style>
