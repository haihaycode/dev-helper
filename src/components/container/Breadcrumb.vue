<template>
  <a-breadcrumb>
    <a-breadcrumb-item
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
    >
      <component :is="item.icon" v-if="item.icon" />
      <span v-if="item.text">{{ t(item.text) }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "BreadcrumbComponent",
  methods: {
    t(key: string) {
      return useI18n().t(key);
    },
  },
  props: {
    items: {
      type: Array as () => Array<{
        href?: string;
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
});
</script>
