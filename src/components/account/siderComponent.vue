<template>
  <div class="py-2 pl-4">
    <div class="bg-white mb-2">
      <router-link
        :to="{ name: 'AccountOverview' }"
        active-class="text-blue-900 font-bold"
        exact-active-class="border-b-1 border-blue-900 font-bold"
        class="text-lg text-left flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
      >
        <CubeTransparentIcon class="w-5 h-5" />{{
          i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.OVERVIEW")
        }}
      </router-link>
    </div>
    <div class="bg-white mb-2">
      <div>
        <div
          @click.stop="dropdownMenuInformation = !dropdownMenuInformation"
          class="text-lg text-left font-semibold flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
        >
          <UserGroupIcon
            class="w-5 h-5"
            :class="
              $route.meta.tag === 'infomationaccount'
                ? 'text-blue-900 font-bold'
                : ''
            "
          />
          <p
            class="flex-1"
            :class="
              $route.meta.tag === 'infomationaccount'
                ? 'text-blue-900 font-bold'
                : ''
            "
          >
            {{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.INFORMATION") }}
          </p>
          <div class="ml-auto pr-2">
            <p v-if="dropdownMenuInformation" class="text-gray-500 text-sm">
              <ChevronUpIcon class="w-3 h-3"></ChevronUpIcon>
            </p>
            <p v-else class="text-gray-500 text-sm">
              <ChevronDownIcon class="w-3 h-3"></ChevronDownIcon>
            </p>
          </div>
        </div>
      </div>
      <ul
        v-if="dropdownMenuInformation"
        class="mt-4 ml-2 mr-2 border-l-2 pl-2 border-gray-200"
      >
        <li
          @click="$router.push({ name: 'AccountInformation' })"
          :class="
            $route.path.includes('account/tab=information')
              ? ' bg-gray-300 bg-opacity-15 text-blue-900 font-bold'
              : ''
          "
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            @click="$router.push({ name: 'AccountInformation' })"
            class="hover:text-gray-700 hover:underline"
            >{{
              i18n.global.t(
                "NAVIGATION_MENU.ACCOUNT_SECTION.PERSONAL_INFORMATION"
              )
            }}</a
          >
        </li>
        <li
          @click="$router.push({ name: 'AccountCalendarWork' })"
          :class="
            $route.path.includes('account/tab=calendar-work')
              ? ' bg-gray-300 bg-opacity-15 text-blue-900 font-bold'
              : ''
          "
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            @click="$router.push({ name: 'AccountCalendarWork' })"
            class="hover:text-gray-700 hover:underline"
            >{{
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.CALENDAR_WORK")
            }}</a
          >
        </li>
        <li
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-700 hover:underline"
            >{{
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.CHANGE_PASSWORD")
            }}</a
          >
        </li>
        <li
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-700 hover:underline"
            >{{
              i18n.global.t(
                "NAVIGATION_MENU.ACCOUNT_SECTION.SECURITY_AND_PRIVACY"
              )
            }}</a
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
        <p class="flex-1">
          {{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.SETTINGS") }}
        </p>
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
            >{{ i18n.global.t("NAVIGATION_MENU.ACCOUNT_SECTION.PROFILE") }}</a
          >
        </li>
        <li
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a href="#" class="text-gray-500 hover:text-gray-700 hover:underline"
            >Security</a
          >
        </li>
        <li
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a href="#" class="text-gray-500 hover:text-gray-700 hover:underline"
            >Notifications</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import i18n from "@/services/i18n";
import {
  CubeTransparentIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.name);

const dropdownMenuInformation = ref(
  route.meta.tag === "infomationaccount" ? true : false
);
const dropdownMenuSettings = ref(
  route.meta.tag === "settingaccount" ? true : false
);
</script>
