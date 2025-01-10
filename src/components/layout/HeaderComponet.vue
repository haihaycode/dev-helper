<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <header class="bg-gray-800 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <router-link
        to="/"
        class="logo text-xl font-bold hover:text-gray-400"
        v-t="'project.name'"
      ></router-link>
      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-4">
        <router-link
          to="/"
          class="hover:text-gray-400"
          exact-active-class="border-b-2 border-yellow-500"
          v-t="'nav.home'"
        ></router-link>
        <router-link
          to="/about"
          class="hover:text-gray-400"
          active-class="text-yellow-500"
          exact-active-class="border-b-2 border-yellow-500"
          v-t="'nav.about'"
        ></router-link>
        <router-link
          to="/t/tools"
          class="hover:text-gray-400"
          active-class="text-yellow-500"
          exact-active-class="border-b-2 border-yellow-500"
          v-t="'nav.tool'"
        ></router-link>
        <router-link
          to="/contact"
          class="hover:text-gray-400"
          active-class="text-yellow-500"
          exact-active-class="border-b-2 border-yellow-500"
          v-t="'nav.contact'"
        ></router-link>
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
        <router-link
          to="/"
          @click.native="showDrawer = false"
          active-class="border-l-4 pl-2 border-yellow-500"
          exact-active-class="border-l-4 pl-2 border-yellow-500"
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
import { MenuOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    MenuOutlined,
  },
  setup() {
    const showDrawer = ref(false);

    return {
      showDrawer,
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
