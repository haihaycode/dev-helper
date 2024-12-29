<template>
  <a-layout-footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <p>© 2024 DevHelper. All rights reserved.</p>
      </div>
      <div class="footer-right">
        <qrcode-vue
          value="https://github.com/haihaycode/dev-helper"
          :size="50"
          :level="'L'"
          :background="'white'"
          :margin="2"
        />
      </div>
    </div>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QrcodeVue from "qrcode.vue";

export default defineComponent({
  name: "FooterComponent",
  components: {
    QrcodeVue,
  },
});
</script>

<style scoped lang="stylus">
.footer
  background-color #001529
  color white
  text-align center
  padding 20px 0

.footer-content
  display flex
  justify-content space-between
  align-items center
  max-width 1200px
  margin 0 auto

.footer-left
  flex 1
  margin-left 20px

.footer-right
  flex 1
  display flex
  justify-content flex-end
  margin 0px 10px
</style>
