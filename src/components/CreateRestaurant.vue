<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createRestaurant" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление ресторана</h2>

      <div class="flex flex-col">
          <InputText type="text" placeholder="Введите название ресторана" v-model="this.restaurantName"/>
        </div>

        <div class="mb-4 mt-4">
          <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
            <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
          <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*" />
        </div>

        <div class="flex flex-col mt-6">
          <Button type="submit" label="Добавить" />
        </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useDataStore } from '@/stores/dataStore.js';

export default {
  name: "CreateRestaurant",
  components: { InputText, Button, Toast },
  data() {
    return {
      dataStore: useDataStore(),
      restaurantName: '',
      restaurantImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.restaurantImage = file;
      } else {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.restaurantImage = null;
      }
    },

    async createRestaurant() {
      const formData = new FormData();
      formData.append('name', this.restaurantName);
      formData.append('image', this.restaurantImage);

      await this.dataStore.create_restaurant(formData);
      if (this.errorCode > 0 ) {
        this.$toast.add({severity: 'error', summary: 'Ошибка добавления данных', detail: this.errorMessage, life: 4000});
      }
      else {
        this.$toast.add({severity: 'success', summary: 'Данные успешно добавлены', detail: this.errorMessage, life: 4000});
      }
    }
  }
};
</script>

<style scoped>

</style>