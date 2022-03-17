import Vue from 'vue'
import Vuex from 'vuex'

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
    getters: {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        addOneItem(state, todoItem){
            const obj = {
                completed: false,
                item: todoItem,
            };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload){
            localStorage.removeItem(payload.todoItem, payload.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload){
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
            // Update LocalStorage
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItem(state){
            localStorage.clear();
            state.todoItems = [];
        },
    },
});