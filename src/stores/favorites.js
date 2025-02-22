// stores/favorites.js
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [], // Lista de canciones favoritas
  }),
  actions: {
    addSong(song) {
      // Añadir canción si no está ya en la lista
      if (!this.favorites.find(fav => fav.id === song.id)) {
        this.favorites.push(song);
      }
    },
    removeSong(songId) {
      // Eliminar canción de la lista
      this.favorites = this.favorites.filter(fav => fav.id !== songId);
    }
  }
});
