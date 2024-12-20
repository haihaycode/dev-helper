<!-- eslint-disable-next-line -->
<template>
    <a-layout-header class="header">
        <div class="header-container">
            <!-- Logo -->
            <div class="logo">MyApp</div>

            <!-- Desktop Menu -->
            <a-menu mode="horizontal" theme="dark" class="desktop-menu" :default-selected-keys="['home']">
                <a-menu-item key="home">
                    <router-link to="/">Home</router-link>
                </a-menu-item>
                <a-menu-item key="about">
                    <router-link to="/about">About</router-link>
                </a-menu-item>
                <a-menu-item key="contact">
                    <router-link to="/contact">Contact</router-link>
                </a-menu-item>
            </a-menu>

            <!-- Mobile Menu Toggle Button -->
            <a-button class="mobile-menu-button" type="text" @click="showDrawer = true">
                <MenuOutlined />
            </a-button>

            <!-- Mobile Drawer Menu -->
            <a-drawer placement="right" closable :visible="showDrawer" @close="showDrawer = false">
                <a-menu mode="vertical" theme="light" :default-selected-keys="['home']">
                    <a-menu-item key="home" @click="showDrawer = false">
                        <router-link to="/">Home</router-link>
                    </a-menu-item>
                    <a-menu-item key="about" @click="showDrawer = false">
                        <router-link to="/about">About</router-link>
                    </a-menu-item>
                    <a-menu-item key="contact" @click="showDrawer = false">
                        <router-link to="/contact">Contact</router-link>
                    </a-menu-item>
                </a-menu>
            </a-drawer>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";

export default defineComponent({
    components: {
        MenuOutlined,
    },
    setup() {
        const showDrawer = ref(false);
        return { showDrawer };
    },
});
</script>

<style scoped lang="stylus">
.header
    background-color #001529
    padding 0

.header-container
    display flex
    align-items center
    justify-content space-between
    max-width 1200px
    margin 0 auto
    width 100%
    padding 0 20px

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
