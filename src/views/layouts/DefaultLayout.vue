<template>
  <a-layout>
    <HeaderComponet />
    <a-layout-content class="">
      <router-view />
    </a-layout-content>
    <LanguageSelectorComponent />
    <FooterComponent />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponet from "@/components/layout/HeaderComponet.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
import LanguageSelectorComponent from "@/components/setting-locale-pages/LanguageSelectorComponent.vue";
export default defineComponent({
  name: "DefaultLayout",
  components: { HeaderComponet, FooterComponent, LanguageSelectorComponent },
});
</script>
<style>
.ant-layout {
  background: linear-gradient(
    to bottom right,
    #eaedf2,
    rgba(136, 181, 250, 0.183)
  ) !important;
}
</style>
