import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      name: "Invitado",
      avatar: "",
    },
  }),
  actions: {
    logout() {
      this.user = { name: "Invitado", avatar: "" };
    },
  },
});
