<template>
  <DataTable
    :value="restaurants"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords=restaurants_total
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <template #header>
      <InputText
          v-model="search"
          type="text" id="search"
          required
          placeholder="Наименование"
          class="m-2 sm:w-auto"/>
      <Button type="button"
              @click="onPushSearchButton()"
              icon="pi pi-search"
              label="Найти" />
    </template>
    <Column field="id" header="№" />
    <Column field="name" header="Название ресторана"/>
    <Column header="Изображение" class="w-80 h-20" >
      <template #body="slotProps">
          <img :src="slotProps.data.picture_url"/>
      </template>
    </Column>
    <Column class="w-24 !text-end"  header="Действия">
      <template #body="{ data }">
        <div class="flex justify-between gap-2">
          <Button icon="pi pi-times-circle" @click="openPopupConfirm($event, data)" severity="secondary" rounded></Button>
          <Button icon="pi pi-file-edit" @click="selectRow(data)" severity="secondary" rounded></Button>
        </div>
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createRestaurant')" icon="pi pi-plus" label="Добавить ресторан"/>
      </div>
    </template>
  </DataTable>
  <ConfirmPopup></ConfirmPopup>
  <Toast></Toast>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore.js'
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";

export default {
  name: "Restaurants",
  components: {DataTable, Column, Button, InputText, ConfirmPopup, Toast},
  data(){
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
      search:"",
    }
  },
  computed:{
    restaurants(){
      return this.dataStore.restaurants;
    },
    restaurants_total(){
      return this.dataStore.restaurants_total;
    },
    error_code(){
      return this.dataStore.errorCode;
    },
    error_message(){
      return this.dataStore.errorMessage;
    },
  },
  mounted(){
    console.log("Restaurants component mounted");
    this.dataStore.get_restaurants();
    this.dataStore.get_restaurants_total();
    console.log('Restaurants=', this.restaurants);
  },
  methods:{
    onPageChange(event){
      this.offset=event.first;
      this.perpage=event.rows;
      this.dataStore.get_restaurants(this.offset / this.perpage, this.perpage);
    },
    selectRow(data){
      this.$router.push('/createRestaurant/' + data.id);
    },
    onPushSearchButton(event){
      this.dataStore.get_restaurants_total(this.search);
      this.dataStore.get_restaurants(undefined,undefined,this.search);
    },
    openPopupConfirm(event, data){
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы уверены, что хотите удалить запись ' + data.id + '?',
        icon: "pi pi-exclamation-triangle",
        acceptLabel: 'да',
        rejectLabel: 'нет',
        accept: () => {
          this.deleteRestaurant(data.id);
        },
      })
    },
    async deleteRestaurant(id){
      await this.dataStore.delete_restaurant(id);
      if(this.error_code > 0){
        this.$toast.add({severity:'error', summary: "Ошибка удаления ресторана " +
            id, detail: this.error_message + " "+ this.error_code, life: 4000});
      }
      else{
        this.$toast.add({severity:'success', summary: "Ресторан" + id +
            " успешно удален", detail: this.error_message, life: 4000});
      }
      this.dataStore.get_restaurants(this.offset / this.perpage, this.perpage, this.search);
    }
  },
}
</script>

<style scoped>
</style>