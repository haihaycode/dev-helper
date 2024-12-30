<template>
  <a-layout>
    <a-layout-sider
      :collapsed="isSidebarCollapsed"
      :collapsed-width="0"
      :width="sidebarWidth"
      class="sider"
      style="background-color: #fafafa"
    >
      <a-menu
        theme="light"
        mode="inline"
        :default-selected-keys="['1']"
        :selected-keys="[selectedKey]"
      >
        <a-row :gutter="16">
          <a-col :xs="0" :sm="0" :md="24" :lg="24">
            <a-input
              v-model="searchQuery"
              placeholder="Search..."
              size="large"
              style="
                margin-bottom: 10px;
                border-radius: 0px;
                border-bottom: 2px solid #1890ff;
                box-shadow: none;
              "
            >
              <template #suffix>
                <SearchOutlined />
              </template>
            </a-input>
          </a-col>
        </a-row>
        <a-row justify="end">
          <a-col flex="none" span="4" :xs="24" :sm="24" :md="24" :lg="0">
            <MenuOutlined
              @click="toggleSidebar"
              v-if="isSidebarCollapsed"
              style="font-size: 24px; padding: 10px"
            />
            <CloseOutlined
              @click="toggleSidebar"
              v-if="!isSidebarCollapsed"
              style="font-size: 24px; padding: 10px"
            />
          </a-col>
        </a-row>
        <a-menu-item
          @click="setToolType(item.id)"
          v-for="item in filteredMenuItems"
          :key="item.key"
        >
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
          <a-col
            style="padding: 2px 20px"
            :span="4"
            flex="none"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="0"
          >
            <AlignLeftOutlined
              @click="toggleSidebar"
              v-if="isSidebarCollapsed"
              style="font-size: 24px"
            />
            <CloseOutlined
              @click="toggleSidebar"
              v-if="!isSidebarCollapsed"
              style="font-size: 24px"
            />
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
import {
  MenuOutlined,
  CloseOutlined,
  AlignLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import toolsData from "@/data/tools/type.json"; // Import your JSON file
import { useStore } from "vuex";
interface Tool {
  name: string;
  idtoolsType: string;
  image: string;
  description: string;
}

export default defineComponent({
  name: "DefaultLayout",
  components: {
    MenuOutlined,
    CloseOutlined,
    AlignLeftOutlined,
    SearchOutlined,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const isSidebarCollapsed = ref(false);
    const searchQuery = ref("");
    const sidebarWidth = ref("400px");

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
    const updateSidebarWidth = () => {
      if (window.innerWidth <= 768) {
        sidebarWidth.value = "100%";
      } else {
        sidebarWidth.value = "300px";
      }
    };

    onMounted(() => {
      updateSidebarWidth();
      window.addEventListener("resize", updateSidebarWidth);
      updateSidebarState();
      window.addEventListener("resize", updateSidebarState);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateSidebarWidth);
      window.removeEventListener("resize", updateSidebarState);
    });

    const filteredMenuItems = computed(() => {
      return toolsData
        .filter((tool: Tool) =>
          t(tool.name).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        .map((tool: Tool) => ({
          key: tool.idtoolsType,
          name: tool.name,
          image: tool.image,
          id: tool.idtoolsType,
        }));
    });
    const selectedKey = computed(() => store.state.tool.toolType);
    const setToolType = (idtoolsType: string) => {
      store.dispatch("tool/setToolType", idtoolsType); // Dispatch action
    };

    return {
      t,
      isSidebarCollapsed,
      toggleSidebar,
      searchQuery,
      filteredMenuItems,
      sidebarWidth,
      setToolType,
      selectedKey,
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
