<template>
    <div class="hello-vue">
        <a-card title="Hello, Vue!" style="width: 300px; margin: 0 auto">
            <p>This is the HelloVue view.</p>
            <a-button type="primary" @click="handleClick">Click Me</a-button>
        </a-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { message } from "ant-design-vue"; // Import message trực tiếp

export default defineComponent({
    name: "HelloVue",
    methods: {
        handleClick() {
            message.success("Button clicked!"); // Gọi message trực tiếp
        },
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
