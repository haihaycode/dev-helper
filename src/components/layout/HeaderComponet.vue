<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <header
    class="bg-gradient-to-br from-blue-600 to-gray-600 text-white shadow-md"
    :class="{
      'bg-gradient-to-br from-blue-500 to-gray-600':
        $route.meta?.name === 'Direc',
    }"
  >
    <div
      class="container mx-auto flex justify-between items-center px-4 font-bold"
    >
      <router-link
        to="/"
        class="logo text-xl font-bold hover:text-gray-400 py-4 tracking-in-expand"
      >
        {{ i18n.global.t("PROJECT.NAME") }}
      </router-link>
      <nav class="hidden md:flex space-x-4">
        <router-link
          to="/"
          class="hover:text-gray-400 py-4"
          exact-active-class="border-b-2 border-white font-bold"
        >
          {{ i18n.global.t("NAVIGATION_MENU.HOME_LINK") }}
        </router-link>
        <router-link
          to="/l/english"
          class="hover:text-gray-400 py-4"
          active-class="border-b-2 border-white"
          exact-active-class="border-b-2 border-white"
        >
          {{
            i18n.global.t(
              "NAVIGATION_MENU.LANGUAGE_LEARNING_SECTION.ENGLISH_SUBMENU.DESCRIPTION"
            )
          }}
        </router-link>
        <a-dropdown v-if="user" :trigger="['click']">
          <p
            :class="
              $route.path.includes('account')
                ? 'border-b-2 border-gray-100 font-bold'
                : ''
            "
            class="ant-dropdown-link flex items-center py-4 hover:text-gray-400 hover:border-b-2 border-white hover:cursor-pointer"
          >
            <UserOutlined class="" /> &nbsp;
            {{ user.username }}
          </p>
          <template #overlay>
            <a-menu>
              <a-menu-item
                key="0"
                @click="$router.push({ name: 'AccountOverview' })"
              >
                <a-anchor-link :title="user?.email" @click.prevent>
                  <div class="flex items-center">
                    <UserOutlined /> &nbsp;
                    {{
                      i18n.global.t(
                        "NAVIGATION_MENU.ACCOUNT_DROPDOWN.INFORMATION_PROFILE"
                      )
                    }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1" @click="$router.push('/c/setting')">
                <a-anchor-link>
                  <div class="flex items-center">
                    <SettingOutlined /> &nbsp;
                    {{
                      i18n.global.t("NAVIGATION_MENU.SETTING_PAGE.DESCRIPTION")
                    }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-item
                key="2"
                class="hover:text-gray-400 flex items-center"
                @click="logout"
              >
                <a-anchor-link>
                  <div class="flex items-center">
                    <LogoutOutlined /> &nbsp;
                    {{ i18n.global.t("NAVIGATION_MENU.LOGOUT_LINK") }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <router-link
          v-if="!user"
          to="/c/login"
          class="hover:text-gray-400 py-4"
          active-class="text-white"
          exact-active-class="border-b-2 border-white"
        >
          {{ i18n.global.t("NAVIGATION_MENU.LOGIN_LINK") }} /
          {{ i18n.global.t("NAVIGATION_MENU.REGISTER_LINK") }}
        </router-link>
      </nav>
      <MenuOutlined
        class="text-white text-2xl md:hidden flex items-center"
        @click="showDrawer = true"
      />
    </div>
    <a-drawer
      placement="right"
      closable
      :visible="showDrawer"
      @close="showDrawer = false"
    >
      <nav class="flex flex-col space-y-4">
        <a-dropdown v-if="user">
          <a
            class="ant-dropdown-link flex items-center py-4 hover:text-gray-400 border-b-2 border-white-700"
            @click.prevent
          >
            <UserOutlined /> &nbsp;
            {{ user.username }}
          </a>

          <template #overlay>
            <a-menu>
              <a-menu-item
                key="0"
                @click="$router.push({ name: 'MobileInfoLayout' })"
              >
                <a-anchor-link class="hover:text-gray-400" :title="user?.email">
                  <div class="flex items-center">
                    <UserOutlined /> &nbsp;
                    {{
                      i18n.global.t(
                        "NAVIGATION_MENU.ACCOUNT_DROPDOWN.INFORMATION_PROFILE"
                      )
                    }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1" @click="$router.push('/c/setting')">
                <a-anchor-link>
                  <div class="flex items-center">
                    <SettingOutlined /> &nbsp;
                    {{
                      i18n.global.t("NAVIGATION_MENU.SETTING_PAGE.DESCRIPTION")
                    }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-item
                key="2"
                class="hover:text-gray-400 flex items-center"
                @click="logout"
              >
                <a-anchor-link>
                  <div class="flex items-center">
                    <LogoutOutlined /> &nbsp;
                    {{ i18n.global.t("NAVIGATION_MENU.LOGOUT_LINK") }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <router-link
          @click="showDrawer = false"
          v-if="!user"
          to="/c/login"
          class="hover:text-gray-400 py-4"
          active-class="text-blue-500"
          exact-active-class="border-b-2 border-white-700"
        >
          {{ i18n.global.t("NAVIGATION_MENU.LOGIN_LINK") }} /
          {{ i18n.global.t("NAVIGATION_MENU.REGISTER_LINK") }}
        </router-link>
        <router-link to="/" @click.native="showDrawer = false">
          {{ i18n.global.t("NAVIGATION_MENU.HOME_LINK") }}
        </router-link>
        <router-link
          to="/l/english/tab=mobile"
          @click.native="showDrawer = false"
          active-class="border-l-4 pl-2 border-blue-500"
          exact-active-class="border-l-4 pl-2  border-white-700"
        >
          {{
            i18n.global.t(
              "NAVIGATION_MENU.LANGUAGE_LEARNING_SECTION.ENGLISH_SUBMENU.DESCRIPTION"
            )
          }}
        </router-link>
      </nav>
    </a-drawer>
  </header>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { User } from "@/models/user";
import { effect } from "vue";
import { useRoute } from "vue-router";
import i18n from "@/services/i18n";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
  },
  setup() {
    const route = useRoute();
    const showDrawer = ref(false);
    const showDropdown = ref(false);
    const store = useStore();
    const user = ref<User | null>(null);

    const isDirecRoute = computed(() => route.meta?.name === "Direc");

    effect(() => {
      const token = store.getters["auth/token"];
      if (token) {
        user.value = store.getters["auth/user"];
      }
    });
    const logout = () => {
      user.value = null;
      store.dispatch("auth/logout");
    };

    return {
      showDrawer,
      user,
      logout,
      i18n,
      showDropdown,
      isDirecRoute,
    };
  },
});
</script>

<style scoped>
.logo {
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
