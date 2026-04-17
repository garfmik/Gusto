<template>
  <DataTable
      :value="favourites"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords=favourites_total
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
  >
    <Column field="restaurant.id" header="№" />
    <Column field="restaurant.name" header="Название ресторана" />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore.js'
export default {
  name: "Favourites",
  components: {DataTable, Column},
  data(){
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed:{
    favourites(){
      return this.dataStore.favourites;
    },
    favourites_total(){
      return this.dataStore.favourites_total;
    }
  },
  mounted(){
    console.log("favourites component mounted");
    this.dataStore.get_favourites();
    this.dataStore.get_favourites_total();
    console.log('favourites=', this.favourites);
  },
  methods:{
    onPageChange(event){
      this.offset=event.first;
      this.perpage=event.rows;
      this.dataStore.get_favourites(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
<style scoped>

</style>