<template>
  <AntModal
    :visible="visible"
    :title="title"
    :footer="null"
    :closable="closable"
    @cancel="closeModal"
  >
    <template #default>
      <AntAlert
        :message="title"
        :description="content"
        :type="type"
        :banner="banner"
        :show-icon="true"
      ></AntAlert>

      <div class="modal-content">
        <slot></slot>
      </div>
    </template>
  </AntModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AntModal from "@/components/container/AntModal.vue";
import AntAlert from "@/components/container/AntAlert.vue";

export default defineComponent({
  name: "AntModalMessage",
  components: {
    AntModal,
    AntAlert,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info", // 'success', 'info', 'warning', 'error'
    },
    banner: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
  },
});
</script>

<style scoped>
.modal-content {
  margin-top: 16px;
}
</style>
