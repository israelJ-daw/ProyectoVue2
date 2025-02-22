<template>
    <div class="playlist-manager">
      <h3>Playlist</h3>
      <ul>
        <PlaylistItem
          v-for="(song, index) in playlist"
          :key="index"
          :song="song"
          @remove="removeSong(index)"
        />
      </ul>
      <button @click="addSong">Agregar Canción</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PlaylistItem from './PlaylistItem.vue';
  
  // Playlist de ejemplo (usarías Pinia aquí para la gestión de estado)
  const playlist = ref([
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' }
  ]);
  
  // Función para agregar una canción
  const addSong = () => {
    playlist.value.push({ title: 'New Song', artist: 'New Artist' });
  };
  
  // Función para eliminar una canción
  const removeSong = (index) => {
    playlist.value.splice(index, 1);
  };
  </script>
  
  <style scoped>
  .playlist-manager {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    color: #FF4081;
    font-size: 1.8rem;
    margin-bottom: 15px;
    text-align: center;
  }
  
  button {
    background-color: #FF4081;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  
  button:hover {
    background-color: #e0356a;
  }
  </style>
  