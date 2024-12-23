<template>
  <div id="app">
    <Loading :visible="loading" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { dynamicImport } from "@/utils/importUtils";

const components = dynamicImport(["components/container/AntLoading"]);

export default defineComponent({
  name: "App",
  components: {
    Loading: defineAsyncComponent(
      components["components/container/AntLoading"]
    ),
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();

    router.beforeEach((to, from, next) => {
      loading.value = true;
      next();
    });

    router.afterEach(() => {
      loading.value = false;
    });

    return {
      loading,
    };
  },
});
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
