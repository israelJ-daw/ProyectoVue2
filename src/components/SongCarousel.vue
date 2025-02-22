<template>
  <div class="carousel">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <button class="carousel-btn prev" @click="prev">❮</button>
      <div class="carousel-items">
        <div
          v-for="(item, index) in visibleItems"
          :key="item.id"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="item-image">
            <img :src="item.picture_medium || item.album.cover_medium" :alt="item.title || item.name" />
          </div>
          <p class="item-title">{{ item.title || item.name }}</p>
        </div>
      </div>
      <button class="carousel-btn next" @click="next">❯</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: ["title", "items"],
  setup(props) {
    const currentIndex = ref(0);

    const visibleItems = computed(() => {
      return props.items.slice(currentIndex.value, currentIndex.value + 5); // Muestra 5 elementos a la vez
    });

    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const next = () => {
      if (currentIndex.value < props.items.length - 5) {
        currentIndex.value++;
      }
    };

    return { prev, next, visibleItems };
  },
};
</script>

<style scoped>
.carousel {
  text-align: center;
  margin: 20px 0;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

.carousel-btn {
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: #FF4081;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.carousel-btn:hover {
  color: #d500f9;
  transform: scale(1.2);
}

.carousel-items {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 auto;
  margin: 10px;
  text-align: center;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.carousel-item:hover {
  opacity: 1;
  transform: scale(1.05);
}

.item-image {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-title {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
  font-weight: bold;
}

.carousel-item.active .item-image img {
  transform: scale(1.1);
}
</style>
