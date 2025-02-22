<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      placeholder="Busca canciones, álbumes o artistas..."
      @input="onSearch"
    />
    <button @click="clearSearch" v-if="query.trim()">X</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const query = ref('');

const onSearch = () => {
  if (query.value.trim()) {
    emit('search', query.value);
  }
};

const clearSearch = () => {
  query.value = '';
  emit('search', '');
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  padding: 10px;
}

input[type="text"] {
  padding: 12px 20px;
  width: 350px;
  border-radius: 25px;
  border: 2px solid #4CAF50;
  background-color: #f3f3f3;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #4CAF50;
}

button {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: transparent;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
}

button:hover {
  color: #333;
}
</style>
