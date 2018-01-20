import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        'gcc-usd': 0,
        'gcc-eur': 0,
        'btc-usd': 0,
        'btc-eur': 0,

        'method': 'crypto-to-currency'
    },

    getters: {
        getGccUsd(state) {
            return state['gcc-usd'];
        },
        getGccEur(state) {
            return state['gcc-eur'];
        },
        getBtcUsd(state) {
            return state['btc-usd'];
        },
        getBtcEur(state) {
            return state['btc-eur'];
        },

        getMethod(state) {
            return state['method'];
        },
    },
    mutations: {
        setGccUsd(state,{ price }) {
            state['gcc-usd'] = price;
        },
        setGccEur(state,{ price }) {
            state['gcc-eur'] = price;
        },
        setBtcUsd(state,{ price }) {
            state['btc-usd'] = price;
        },
        setBtcEur(state,{ price }) {
            state['btc-eur'] = price;
        },

        changeMethod(state) {
            if (state.method == 'crypto-to-currency') {
                state.method = 'currency-to-crypto';
            } else {
                state.method = 'crypto-to-currency';
            }
        }
    },
    actions: {
        getDataFromApi({commit}) {
            let api = 'https://api.cryptonator.com/api/ticker/';

            axios.get(api + 'gcc-usd').then( response => {

                commit('setGccUsd',{ price: response.data.ticker.price});
            })
            
            axios.get(api + 'gcc-eur').then( response => {
                commit('setGccEur',{ price: response.data.ticker.price});
            })

            axios.get(api + 'btc-usd').then( response => {
                commit('setBtcUsd',{ price: response.data.ticker.price});
            })

            axios.get(api + 'btc-eur').then( response => {
                commit('setBtcEur',{ price: response.data.ticker.price});
            })
        },
        changeMethod({commit}) {
            commit('changeMethod');
        }
    
    }
})