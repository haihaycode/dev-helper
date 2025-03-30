<template>
  <div id="app">
    <a-spin
      :spinning="isLoadingGet || loading"
      size="large"
      wrapperClassName="spin-wrapper"
      class="min-h-screen"
    >
      <!-- Thêm hiệu ứng chờ với transition -->
      <transition name="fade-wait" mode="out-in">
        <router-view />
      </transition>
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
    const store = useStore(); // Vuex store
    const router = useRouter(); // Vue router
    const loading = ref(false); // Trạng thái loading cục bộ

    const isLoadingGet = computed(() => store.getters["loading/isLoadingGet"]); // Lấy trạng thái loading từ Vuex

    // Trước khi chuyển route
    router.beforeEach((to, from, next) => {
      loading.value = true; // Bật trạng thái loading
      next();
    });

    // Sau khi chuyển route
    router.afterEach(() => {
      setTimeout(() => {
        loading.value = false; // Tắt trạng thái loading sau 0,3 giây
      }, 300); // Đặt thời gian chờ là 0,3 giây
    });

    return {
      loading,
      isLoadingGet,
    };
  },
});
</script>

<style>
/* Hiệu ứng chờ (fade + delay) với CSS thuần */
.fade-wait-enter-active,
.fade-wait-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-wait-enter {
  opacity: 0;
  transform: scale(0.95); /* Co nhẹ phần tử vào */
}

.fade-wait-leave-to {
  opacity: 0;
  transform: scale(0.95); /* Co nhẹ phần tử ra */
}

/* Style cho toàn ứng dụng */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
