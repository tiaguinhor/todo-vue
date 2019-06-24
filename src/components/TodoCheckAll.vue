<template>
  <div>
    <input id="toggle-all" type="checkbox" :checked="!anyRemaining" @change="allChecked">
    <label for="toggle-all">Check All</label>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>

