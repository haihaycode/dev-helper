<template>
  <a-modal
    v-bind="$attrs"
    :class="customClass"
    :visible="visible"
    @cancel="closeModal"
    @ok="closeModal"
  >
    <slot></slot>
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";
import { Modal as AntModal } from "ant-design-vue";

export default defineComponent({
  name: "AntModal",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntModal,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
  },
});
</script>

<style scoped></style>
