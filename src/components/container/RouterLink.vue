<template>
  <a :href="to" @click.prevent="navigate" :class="classes">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default: "",
    },
    activeClass: {
      type: String,
      default: "text-blue-500",
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isActive() {
      return this.exact
        ? this.$route.path === this.to
        : this.$route.path.startsWith(this.to);
    },
  },
  methods: {
    navigate() {
      this.$router.push(this.to);
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
