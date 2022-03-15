<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메소드명"></TodoInput> -->
    <TodoInput v-on:addTodo="addOneItem"></TodoInput>
    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름=현재 위치 속성 이름></TodoList> -->
    <TodoList 
      v-bind:propsdata="todoItems"
      v-on:removeTodo="removeOneItem"
      v-on:toggleTodo="toggleOneItem"
      >
    </TodoList>
    <TodoFooter
      v-on:clearAllTodo="clearAllItem"
      >
    </TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue"
import TodoInput from "./components/TodoInput.vue"
import TodoList from "./components/TodoList.vue"
import TodoFooter from "./components/TodoFooter.vue"

export default {
  data(){
    return {
      todoItems: []
    };
  },
  
  methods: {
    addOneItem(todoItem) {
      const obj = {
        completed: false,
        item: todoItem,
      };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index){
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem, index){
      // console.log(todoItem, index);
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed
      // Update LocalStorage
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem(){
      localStorage.clear();
      this.todoItems = [];
    },
  },

  // 1.View Life Cycle에서 Created 상태
  created() {
    if(localStorage.length == 0) return;
    
    for(let i = 0; i < localStorage.length; ++i){
      if(!localStorage.key(i) !== 'loglevel:webpack-dev-server'){
        // console.log(typeof localStorage.getItem(localStorage.key(i)));
        // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
      
      // console.log(localStorage.key(i));
    }
  },

  components: {
  //'컴포넌트 태그 명' : 컴포넌트 내용
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0.0,0, 0.03);
}

</style>
