<template>
  <a-checkbox v-bind="$attrs" :class="customClass" />
</template>

<script>
import { defineComponent } from "vue";
import { Checkbox as AntCheckbox } from "ant-design-vue";

export default defineComponent({
  name: "AntCheckbox",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntCheckbox,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>
