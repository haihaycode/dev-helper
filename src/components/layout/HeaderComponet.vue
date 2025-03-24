<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <header class="primary-navbar text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <router-link
        to="/"
        class="logo text-xl font-bold hover:text-blue-100 py-4 tracking-in-expand"
        v-t="'project.name'"
      ></router-link>
      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-4">
        <router-link
          to="/"
          class="primary-text-light hover:text-gray-400 py-4"
          exact-active-class="border-b-2 border-blue-200 font-bold"
          v-t="'nav.home'"
        ></router-link>
        <router-link
          to="/about"
          class="primary-text-light hover:text-gray-400 py-4"
          active-class="text-yellow-500 font-bold"
          exact-active-class="border-b-2 border-blue-200"
          v-t="'nav.about'"
        ></router-link>
        <router-link
          to="/t/tools"
          class="primary-text-light hover:text-gray-400 py-4"
          active-class="text-yellow-500 font-bold"
          exact-active-class="border-b-2 border-blue-200"
          v-t="'nav.tool'"
        ></router-link>
        <router-link
          to="/contact"
          class="primary-text-light hover:text-gray-400 py-4"
          active-class="text-yellow-500 font-bold"
          exact-active-class="border-b-2 border-blue-200"
          v-t="'nav.contact'"
        ></router-link>

        <!-- User Info Menu -->
        <a-dropdown v-if="user" :trigger="['click']">
          <p
            :class="
              $route.path.includes('account')
                ? 'border-b-2 border-gray-100 font-bold'
                : ''
            "
            class="ant-dropdown-link flex items-center py-4 hover:text-gray-400 hover:border-b-2 border-blue-200 hover:cursor-pointer"
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
                    {{ $t("nav.account.description") }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1" @click="$router.push('/c/setting')">
                <a-anchor-link>
                  <div class="flex items-center">
                    <SettingOutlined /> &nbsp;
                    {{ $t("nav.setting.description") }}
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
                    {{ $t("nav.logout") }}
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
          active-class="text-blue-100"
          exact-active-class="border-b-2 border-blue-200"
        >
          {{ $t("nav.login") + " / " + $t("nav.register") }}
        </router-link>
      </nav>
      <!-- Mobile Menu Toggle Button -->
      <a-button class="md:hidden" type="text" @click="showDrawer = true">
        <MenuOutlined class="text-white" />
      </a-button>
    </div>
    <!-- Mobile Menu Drawer -->
    <a-drawer
      placement="right"
      closable
      :visible="showDrawer"
      @close="showDrawer = false"
    >
      <nav class="flex flex-col space-y-4">
        <a-dropdown v-if="user">
          <a
            class="ant-dropdown-link flex items-center py-4 hover:text-gray-400 border-b-2 border-yellow-500"
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
                <a-anchor-link :title="user?.email">
                  <div class="flex items-center">
                    <UserOutlined /> &nbsp;
                    {{ $t("nav.account.description") }}
                  </div>
                </a-anchor-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1" @click="$router.push('/c/setting')">
                <a-anchor-link>
                  <div class="flex items-center">
                    <SettingOutlined /> &nbsp;
                    {{ $t("nav.setting.description") }}
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
                    {{ $t("nav.logout") }}
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
          active-class="text-yellow-500"
          exact-active-class="border-b-2 border-yellow-500"
        >
          {{ $t("nav.login") + " / " + $t("nav.register") }}
        </router-link>
        <router-link
          to="/"
          @click.native="showDrawer = false"
          v-t="'nav.home'"
        ></router-link>
        <router-link
          to="/about"
          @click.native="showDrawer = false"
          active-class="border-l-4 pl-2 border-yellow-500"
          exact-active-class="border-l-4 pl-2 border-yellow-500"
          v-t="'nav.about'"
        ></router-link>
        <router-link
          to="/t/tools"
          @click.native="showDrawer = false"
          active-class="border-l-4 pl-2 border-yellow-500"
          exact-active-class="border-l-4 pl-2 border-yellow-500"
          v-t="'nav.tool'"
        ></router-link>
        <router-link
          to="/contact"
          @click.native="showDrawer = false"
          active-class="border-l-4 pl-2 border-yellow-500"
          exact-active-class="border-l-4 pl-2 border-yellow-500"
          v-t="'nav.contact'"
        ></router-link>
      </nav>
    </a-drawer>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { getCurrentUser } from "@/api/userApi";
import { User } from "@/models/user";
import { effect } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
  },
  setup() {
    const showDrawer = ref(false);
    const showDropdown = ref(false);
    const store = useStore();
    const user = ref<User | null>(null);

    const handleGetCurrentUser = async () => {
      try {
        const userResponse = await getCurrentUser();
        user.value = userResponse.data || null;
      } catch (error) {
        console.error(error);
        user.value = null;
      }
    };

    effect(() => {
      const token = store.getters["auth/token"];
      if (token) {
        handleGetCurrentUser();
      }
    });
    const logout = () => {
      user.value = null;
      store.dispatch("auth/logout");
    };

    return {
      showDrawer,
      user,
      handleGetCurrentUser,
      logout,
      showDropdown,
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
