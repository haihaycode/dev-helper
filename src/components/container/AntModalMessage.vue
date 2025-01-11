<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :title="title"
    :closable="closable"
    @cancel="closeModal"
    class="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg shadow-lg"
  >
    <template #default>
      <div class="p-1">
        <div v-if="banner" class="">
          <img :src="banner" alt="Banner" class="w-full h-40" />
        </div>
        <div class="p-2">
          <h2 class="text-xl text-yellow-700 font-mono">
            {{ title }}
          </h2>
          <p class="text-base text-yellow-600 mb-2">{{ content }}</p>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AntModalMessage",
  props: {
    title: {
      type: String,
      default: "Thông báo",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "",
    },
    closable: {
      type: Boolean,
      default: true,
    },
    banner: {
      type: String,
      default:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/12/background-tet-17.jpg", // Thêm prop banner
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
.ant-modal-body {
  padding: 0px !important;
}
</style>
