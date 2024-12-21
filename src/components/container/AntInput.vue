<template>
  <a-input v-bind="$attrs" :class="customClass" />
</template>

<script>
import { defineComponent } from "vue";
import { Input as AntInput } from "ant-design-vue";

export default defineComponent({
  name: "AntInput",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntInput,
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
/* Style tùy chỉnh cho Input (nếu cần) */
</style>
