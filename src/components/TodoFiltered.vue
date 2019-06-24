<template>
  <ul id="filters">
    <li>
      <a href="javascript:" :class="{ selected: filter == 'all' }" @click="changeFilter('all')">All</a>
    </li>
    <li>
      <a
        href="javascript:"
        :class="{ selected: filter == 'active' }"
        @click="changeFilter('active')"
      >Active</a>
    </li>
    <li>
      <a
        href="javascript:"
        :class="{ selected: filter == 'completed' }"
        @click="changeFilter('completed')"
      >Completed</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "todo-filtered",
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
    }
  }
};
</script>

