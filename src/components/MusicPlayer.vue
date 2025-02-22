<template>
    <div class="music-player">
      <button @click="togglePlay">
        {{ isPlaying ? "⏸️ Pausar" : "▶️ Reproducir" }}
      </button>
      <div class="progress-bar">
        <span>{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          :value="progress"
          @input="seek"
          min="0"
          max="100"
        />
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted, onUnmounted } from "vue";
  
  export default {
    name: "MusicPlayer",
    props: {
      src: String,
    },
    setup(props) {
      const audio = new Audio(props.src);
      const isPlaying = ref(false);
      const currentTime = ref(0);
      const duration = ref(30); // La preview de Deezer dura 30s
      const progress = ref(0);
  
      const togglePlay = () => {
        if (isPlaying.value) {
          audio.pause();
        } else {
          audio.play();
        }
        isPlaying.value = !isPlaying.value;
      };
  
      const updateProgress = () => {
        currentTime.value = audio.currentTime;
        progress.value = (audio.currentTime / duration.value) * 100;
      };
  
      const seek = (event) => {
        const newTime = (event.target.value / 100) * duration.value;
        audio.currentTime = newTime;
        currentTime.value = newTime;
      };
  
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
  
      onMounted(() => {
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", () => (isPlaying.value = false));
      });
  
      onUnmounted(() => {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
      });
  
      return {
        isPlaying,
        togglePlay,
        currentTime,
        duration,
        progress,
        seek,
        formatTime,
      };
    },
  };
  </script>
  
  <style scoped>
  .music-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    background-color: #FF4081;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #000000;
  }
  
  .progress-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 300px;
    gap: 10px;
    margin-top: 10px;
  }
  
  input[type="range"] {
    width: 100%;
    cursor: pointer;
  }
  </style>
  