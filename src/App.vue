<template>
  <div id="app">
    <Suspense>
      <LoadingSpinCustom :loading="loading">
        <transition name="fade-wait" mode="out-in">
          <router-view />
        </transition>
      </LoadingSpinCustom>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadingSpinCustom from "./components/container/LoadingSpinCustom.vue";
const router = useRouter();
const loading = ref(false);
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    loading.value = false;
  }, 10);
});
</script>

<style>
.fade-wait-enter-active,
.fade-wait-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-wait-enter {
  opacity: 0;
  transform: scale(0.95);
}

.fade-wait-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
