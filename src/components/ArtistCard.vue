<template>
    <div class="artist-card">
      <img :src="artist.picture_big" alt="Artist image" class="artist-image" />
      <div class="artist-details">
        <h3>{{ artist.name }}</h3>
        <p><strong>Género:</strong> {{ artist.genre || 'Desconocido' }}</p>
        <p><strong>Fans:</strong> {{ artist.nb_fan }} fans</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    artist: Object
  });
  </script>
  
  <style scoped>
  .artist-card {
    display: flex;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    align-items: center;
  }
  
  .artist-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .artist-details {
    flex: 1;
  }
  
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
  </style>
  