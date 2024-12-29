<template>
  <div id="app">
    <Loading :visible="loading" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { dynamicImport } from "@/utils/importUtils";
import { useStore } from "vuex";
const components = dynamicImport(["components/container/AntLoading"]);

export default defineComponent({
  name: "App",
  components: {
    Loading: defineAsyncComponent(
      components["components/container/AntLoading"]
    ),
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const isLoadingGet = computed(() => store.getters["loading/isLoadingGet"]);
    console.log(isLoadingGet.value);

    router.beforeEach((to, from, next) => {
      loading.value = true;
      next();
    });

    router.afterEach(() => {
      loading.value = false;
    });

    // router.beforeEach((to, from, next) => {
    //   store.commit("loading/SET_LOADING_GET", true); // Cập nhật trạng thái loading khi chuyển hướng
    //   const isLoadingGet = computed(
    //     () => store.getters["loading/isLoadingGet"]
    //   );
    //   console.log(isLoadingGet.value);
    //   next();
    // });

    // router.afterEach(() => {
    //   store.commit("loading/SET_LOADING_GET", false); // Kết thúc loading khi chuyển hướng xong
    //   const isLoadingGet = computed(
    //     () => store.getters["loading/isLoadingGet"]
    //   );
    //   console.log(isLoadingGet.value);
    // });

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
