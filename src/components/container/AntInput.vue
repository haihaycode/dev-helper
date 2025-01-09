<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable vue/no-unused-components -->
<!-- filepath: /d:/.my.project/vue3x/DevHelper/src/components/container/AntInput.vue -->
<template>
  <div :class="['relative', customClass]">
    <a-input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateValue"
      :class="[
        'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        { 'border-red-500': error },
      ]"
    />
    <a-tooltip v-if="error" :title="error" placement="bottom">
      <div
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-lg"
      >
        <ExclamationCircleFilled />
      </div>
    </a-tooltip>
  </div>
  <AntTextSpan v-if="error" class="text-red-500 text-sm mt-1">{{
    error
  }}</AntTextSpan>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Input as AntInput, Tooltip as AntTooltip } from "ant-design-vue";
import { ExclamationCircleFilled } from "@ant-design/icons-vue";
import AntTextSpan from "@/components/container/AntTextSpan.vue";

export default defineComponent({
  name: "AntInput",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntInput,
    // eslint-disable-next-line vue/no-unused-components
    AntTooltip,
    ExclamationCircleFilled,
    AntTextSpan,
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
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
/* No custom CSS needed as we are using Tailwind CSS classes */
</style>
