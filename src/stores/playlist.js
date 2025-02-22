// src/stores/playlists.js

import { defineStore } from 'pinia';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    playlists: []
  }),
  actions: {
    // Crear una nueva playlist
    addPlaylist(name) {
      const newPlaylist = {
        id: Date.now(),
        name,
        songs: []
      };
      this.playlists.push(newPlaylist);
    },

    // Añadir canción a una playlist
    addSongToPlaylist(playlistId, song) {
      const playlist = this.playlists.find(p => p.id === playlistId);
      if (playlist && !playlist.songs.some(s => s.id === song.id)) {
        playlist.songs.push(song);
      }
    },

    // Eliminar canción de una playlist
    removeSongFromPlaylist(playlistId, songId) {
      const playlist = this.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
      }
    }
  }
});
