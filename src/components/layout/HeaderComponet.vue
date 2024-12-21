<template>
  <AntHeader class="header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo" v-t="'project.name'"></div>
      <!-- Desktop Menu -->
      <AntMenu
        mode="horizontal"
        theme="dark"
        class="desktop-menu"
        :default-selected-keys="['home']"
      >
        <AntMenuItem key="home">
          <router-link to="/" v-t="'nav.home'"></router-link>
        </AntMenuItem>
        <AntMenuItem key="about">
          <router-link to="/about" v-t="'nav.about'"></router-link>
        </AntMenuItem>
        <AntMenuItem key="tool">
          <router-link to="/tool" v-t="'nav.tool'"></router-link>
        </AntMenuItem>
        <AntMenuItem key="contact">
          <router-link to="/contact" v-t="'nav.contact'"></router-link>
        </AntMenuItem>
      </AntMenu>
      <!-- Mobile Menu Toggle Button -->
      <AntButton
        class="mobile-menu-button"
        type="text"
        @click="showDrawer = true"
      >
        <MenuOutlined />
      </AntButton>
      <!-- Mobile Drawer Menu -->
      <AntDrawer
        placement="right"
        closable
        :visible="showDrawer"
        @close="showDrawer = false"
      >
        <AntMenu
          mode="vertical"
          theme="light"
          :default-selected-keys="['home']"
        >
          <AntMenuItem key="home">
            <router-link to="/" v-t="'nav.home'"></router-link>
          </AntMenuItem>
          <AntMenuItem key="about">
            <router-link to="/about" v-t="'nav.about'"></router-link>
          </AntMenuItem>
          <AntMenuItem key="tool">
            <router-link to="/tool" v-t="'nav.tool'"></router-link>
          </AntMenuItem>
          <AntMenuItem key="contact">
            <router-link to="/contact" v-t="'nav.contact'"></router-link>
          </AntMenuItem>
        </AntMenu>
      </AntDrawer>
    </div>
  </AntHeader>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import AntHeader from "@/components/container/AntHeader.vue";
import AntMenu from "@/components/container/AntMenu.vue";
import AntMenuItem from "@/components/container/AntMenuItem.vue";
import AntButton from "@/components/container/AntButton.vue";
import AntDrawer from "@/components/container/AntDrawer.vue";

export default defineComponent({
  components: {
    MenuOutlined,
    AntHeader,
    AntMenu,
    AntMenuItem,
    AntButton,
    AntDrawer,
  },
  setup() {
    const showDrawer = ref(false);

    return { showDrawer };
  },
});
</script>

<style scoped lang="stylus">
.header-container
  display flex
  align-items center
  justify-content space-between
  max-width 1200px
  margin 0 auto
  width 100%

.logo
  color #fff
  font-size 24px
  font-weight bold

.desktop-menu
  display flex

.mobile-menu-button
  display none
  color white
  font-size 24px

/* Responsive Styles */
@media (max-width: 768px)
  .desktop-menu
    display none
  .mobile-menu-button
    display block
</style>
