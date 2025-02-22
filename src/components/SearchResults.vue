<template>
  <div class="search-results">
    <div v-if="songs && songs.length > 0" class="results-section">
      <h3 class="section-title">Canciones</h3>
      <div class="results-container">
        <div class="result-card" v-for="song in songs" :key="song.id">
          <img :src="song.album.cover_medium" alt="Album cover" class="cover-image" />
          <div class="card-info">
            <!-- Enlazar el nombre de la canción a la vista InfoView -->
            <router-link :to="'/song/' + song.id" class="song-title-link">
              <h4 class="song-title">{{ song.title }}</h4>
            </router-link>
            <p class="artist-name">{{ song.artist.name }}</p>
            <!-- Botón para añadir a la playlist -->
            <button @click="addToPlaylist(song)" class="add-to-playlist-button">Añadir a la playlist</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="albums && albums.length > 0" class="results-section">
      <h3 class="section-title">Álbumes</h3>
      <div class="results-container">
        <div class="result-card album-card" v-for="album in albums" :key="album.id">
          <img :src="album.cover_medium" alt="Album cover" class="cover-image" />
          <div class="card-info">
            <h4 class="album-title">{{ album.title }}</h4>
            <p class="album-artist">{{ album.artist.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="artists && artists.length > 0" class="results-section">
      <h3 class="section-title">Artistas</h3>
      <div class="results-container">
        <div class="result-card" v-for="artist in artists" :key="artist.id">
          <img :src="artist.picture_medium" alt="Artist picture" class="cover-image" />
          <div class="card-info">
            <h4 class="artist-name">{{ artist.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

 
 <script setup>
 defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
  albums: {
    type: Array,
    default: () => [],
  },
  artists: {
    type: Array,
    default: () => [],
  },
 });
 
 
 const emit = defineEmits(['play', 'add-to-playlist']);
 
 
 const addToPlaylist = (song) => {
  // Emitir el evento para agregar la canción a la playlist
  emit('add-to-playlist', song);
 };
 </script>
 
 
 <style scoped>
 .search-results {
  margin-top: 30px;
 }
 
 
 .results-section {
  margin-bottom: 40px;
 }
 
 
 .section-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
  margin-bottom: 20px;
 }
 
 
 .results-container {
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  padding-bottom: 20px;
 }
 
 
 .result-card {
  background-color: #FF4081;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
  padding: 20px;
  position: relative;
  transition: transform 0.3s;
 }
 
 
 .result-card:hover {
  transform: translateY(-10px);
 }
 
 
 .cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 0.3s;
 }
 
 
 .card-info {
  margin-top: 15px;
 }
 
 
 .song-title, .album-title, .artist-name {
  font-size: 1.1em;
  font-weight: 600;
  color: #fff;
 }
 
 
 .artist-name {
  font-size: 1em;
  color: #f3f3f3;
 }
 
 
 .play-button {
  padding: 8px 15px;
  background-color: #FF80AB; /* Un tono más suave del rosa */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;
 }
 
 
 .play-button:hover {
  background-color: #FF4C72; /* Un tono aún más fuerte */
 }
 
 
 /* Nuevo estilo para el botón "Añadir a la playlist" */
 .add-to-playlist-button {
  padding: 8px 15px;
  background-color: #4CAF50; /* Verde para el botón */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;
 }
 
 
 .add-to-playlist-button:hover {
  background-color: #45a049; /* Verde más oscuro en hover */
 }
 
 
 /* Estilo para las tarjetas de los álbumes más grandes */
 .album-card {
  width: 350px; /* Mayor tamaño de la tarjeta */
  padding: 30px;
  height: 450px;
 }
 
 
 .album-card .cover-image {
  height: 250px; /* Imagen más grande */
 }
 
 
 .album-title, .album-artist {
  font-size: 1.3em; /* Títulos más grandes */
 }
 </style>
 
 
 