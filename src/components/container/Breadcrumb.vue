<template>
  <a-breadcrumb class="justify-start">
    <a-breadcrumb-item
      class="cursor-pointer hover:underline hover:text-blue-500"
      v-for="(item, index) in items"
      :key="index"
      @click="navigateTo(item)"
    >
      <component :is="item.icon" v-if="item.icon" />
      <span v-if="item.text">{{ t(item.text) }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "BreadcrumbComponent",
  props: {
    items: {
      type: Array as () => Array<{
        path?: string;
        icon?: string | object;
        text?: string;
      }>,
      required: true,
    },
  },
  components: {
    HomeOutlined,
    UserOutlined,
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();

    const navigateTo = (item: { path?: string }) => {
      if (item.path) {
        router.push({ name: item.path });
      }
    };

    return {
      t,
      navigateTo,
    };
  },
});
</script>
