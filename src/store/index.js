import Vue from 'vue';
import Vuex from 'vuex';

import admin from './modules/admin'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        admin
    },
    state: {
        hospitalName: ''
    },
    mutations: {
        setHospitalName (state, name) {
            state.hospitalName = name
        }
    }
});

export default store;
