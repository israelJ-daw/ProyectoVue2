<template>
  <div class="login">
    <h2>Iniciar sesión</h2>

    <!-- Modal de bienvenida -->
    <WelcomeModal 
      v-if="showModal" 
      @userRegistered="registerUser" 
      @close="closeModal" 
    />
  </div>
</template>

<script>
import WelcomeModal from "@/components/WelcomeModal.vue";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { WelcomeModal },
  setup() {
    const showModal = ref(true);
    const router = useRouter();

    // Función para registrar al usuario
    const registerUser = (user) => {
      localStorage.setItem("user", JSON.stringify(user)); // Guardar usuario en localStorage
      showModal.value = false; // Cerrar el modal

      // Redirigir al Home
      router.push({ name: "Home" });
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      showModal,
      registerUser,
      closeModal,
    };
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #FF4081;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #FF80AB;
}
</style>
