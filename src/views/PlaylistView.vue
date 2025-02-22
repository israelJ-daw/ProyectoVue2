<template>
  <div>
    <h2>Canciones Favoritas</h2>
    <div v-if="favorites.length">
      <div v-for="(song, index) in favorites" :key="index" class="favorite-song">
        <img :src="song.album.cover" alt="Album cover" />
        <div>
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist.name }}</p>
          <button @click="removeFromFavorites(song.id)" class="delete-button">Eliminar de favoritos</button>
        </div>
      </div>
    </div>
    <p v-else>No tienes canciones favoritas.</p>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/stores/favorites';

export default {
  setup() {
    const favoritesStore = useFavoritesStore();
    const favorites = favoritesStore.favorites;

    const removeFromFavorites = (songId) => {
      favoritesStore.removeSong(songId);
    };

    return { favorites, removeFromFavorites };
  },
};
</script>

<style scoped>
.favorite-song {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.favorite-song img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.favorite-song h3 {
  margin: 0;
}

.favorite-song p {
  margin: 0;
  font-size: 0.9rem;
}

.favorite-song button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* Estilos para el botón de eliminar con color personalizado */
.delete-button {
  background-color: #FF4081;
  color: white;
}

.delete-button:hover {
  background-color: #f50057;
}
</style>
