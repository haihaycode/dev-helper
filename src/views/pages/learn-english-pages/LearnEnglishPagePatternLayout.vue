<template>
  <div class="w-full flex">
    <a-layout class="min-h-screen flex">
      <a-layout-sider class="hidden md:block bg-white w-64 shadow-md">
        <SidebarComponent />
      </a-layout-sider>
      <a-layout class="flex-1">
        <div class="flex flex-wrap justify-between p-2">
          <p
            class="text-blue-900 font-bold text-left border-l-4 border-blue-900"
          >
            &nbsp; {{ title }}
          </p>

          <div class="sm:block md:hidden">
            <NavigateBackComponent :back-to="backTo" />
          </div>
        </div>

        <a-layout-content class="my-2 bg-gray-300 bg-opacity-10 p-2">
          <slot name="content"></slot>
        </a-layout-content>
        <a-layout-footer class="bg-gray-300 bg-opacity-10">
          <slot name="footer"></slot>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import SidebarComponent from "@/components/learn-english/SidebarComponent.vue";
import NavigateBackComponent from "@/components/navigation/NavigateBackComponent.vue";

import { User } from "@/models/user";
import { getUser } from "@/services/auth/authService";
import { ref, onMounted } from "vue";
import { defineProps } from "vue";

const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await getUser();
  // informationProfile.value = await getInformationProfile();
});
defineProps({
  backTo: {
    type: String,
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  footer: {
    type: Object,
    required: false,
  },
});
</script>
<style scoped></style>
