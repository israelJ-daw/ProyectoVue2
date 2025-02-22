import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaylistsView from '../views/PlaylistView.vue';
import SearchView from '../views/SearchView.vue';
import LoginView from '../views/LoginView.vue';
import InfoView from '../views/InfoView.vue'; // Asegúrate de importar la vista que mostrará los detalles

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: PlaylistsView,
  },
  {
    path: '/search',
    name: 'Buscador',
    component: SearchView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/song/:songId',  // Cambié aquí para ser específico con la canción
    name: 'Info',
    component: InfoView, // Vista que mostrará los detalles
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
