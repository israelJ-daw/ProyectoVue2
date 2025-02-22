<template>
  <div class="song-card">
    <!-- Verificamos si 'song.album' existe antes de acceder a sus propiedades -->
    <img 
      v-if="song.album" 
      :src="song.album.cover_big" 
      alt="Album cover" 
      class="song-cover" 
    />
    <div class="song-details">
      <h3>{{ song.title }}</h3>
      <p><strong>Artista:</strong> {{ song.artist.name }}</p>
      
      <!-- Verificamos si 'song.album' existe antes de mostrar el título del álbum -->
      <p v-if="song.album"><strong>Álbum:</strong> {{ song.album.title }}</p>
      <p v-else><strong>Álbum:</strong> Desconocido</p> <!-- Mensaje por defecto si no hay álbum -->
      
      <button @click="addToPlaylist" class="btn-add">Agregar a Playlist</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  song: Object
});

const addToPlaylist = () => {
  // Aquí deberías agregar la lógica para agregar la canción a una playlist
  console.log(`Canción ${props.song.title} agregada a la playlist.`);
};
</script>

<style scoped>
.song-card {
  display: flex;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-items: center;
}

.song-cover {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 15px;
}

.song-details {
  flex: 1;
}

h3 {
  font-size: 1.2rem;
  margin: 0;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>
