<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="home-page">
    <AntText>
      <h1>Home Page</h1>
    </AntText>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { dynamicImport } from "@/utils/importUtils";
const components = dynamicImport(["components/container/AntText"]);
export default defineComponent({
  name: "home-page",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AntText: defineAsyncComponent(components["components/container/AntText"]),
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="stylus">
.home-page
  display flex
  justify-content center
  align-items center
  height 100vh
</style>
