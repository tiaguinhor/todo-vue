<template>
  <div>
    <section id="todoapp">
      <header id="header">
        <h1>Tasks</h1>
        <input
          type="text"
          id="new-todo"
          placeholder="What needs to be done"
          ref="newTodo"
          v-model="newTodo"
          @keyup.enter="addNewTodo"
        >
        <label id="error-message" v-show="todoExistsMessage != ''">{{todoExistsMessage}}</label>
      </header>

      <div v-if="loading" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <section id="main" key="filtered-todos">
        <todo-check-all></todo-check-all>

        <ul id="todo-list">
          <transition-group
            name="fade-in-out"
            enter-active-class="animated fadeInUp faster"
            leave-active-class="animated fadeOutDown faster"
          >
            <todo-item
              v-for="todo in todosFiltered"
              :key="todo.id"
              :todo="todo"
              :checkAll="!anyRemaining"
            ></todo-item>
          </transition-group>
        </ul>
      </section>

      <footer id="footer">
        <todo-items-remaining></todo-items-remaining>
        <todo-filtered></todo-filtered>

        <transition name="custom-fade">
          <todo-clear-completed></todo-clear-completed>
        </transition>
      </footer>
    </section>

    <div id="info">
      <p>Double click to edit a task</p>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      todoExistsMessage: ""
    };
  },
  created() {
    this.initRealtimeListeners();
    this.retrieveTodos();
  },
  computed: {
    ...mapGetters(["anyRemaining", "todosFiltered", "todoExists"]),
    ...mapState(["loading"])
  },
  methods: {
    ...mapActions(["addTodo", "retrieveTodos", "initRealtimeListeners"]),
    addNewTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      if (this.todoExists(this.newTodo)) {
        this.todoExistsMessage = "Task already registered, try again.";
        this.$refs.newTodo.select();
        return;
      }

      this.addTodo({
        id: this.idForTodo,
        title: this.newTodo
      });

      this.newTodo = "";
      this.todoExistsMessage = "";
      this.idForTodo++;
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

#error-message {
  padding-left: 60px;
  color: red;
  position: absolute;
  top: 60px;
}

#todo-list li label {
  white-space: pre-line;
  small {
    font-size: 0.5em;
  }
}

// CSS Transitions
.custom-fade-enter-active,
.custom-fade-leave-active {
  transition: opacity 0.2s;
}

.custom-fade-enter,
.custom-fade-leave-to {
  opacity: 0;
}

// CSS Spinning Loader
.lds-ring {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
  margin-bottom: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid grey;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: grey transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
