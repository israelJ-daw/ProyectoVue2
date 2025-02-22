<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Bienvenido a Deezer Client</h2>
      <p>Introduce tu nombre y elige un avatar para empezar.</p>

      <!-- Campo para el nombre -->
      <input v-model="userName" type="text" placeholder="Tu nombre" />

      <!-- Selección de avatar -->
      <div class="avatar-selection">
        <img
          v-for="avatar in avatars"
          :key="avatar"
          :src="avatar"
          :class="{ selected: userAvatar === avatar }"
          @click="userAvatar = avatar"
          class="avatar"
        />
      </div>

      <button @click="saveUser">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["userRegistered"]);
const showModal = ref(true);
const userName = ref("");
const userAvatar = ref("");
const avatars = [
  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=6",
  "https://i.pravatar.cc/40?img=7",
  "https://i.pravatar.cc/40?img=8"
];

const saveUser = () => {
  if (!userName.value || !userAvatar.value) return alert("Elige un nombre y un avatar");

  const user = {
    name: userName.value,
    avatar: userAvatar.value
  };

  localStorage.setItem("user", JSON.stringify(user));
  emit("userRegistered", user);
  showModal.value = false;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.avatar-selection {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.avatar.selected {
  border: 2px solid #FF4081;
}

button{
  background-color: #FF4081;
}
</style>
