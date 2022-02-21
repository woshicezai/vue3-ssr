import { defineStore } from "pinia";

export const personStore = defineStore({
  id: "person-store",
  state: () => ({
    name: "",
    age: "",
  }),
  getters: {
    getName() {
      return this.name;
    },
    getAge() {
      return this.age;
    },
  },
  actions: {
    setStore(payload) {
      this.name = payload.name || "无名氏";
      this.age = payload.age || "---";
    },
  },
});
