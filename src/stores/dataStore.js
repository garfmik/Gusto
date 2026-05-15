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
        async get_restaurants(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/restaurants',{
                    params: {
                        page: page,
                        perpage: perpage
                    }
                });
                this.restaurants = response.data;
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
        async get_restaurants_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl +'/restaurants_total');
                this.restaurants_total = response.data;
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
    },
});