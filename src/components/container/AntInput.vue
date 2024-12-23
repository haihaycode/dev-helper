<template>
  <div :class="['input-wrapper', customClass]">
    <a-input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateValue"
      :class="{ 'has-error': error }"
    />
    <a-tooltip v-if="error" :title="error" placement="bottom">
      <div class="error-icon">
        <ExclamationCircleFilled />
      </div>
    </a-tooltip>
  </div>
  <AntTextSpan v-if="error" class="error-message">{{ error }}</AntTextSpan>
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
    // eslint-disable-next-line vue/no-unused-components
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
.input-wrapper {
  position: relative;
}

.has-error {
  border-color: #ff4d4f;
}

.error-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff4d4f;
  font-size: 16px;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}
</style>
