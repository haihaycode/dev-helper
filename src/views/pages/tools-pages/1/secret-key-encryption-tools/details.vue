<template>
  <div>
    <h1>Hello from NewComponent!</h1>
    <AntModal
      :visible="isModalVisible"
      @update:visible="isModalVisible = $event"
    >
      <template #default>
        <p>This is the content inside the modal.</p>
      </template>
    </AntModal>
    <a-button type="primary" @click="showModal">Show Modal</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AntModal from "@/components/container/AntModal.vue";

export default defineComponent({
  name: "detailsSecretKeyEncryptionTools",
  components: {
    AntModal,
  },
  setup() {
    const isModalVisible = ref(false);

    const showModal = () => {
      isModalVisible.value = true;
    };

    return {
      isModalVisible,
      showModal,
    };
  },
});
</script>

<style scoped></style>
