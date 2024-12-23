<template>
  <a-card v-bind="$attrs" :class="['custom-card', customClass]">
    <slot></slot>
  </a-card>
</template>

<script>
import { defineComponent } from "vue";
import { Card as AntCard } from "ant-design-vue";

export default defineComponent({
  name: "AntCard",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntCard,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.custom-card {
  background-color: rgba(255, 255, 255, 0.856);
  padding: 10px;
}
</style>
