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
            <a-tag color="#3b5999" class="bg-blue-900 text-white font-mono">
              {{ getRole() }}
            </a-tag>
          </p>
        </div>

        <a-layout-content class="my-2 bg-gray-300 bg-opacity-10 p-2">
          <div
            class="infomation flex flex-wrap md:flex-none space-x-0 space-y-2 md:space-x-2 md:space-y-0 mb-2"
          >
            <!-- box left information -->
            <div
              class="md:w-[400px] w-full bg-white bg-opacity-80 p-4 rounded-sm shadow-md"
            >
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
                  <a-popover title="Facebook" trigger="click">
                    <template #content>
                      <a-input
                        size="small"
                        class="hover:border-blue-900 focus:border-blue-900 focus:outline-none focus:ring-0 focus:shadow-none focus:bg-amber-900 border-blue-900 font-mono"
                      >
                        <template #suffix>
                          <LinkOutlined class="text-xl text-blue-900 pb-2" />
                        </template>
                      </a-input>
                    </template>
                    <FacebookOutlined class="text-xl text-blue-900" />
                  </a-popover>

                  <GithubOutlined class="text-xl text-gray-200" />
                  <TwitterOutlined class="text-xl text-gray-200" />
                </div>
              </div>
              <div class="mt-6"></div>
            </div>
            <div
              class="md:w-[calc(100%-410px)] w-full bg-white bg-opacity-80 p-6 rounded-sm shadow-md relative"
            >
              <h3
                class="text-xl text-left underline font-mono font-bold text-blue-900 mb-6"
              >
                I.{{ $t("nav.account.informationProfile").toUpperCase() }}
              </h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.name") }} :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >NGUYỄN VĂN ĐẠT</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.address") }} :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >123 Đường ABC, Quận 1, TP.HCM</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left">
                    {{ $t("nav.account.profile.phone") }} :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >0901234567</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.dob") }} :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >01/01/1990</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.nickname") }} :</span
                  >
                  <span class="text-gray-800 w-2/3 font-mono text-left"
                    >van_a_pro</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.hobbies") }} :</span
                  >
                  <span class="text-gray-800 font-mono w-2/3 text-left"
                    >Đọc sách, Du lịch, Chơi game</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.createdTime") }} :</span
                  >
                  <span class="text-gray-500 font-mono w-2/3 text-left"
                    >2025-01-13 09:43:58</span
                  >
                </div>
                <div class="flex items-start">
                  <span class="font-semibold text-gray-600 w-1/3 text-left"
                    >{{ $t("nav.account.profile.updatedTime") }} :</span
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
          <div
            class="Activity flex flex-wrap md:flex-none space-x-0 space-y-2 md:space-x-2 md:space-y-0"
          >
            <div class="md:w-[400px] w-full p-0 rounded-sm relative"></div>
            <div
              class="md:w-[calc(100%-410px)] w-full bg-white bg-opacity-80 p-6 rounded-sm shadow-md relative"
            >
              <h3
                class="text-xl text-left underline font-mono font-bold text-blue-900 mb-6"
              >
                II.{{ $t("nav.account.historyActivity").toUpperCase() }}
              </h3>
              <div class="space-y-4 content">
                <a-timeline>
                  <a-timeline-item
                    v-for="index in 5"
                    :key="index"
                    class="text-left"
                    color="rgb(30 58 138)"
                  >
                    <span class="font-mono">
                      Create a services site 2015-09-01 - Event</span
                    >
                    {{ index }}
                  </a-timeline-item>
                </a-timeline>
                <a-pagination
                  size="small"
                  :total="100"
                  class="custom-pagination"
                />
              </div>
            </div>
          </div>
        </a-layout-content>
        <a-layout-footer class="bg-gray-300 bg-opacity-10"> </a-layout-footer>
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
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons-vue";
import { BellAlertIcon, ListBulletIcon } from "@heroicons/vue/24/outline";

const user = ref<User | null>(null);
onMounted(async () => {
  user.value = await getUser();
});
</script>
<style scoped>
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
