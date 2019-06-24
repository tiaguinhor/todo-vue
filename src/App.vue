<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}

button,
input[type="checkbox"] {
  cursor: pointer;
}
</style>
