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
    <Column field="name" header="Название ресторана" />

  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore.js'

export default {
  name: "Restaurants",
  components: {DataTable, Column},
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
  }
}
</script>

<style scoped>
</style>