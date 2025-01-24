<template>
  <div class="w-full flex">
    <a-layout class="min-h-screen flex">
      <a-layout-sider class="hidden md:block bg-white w-64 shadow-md">
        <siderComponent />
      </a-layout-sider>
      <a-layout class="flex-1">
        <div class="flex flex-wrap justify-between p-2">
          <p
            class="text-blue-900 font-bold text-left border-l-4 border-blue-900"
          >
            &nbsp; {{ $t("nav.account.personalInformation") }}
          </p>
          <p class="">
            <span class="text-blue-900 pr-2 font-mono">{{ user?.email }} </span>
            <span class="bg-blue-900 text-white p-1 font-mono">{{
              getRole()
            }}</span>
          </p>
        </div>
        <a-layout-content class="my-2 bg-gray-300 bg-opacity-10 p-2">
          <div
            class="flex flex-wrap md:flex-none space-x-0 space-y-2 md:space-x-2 md:space-y-0"
          >
            <!-- box left information -->
            <div class="md:w-[400px] w-full bg-white p-4 rounded-sm shadow-md">
              <div class="text-center">
                <a-badge :count="99">
                  <a-avatar shape="square" class="w-24 h-24">
                    <template #icon><UserOutlined class="text-6xl" /></template>
                  </a-avatar>
                </a-badge>
                <div class="mt-2">
                  <span class="pr-1 font-mono text-sm text-blue-900 font-bold"
                    >{{ "Nguyễn văn đạt".toUpperCase() }}
                  </span>
                  <br />
                  <span class="text-gray-500 font-mono"
                    >{{ user?.username }}
                  </span>
                </div>
                <p
                  class="relative p-4 font-mono text-gray-500 mt-1 bg-gray-200 bg-opacity-15"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam nam suscipit magnam culpa doloribus
                  <EditOutlined class="text-gray-400 absolute top-1 right-1" />
                </p>
                <div class="social-media flex space-x-3 mt-2 w-[100px] mx-auto">
                  <FacebookOutlined class="text-xl text-blue-500" />
                  <GithubOutlined class="text-xl text-gray-200" />
                  <TwitterOutlined class="text-xl text-gray-200" />
                </div>
              </div>
              <div class="mt-6"></div>
            </div>
            <div
              class="md:w-[600px] w-full bg-white p-6 rounded-sm shadow-md relative"
            >
              <h3 class="text-xl font-mono font-bold text-blue-900 mb-6">
                Hồ sơ thông tin
              </h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Họ và tên :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >NGUYỄN VĂN ĐẠT</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Địa chỉ :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >123 Đường ABC, Quận 1, TP.HCM</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Số điện thoại :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >0901234567</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Ngày sinh :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >01/01/1990</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Nickname :</span
                  >
                  <span class="text-gray-800 w-2/3 font-mono text-left"
                    >van_a_pro</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Sở thích :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >Đọc sách, Du lịch, Chơi game</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Thời gian tạo :</span
                  >
                  <span class="text-gray-500 font-mono w-2/3 text-left"
                    >2025-01-13 09:43:58</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >Cập nhật lần cuối :</span
                  >
                  <span class="text-gray-500 font-mono w-2/3 text-left"
                    >2025-01-13 09:43:58</span
                  >
                </div>
              </div>
              <EditOutlined
                class="text-blue-900 absolute bottom-2 right-2 text-xl hover:text-2xl hover:text-blue-900"
              />
            </div>
          </div>
        </a-layout-content>

        <a-layout-footer class="bg-gray-300 bg-opacity-10"></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import siderComponent from "@/components/account/siderComponent.vue";
import { User } from "@/models/user";
import { getRole, getUser } from "@/services/auth/authService";
import { ref, onMounted } from "vue";
import {
  UserOutlined,
  LinkOutlined,
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
const user = ref<User | null>(null);
onMounted(async () => {
  user.value = await getUser();
});
</script>

<style scoped></style>
