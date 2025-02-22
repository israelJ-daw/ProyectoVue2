<template>
  <div class="search-container">
    <div class="search-header">
      <h1>Encuentra lo que te gusta en Deezer</h1>
      <p>
        Ingresa el término que buscas (canciones, álbumes, artistas).
      </p>
    </div>
 
 
    <!-- Barra de búsqueda -->
    <SearchBar @search="searchDeezer" />
 
 
    <div class="filters-container">
      <div class="filters">
        <!-- Filtros -->
        <div class="filter-item">
          <label for="min-duration">Duración mínima:</label>
          <input id="min-duration" type="number" v-model="minDurationMinutes" placeholder="Minutos" />
          <span>:</span>
          <input type="number" v-model="minDurationSeconds" placeholder="Segundos" />
        </div>
       
        <div class="filter-item">
          <label for="artist-filter">Filtrar por artista:</label>
          <input id="artist-filter" type="text" v-model="artistFilter" placeholder="Nombre del artista" />
        </div>
 
 
        <div class="filter-item">
          <label for="sort-order">Ordenar por:</label>
          <select id="sort-order" v-model="sortAscending">
            <option :value="true">Ascendente</option>
            <option :value="false">Descendente</option>
          </select>
        </div>
      </div>
    </div>
 
 
    <!-- Resultados -->
    <div class="results-container">
      <div v-if="filteredAndSortedSongs.length > 0" class="result-section">
        <h2>Canciones</h2>
        <SearchResults :songs="filteredAndSortedSongs" @play="$emit('play', $event)" @add-to-playlist="addToPlaylist" />
      </div>
 
 
      <div v-if="filteredAndSortedAlbums.length > 0" class="result-section">
        <h2>Álbumes</h2>
        <SearchResults :albums="filteredAndSortedAlbums" @play="$emit('play', $event)" />
      </div>
 
 
      <div v-if="filteredAndSortedArtists.length > 0" class="result-section">
        <h2>Artistas</h2>
        <SearchResults :artists="filteredAndSortedArtists" @play="$emit('play', $event)" />
      </div>
    </div>
 
 
    <!-- Botón para cargar más resultados -->
    <div class="load-more">
      <button @click="loadMoreSongs" v-if="filteredAndSortedSongs.length > songLimit" class="btn btn-primary">
        Cargar más canciones
      </button>
      <button @click="loadMoreAlbums" v-if="filteredAndSortedAlbums.length > albumLimit" class="btn btn-primary">
        Cargar más álbumes
      </button>
      <button @click="loadMoreArtists" v-if="filteredAndSortedArtists.length > artistLimit" class="btn btn-primary">
        Cargar más artistas
      </button>
    </div>
  </div>
 </template>
 
 
 <script setup>
 import { ref, computed, onMounted } from "vue";
 import { useRoute } from "vue-router";
 import { useFavoritesStore } from '@/stores/favorites'; // Importamos la tienda
 import SearchBar from "../components/SearchBar.vue";
 import SearchResults from "../components/SearchResults.vue";
 
 
 const route = useRoute();
 const searchQuery = ref(route.query.q || "");
 
 
 // Datos de canciones, álbumes y artistas
 const songs = ref([]);
 const albums = ref([]);
 const artists = ref([]);
 const cache = new Map();
 
 
 // Límites para mostrar resultados
 const songLimit = ref(5);
 const albumLimit = ref(5);
 const artistLimit = ref(5);
 
 
 // Filtros
 const sortAscending = ref(false);
 const minDurationMinutes = ref(null);
 const minDurationSeconds = ref(null);
 const artistFilter = ref("");
 
 
 // Filtrado y ordenamiento
 const filteredAndSortedSongs = computed(() => {
  let result = [...songs.value];
  const minDuration = (parseInt(minDurationMinutes.value) || 0) * 60 + (parseInt(minDurationSeconds.value) || 0);
 
 
  if (minDuration > 0) {
    result = result.filter(song => song.duration && song.duration >= minDuration);
  }
 
 
  if (artistFilter.value.trim() !== "") {
    result = result.filter(song =>
      song.artist.name.toLowerCase().includes(artistFilter.value.trim().toLowerCase())
    );
  }
 
 
  return result.sort((a, b) =>
    sortAscending.value ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );
 });
 
 
 const filteredAndSortedAlbums = computed(() => albums.value.filter(album =>
 album.title.toLowerCase().includes(searchQuery.value.toLowerCase())
 ));
 
 
 const filteredAndSortedArtists = computed(() => artists.value.filter(artist =>
 artist.name.toLowerCase().includes(searchQuery.value.toLowerCase())
 ));
 
 
 const loadMoreSongs = () => { songLimit.value += 5; };
 const loadMoreAlbums = () => { albumLimit.value += 5; };
 const loadMoreArtists = () => { artistLimit.value += 5; };
 
 
 // Buscar en Deezer
 const searchDeezer = async (query) => {
  if (!query.trim()) return;
 
 
  if (cache.has(query)) {
    const cachedData = cache.get(query);
    songs.value = cachedData.songs;
    albums.value = cachedData.albums;
    artists.value = cachedData.artists;
    return;
  }
 
 
  const songUrl = `http://localhost:8080/https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
  const albumUrl = `http://localhost:8080/https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`;
  const artistUrl = `http://localhost:8080/https://api.deezer.com/search/artist?q=${encodeURIComponent(query)}`;
 
 
  try {
    const [songResponse, albumResponse, artistResponse] = await Promise.all([
      fetch(songUrl),
      fetch(albumUrl),
      fetch(artistUrl)
    ]);
 
 
    if (!songResponse.ok || !albumResponse.ok || !artistResponse.ok) {
      throw new Error("Error al buscar en Deezer");
    }
 
 
    const songData = await songResponse.json();
    const albumData = await albumResponse.json();
    const artistData = await artistResponse.json();
 
 
    cache.set(query, { songs: songData.data, albums: albumData.data, artists: artistData.data });
 
 
    songs.value = songData.data || [];
    albums.value = albumData.data || [];
    artists.value = artistData.data || [];
  } catch (error) {
    console.error("Error en la búsqueda:", error.message);
  }
 };
 
 
 // Función para añadir canción a la playlist y a favoritos
 const addToPlaylist = (song) => {
  const favoritesStore = useFavoritesStore(); // Accedemos a la tienda de favoritos
  favoritesStore.addSong({
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: song.album,
    // Puedes añadir más información aquí si lo deseas
  });
 
 
  console.log("Añadida a favoritos:", song);
 };
 
 
 onMounted(() => {
  if (searchQuery.value) {
    searchDeezer(searchQuery.value);
  }
 });
 </script>
 
 
 <style scoped>
 .search-container {
  padding: 20px;
  background-color: #f4f4f4;
 }
 
 
 .search-header {
  text-align: center;
  margin-bottom: 20px;
 }
 
 
 .filters-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
 }
 
 
 .filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
 }
 
 
 .filter-item {
  display: flex;
  flex-direction: column;
 }
 
 
 input[type="number"],
 input[type="text"],
 select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
 }
 
 
 .results-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
 }
 
 
 .result-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 }
 
 
 h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
 }
 
 
 .load-more {
  display: flex;
  justify-content: center;
 }
 
 
 button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
 }
 
 
 button:hover {
  background-color: #0056b3;
 }
 </style>
 
 
 
 
 