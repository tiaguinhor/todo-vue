<template>
  <span id="todo-count">
    <strong>{{ remaining }} items left</strong>
  </span>
</template>

<script>
export default {
  name: "todo-remaining",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>

