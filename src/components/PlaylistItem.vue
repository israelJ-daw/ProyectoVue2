<template>
    <li class="playlist-item">
      <span>{{ song.title }} - {{ song.artist }}</span>
      <button @click="removeSong">Eliminar</button>
    </li>
  </template>
  
  <script setup>
  const props = defineProps({
    song: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['remove']);
  
  // Emitir evento de eliminación
  const removeSong = () => {
    emit('remove');
  };
  </script>
  
  <style scoped>
  .playlist-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .playlist-item:hover {
    background-color: #FF4081;
    color: white;
    cursor: pointer;
  }
  
  button {
    background-color: #FF4081;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e0356a;
  }
  </style>
  