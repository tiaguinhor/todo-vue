<template>
  <li :class="{ completed : completed, editing : editing }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="completed" @change="doneEdit">

      <label v-if="!editing" @dblclick="editTodo">
        <small>{{timestamp}}</small>
        {{ title }}
      </label>

      <button class="destroy" @click="removeTodo(todo.id)"></button>
    </div>

    <input
      v-if="editing"
      class="edit"
      type="text"
      v-model="title"
      @blur="doneEdit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      v-focus
    >
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      timestamp: this.todo.timestamp,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
    todo() {
      this.title = this.todo.title;
      this.completed = this.todo.completed;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),
    removeTodo(id) {
      this.deleteTodo(id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }

      this.editing = false;
      this.updateTodo({
        id: this.id,
        title: this.title,
        completed: this.completed,
        timestamp: this.timestamp,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    }
  }
};
</script>

