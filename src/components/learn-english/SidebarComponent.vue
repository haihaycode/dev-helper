<template>
  <div class="py-2 pl-4">
    <div class="bg-white mb-2">
      <router-link
        :to="{ name: 'LearnEnglishOverview' }"
        active-class="text-blue-900 font-bold"
        exact-active-class="border-b-1 border-blue-900 font-bold"
        class="text-lg text-left flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
      >
        <CubeTransparentIcon class="w-5 h-5" />{{
          i18n.global.t("NAVIGATION_MENU.ACCOUNT_DROPDOWN.OVERVIEW")
        }}
      </router-link>
    </div>
    <div class="bg-white mb-2">
      <div>
        <div
          @click.stop="dropdownMenuVocabulary = !dropdownMenuVocabulary"
          class="text-lg text-left font-semibold flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
        >
          <ClipboardDocumentListIcon
            class="w-5 h-5"
            :class="
              $route.meta.tag === 'vocabulary' ? 'text-blue-900 font-bold' : ''
            "
          />
          <p
            class="flex-1"
            :class="
              $route.meta.tag === 'vocabulary' ? 'text-blue-900 font-bold' : ''
            "
          >
            {{
              i18n.global.t(
                "NAVIGATION_MENU.LANGUAGE_LEARNING_SECTION.ENGLISH_SUBMENU.VOCABULARY"
              )
            }}
          </p>
          <div class="ml-auto pr-2">
            <p v-if="dropdownMenuVocabulary" class="text-gray-500 text-sm">
              <ChevronUpIcon class="w-3 h-3"></ChevronUpIcon>
            </p>
            <p v-else class="text-gray-500 text-sm">
              <ChevronDownIcon class="w-3 h-3"></ChevronDownIcon>
            </p>
          </div>
        </div>
      </div>
      <ul
        v-if="dropdownMenuVocabulary"
        class="mt-4 ml-2 mr-2 border-l-2 pl-2 border-gray-200"
      >
        <li
          @click="$router.push({ name: 'LearnEnglishListVocabulary' })"
          :class="
            $route.path.includes('english/tab=list-vocabulary')
              ? ' bg-gray-300 bg-opacity-15 text-blue-900 font-bold'
              : ''
          "
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            @click="$router.push({ name: 'LearnEnglishListVocabulary' })"
            class="hover:text-gray-700 hover:underline"
            >{{
              i18n.global.t(
                "NAVIGATION_MENU.LANGUAGE_LEARNING_SECTION.ENGLISH_SUBMENU.LIST_VOCABULARY"
              )
            }}</a
          >
        </li>
        <li
          @click="$router.push({ name: 'ListNotePage' })"
          :class="
            $route.path.includes('english/tab=notes')
              ? ' bg-gray-300 bg-opacity-15 text-blue-900 font-bold'
              : ''
          "
          class="p-2 mb-2 text-left rounded-md hover:bg-gray-200 hover:cursor-pointer hover:text-gray-700"
        >
          <a
            @click="$router.push({ name: 'ListNotePage' })"
            class="hover:text-gray-700 hover:underline"
            >{{ i18n.global.t("NOTE_SECTION.TITLE") }}</a
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
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_DROPDOWN.CALENDAR_WORK")
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
              i18n.global.t("NAVIGATION_MENU.ACCOUNT_DROPDOWN.CHANGE_PASSWORD")
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
                "NAVIGATION_MENU.ACCOUNT_DROPDOWN.SECURITY_AND_PRIVACY"
              )
            }}</a
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
  ClipboardDocumentListIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.name);

const dropdownMenuVocabulary = ref(
  route.meta.tag === "vocabulary" ? true : false
);
</script>
