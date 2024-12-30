<template>
  <a-layout>
    <a-layout-sider
      :collapsed="isSidebarCollapsed"
      :collapsed-width="0"
      width="200px"
      class="sider"
      style="background-color: #f3f6f4"
    >
      <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
        <a-input-search
          v-model="searchQuery"
          placeholder="Search..."
          enter-button
          size="large"
          style="
            margin: 0px 0px;
            margin-bottom: 10px;
            border-radius: 0px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          "
        />
        <a-menu-item v-for="item in filteredMenuItems" :key="item.key">
          <a-avatar
            size="small"
            :src="require('@/assets/tools/img/' + item.id + '.png')"
          />
          {{ $t(item.name) }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="background: white">
      <a-layout-content class="content">
        <a-row justify="start">
          <a-col :span="4" flex="none">
            <a-button type="ghost" @click="toggleSidebar">
              Tools
              <MenuOutlined v-if="isSidebarCollapsed" />
              <CloseOutlined v-if="!isSidebarCollapsed" />
            </a-button>
          </a-col>
        </a-row>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useI18n } from "vue-i18n";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons-vue";
import toolsData from "@/data/tools/tools.json"; // Import your JSON file

interface Tool {
  name: string;
  idtools: string;
  image: string;
  description: string;
}

export default defineComponent({
  name: "DefaultLayout",
  components: {
    MenuOutlined,
    CloseOutlined,
  },
  setup() {
    const { t } = useI18n();
    const isSidebarCollapsed = ref(false);
    const searchQuery = ref("");

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    const updateSidebarState = () => {
      if (window.innerWidth <= 768) {
        isSidebarCollapsed.value = true;
      } else {
        isSidebarCollapsed.value = false;
      }
    };

    onMounted(() => {
      updateSidebarState();
      window.addEventListener("resize", updateSidebarState);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateSidebarState);
    });

    const filteredMenuItems = computed(() => {
      return toolsData
        .filter((tool: Tool) =>
          t(tool.name).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .map((tool: Tool) => ({
          key: tool.idtools,
          name: tool.name,
          image: tool.image,
          id: tool.idtools,
        }));
    });

    return {
      t,
      isSidebarCollapsed,
      toggleSidebar,
      searchQuery,
      filteredMenuItems,
    };
  },
});
</script>

<style lang="stylus" scoped>


a-menu-item:hover {
  background-color: #1890ff;
  transition: background-color 0.3s ease;
}

.content {
  background-image: url('@/assets/bg/.bg-1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding 2px
  overflow: auto;
}

.sider {
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
