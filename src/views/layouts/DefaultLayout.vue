<template>
  <a-layout>
    <HeaderComponet />
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <FooterComponent />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponet from "@/components/layout/HeaderComponet.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: { HeaderComponet, FooterComponent },
});
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center
  background-color #001529
  padding 0 20px

.logo
  color #fff
  font-size 24px
  font-weight bold
  margin-right 40px

a-menu-item
  font-size 16px

a-menu-item:hover
  background-color #1890ff
  transition background-color 0.3s ease

.content
  background-image url('@/assets/bg/.bg-1.png')
  background-size cover
  background-position center
  background-repeat no-repeat
</style>
