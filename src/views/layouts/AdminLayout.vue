<template>
  <a-layout has-sider>
    <a-layout-sider theme="light">
      <a-menu mode="inline" style="height: 100%; border-right: 0">
        <a-menu-item key="dashboard">
          <router-link to="/admin">Dashboard</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="site-layout">
      <a-layout-header class="header">Admin Panel</a-layout-header>
      <a-layout-content class="admin-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminLayout",
});
</script>

<style lang="stylus" scoped>
.header
  background #1890ff
  color white
  text-align center
  font-size 24px
  padding 10px

.admin-content
  padding 20px
  background-color #f5f5f5
</style>
