<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white rounded-lg shadow-lg p-6 z-10 max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-center text-yellow-600">
          {{ title }}
        </h2>
        <CloseOutlined
          @click="closeModal"
          class="cursor-pointer text-gray-600 hover:text-gray-800"
        />
      </div>
      <p class="text-gray-800 text-center mb-4">{{ content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { CloseOutlined } from "@ant-design/icons-vue";

export default {
  name: "CustomModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
  },
  components: {
    CloseOutlined,
  },
};
</script>
