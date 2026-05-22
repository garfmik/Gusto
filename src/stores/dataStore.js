import { defineStore} from "pinia";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        restaurants: [],
        restaurants_total: null,
        favourites: [],
        favourites_total: null,
        errorCode: "",
        errorMessage:"",
    }),
    actions: {
        async get_restaurants(page = 0, perpage = 5, search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/restaurants',{
                    params: {
                        page: page,
                        perpage: perpage,
                        search: search,
                    }
                });
                this.restaurants = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 1;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 2;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 3;
                    console.log(error);
                }
            }
        },
        async get_restaurants_total(search = "") {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/restaurants_total', {
                    params: {
                        search: search
                    }});
                this.restaurants_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 1;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 2;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 3;
                    console.log(error);
                }
            }
        },
        async get_favourites(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/favourites',{
                    params: {
                        page: page,
                        perpage: perpage
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.favourites = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async get_favourites_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/favourites_total',{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                this.favourites_total = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async create_restaurant(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(backendUrl + '/restaurants', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                    }
                );
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async delete_restaurant(id) {
            this.errorMessage = "";
            this.errorCode = 0;
            try {
                const response = await axios.delete(backendUrl +'/restaurants/' + id, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.error;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
        async update_restaurant(formData, id) {
            this.errorMessage = "";
            try {
                console.log(formData);
                const response = await axios.post(backendUrl + '/restaurants/' + id, formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                });
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },
    },
});