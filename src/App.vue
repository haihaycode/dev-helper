<template>
  <div id="app">
    <a-spin
      :spinning="isLoadingGet || loading"
      size="large"
      wrapperClassName="spin-wrapper"
    >
      <router-view />
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
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

    return {
      loading,
      isLoadingGet,
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
