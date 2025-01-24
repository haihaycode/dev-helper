<template>
  <div class="h-screen w-full flex">
    <a-layout class="h-full flex">
      <a-layout-sider class="hidden md:block bg-white w-64 shadow-md">
        <siderComponent />
      </a-layout-sider>
      <a-layout class="flex-1 p-2">
        <a-layout-header class="bg-white"> </a-layout-header>
        <a-layout-content class="my-2 bg-white"></a-layout-content>
        <a-layout-footer class="bg-white"></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
export default {
  name: "AccountPage",
};
</script>

<script setup lang="ts">
import siderComponent from "@/components/account/siderComponent.vue";
</script>

<style scoped></style>
