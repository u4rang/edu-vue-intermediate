import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex);

const storage = {
    fetch() {
        
        if(localStorage.length == 0) return;
        const arr = [];
        for(let i = 0; i < localStorage.length; ++i){
            if(!localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                // console.log(typeof localStorage.getItem(localStorage.key(i)));
                // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }

        return arr;
    },
};

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch(),
    },
    getters,
    mutations,
});