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
    <Column field="id" header="№" />
    <Column field="name" header="Название ресторана"/>
    <Column header="Изображение" style="width: 150px;">
      <template #body="slotProps">
          <img :src="slotProps.data.picture_url"/>
      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createRestaurant')" icon="pi pi-plus" label="Добавить ресторан"/>
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore.js'
import Button from "primevue/button";

export default {
  name: "Restaurants",
  components: {DataTable, Column, Button},
  data(){
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed:{
    restaurants(){
      return this.dataStore.restaurants;
    },
    restaurants_total(){
      return this.dataStore.restaurants_total;
    }
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
    }
  },
}
</script>

<style scoped>
</style>