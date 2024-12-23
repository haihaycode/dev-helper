<template>
  <a-form
    v-bind="$attrs"
    :model="model"
    :layout="layout"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="colon"
    :label-align="labelAlign"
    :validate-on-rule-change="validateOnRuleChange"
    :hide-required-mark="hideRequiredMark"
    :scroll-to-first-error="scrollToFirstError"
    @submit="handleSubmit"
  >
    <slot></slot>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form as AntForm } from "ant-design-vue";

export default defineComponent({
  name: "AntForm",
  components: {
    "a-form": AntForm,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    layout: {
      type: String as () => "horizontal" | "vertical" | "inline",
      default: "horizontal", // 'horizontal', 'vertical', 'inline'
    },
    labelCol: {
      type: Object,
      default: () => ({}),
    },
    wrapperCol: {
      type: Object,
      default: () => ({}),
    },
    colon: {
      type: Boolean,
      default: true,
    },
    labelAlign: {
      type: String as () => "left" | "right",
      default: "right", // 'left', 'right'
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    hideRequiredMark: {
      type: Boolean,
      default: false,
    },
    scrollToFirstError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit(event: Event) {
      this.$emit("submit", event);
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
