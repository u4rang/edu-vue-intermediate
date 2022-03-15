<template>
  <div class="inputBox shadow">
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
      <!-- <button v-on:click="addTodo">add</button> -->
      <span class="addContainer" v-on:click="addTodo">
        <i class="fas fa-plus addBtn"></i>
      </span>      
      
      <!-- Modal -->
      <Modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">
          경고!
          <i class="fas fa-times closeModalBtn" @click="showModal = false"></i>
        </h3>

        <div slot="body">
          내용을 입력해주세요.
        </div>
        
        <div slot="footer">
          copy right
        </div>
      </Modal>
  </div>
</template>

<script>

import Modal from './common/Modal.vue'

export default {
  data() {
    return {
      newTodoItem: null,
      showModal: false,
    };
  },
  methods: {
    addTodo() {
      // console.log(this.newTodoItem)
      
      // 저장하는 로직
      // - LocalStorage 에 저장 (setItem 메소드)
      //   localStorage.setItem(key, value);
      if(this.newTodoItem === null){
        this.showModal = !this.showModal;
        return;
      } 
      // this.$emit('이벤트이름', 인자1, 인자2);
      this.$emit('addTodo', this.newTodoItem);
      this.clearInput();
    },
    clearInput: function() {
      // 비워주기
      this.newTodoItem = null;
    }
  },
  components : {
    Modal,
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>