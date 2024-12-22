<template>
  <div class="hello-vue">
    <a-card title="Hello, Vue!" style="width: 300px; margin: 0 auto">
      <h1>{{ message }}</h1>
      <p>This is the HelloVue view.</p>
      <a-button type="primary" @click="handleClick">Nhấn vào tôi</a-button>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { message as antMessage } from "ant-design-vue"; // Import message trực tiếp

export default defineComponent({
  name: "HelloVue",
  setup() {
    const message = ref("Xin chào, Thế giới!");

    const handleClick = () => {
      message.value = "Nút đã được nhấn!";
      antMessage.success("Button clicked!"); // Gọi message trực tiếp
    };

    return {
      message,
      handleClick,
    };
  },
});
</script>

<style scoped lang="stylus">
.hello-vue
  display flex
  justify-content center
  align-items center
  height 100vh

a-card
  text-align center

a-button
  margin-top 16px
</style>
