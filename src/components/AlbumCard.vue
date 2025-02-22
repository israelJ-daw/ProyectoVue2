<template>
    <div class="album-card">
      <img :src="album.cover_big" alt="Album cover" class="album-cover" />
      <div class="album-details">
        <h3>{{ album.title }}</h3>
        <p><strong>Artista:</strong> {{ album.artist.name }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    album: Object
  });
  </script>
  
  <style scoped>
  .album-card {
    display: flex;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    align-items: center;
  }
  
  .album-cover {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 15px;
  }
  
  .album-details {
    flex: 1;
  }
  
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
  </style>
  