<template>
  <div class="h-screen w-full flex">
    <a-layout class="h-full flex">
      <a-layout-sider class="hidden md:block bg-white w-64 shadow-md">
        <div class="py-2 pl-4">
          <div class="bg-white mb-2">
            <h2
              class="text-lg text-left font-semibold flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              <CubeTransparentIcon class="w-5 h-5" />Dashboard
            </h2>
          </div>
          <div class="bg-white mb-2">
            <h2
              @click="dropdownMenuCustomers = !dropdownMenuCustomers"
              class="text-lg text-left font-semibold flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              <UserGroupIcon class="w-5 h-5" />
              <p class="flex-1">Customers</p>
              <div class="ml-auto pr-2">
                <p v-if="dropdownMenuCustomers" class="text-gray-500 text-sm">
                  <ChevronUpIcon class="w-3 h-3"></ChevronUpIcon>
                </p>
                <p v-else class="text-gray-500 text-sm">
                  <ChevronDownIcon class="w-3 h-3"></ChevronDownIcon>
                </p>
              </div>
            </h2>
            <ul
              v-if="dropdownMenuCustomers"
              class="mt-4 ml-2 mr-2 border-l-2 pl-2 border-gray-200"
            >
              <li
                class="p-2 mb-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Badges</a
                >
              </li>
              <li
                class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Customers Logs</a
                >
              </li>
              <li
                class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Gift Vouchers</a
                >
              </li>
            </ul>
          </div>
          <div class="bg-white mb-2">
            <h2
              @click="dropdownMenuSettings = !dropdownMenuSettings"
              class="text-lg text-left font-semibold flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              <Cog6ToothIcon class="w-5 h-5" />
              <p class="flex-1">Settings</p>
              <div class="ml-auto pr-2">
                <p v-if="dropdownMenuSettings" class="text-gray-500 text-sm">
                  <ChevronUpIcon class="w-3 h-3"></ChevronUpIcon>
                </p>
                <p v-else class="text-gray-500 text-sm">
                  <ChevronDownIcon class="w-3 h-3"></ChevronDownIcon>
                </p>
              </div>
            </h2>
            <ul
              v-if="dropdownMenuSettings"
              class="mt-4 ml-2 mr-2 border-l-2 pl-2 border-gray-200"
            >
              <li
                class="p-2 mb-2 text-left bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Profile</a
                >
              </li>
              <li
                class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Security</a
                >
              </li>
              <li
                class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
              >
                <a
                  href="#"
                  class="text-gray-500 hover:text-gray-700 hover:underline"
                  >Notifications</a
                >
              </li>
            </ul>
          </div>
        </div>
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
import {
  CubeTransparentIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

const dropdownMenuCustomers = ref(false);
const dropdownMenuSettings = ref(false);
</script>

<style scoped></style>
