<template>
  <a-input
    v-bind="$attrs"
    :class="customClass"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script lang="ts">
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
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    updateValue(event: Event) {
      const input = event.target as HTMLInputElement;
      this.$emit("update:modelValue", input.value);
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
