<!-- filepath: /D:/myproject/vue3x/DevHelper/src/components/container/AntFormGroup.vue -->
<template>
  <a-form-item
    v-bind="$attrs"
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :help="help"
    :validate-status="validateStatus"
    :has-feedback="hasFeedback"
    :required="required"
    :colon="colon"
    :extra="extra"
    :class="customClass"
  >
    <slot></slot>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Form as AntForm } from "ant-design-vue";

export default defineComponent({
  name: "AntFormGroup",
  components: {
    "a-form-item": AntForm.Item,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    labelCol: {
      type: Object,
      default: () => ({}),
    },
    wrapperCol: {
      type: Object,
      default: () => ({}),
    },
    help: {
      type: String,
      default: "",
    },
    validateStatus: {
      type: String as () =>
        | ""
        | "validating"
        | "error"
        | "success"
        | "warning"
        | undefined,
      default: "",
    },
    hasFeedback: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    colon: {
      type: Boolean,
      default: true,
    },
    extra: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
