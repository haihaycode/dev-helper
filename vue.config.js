const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["ant-design-vue"],
  devServer: {
    port: 4300,
    server: {
      proxy: {
        "/api": {
          target:
            "https://ideal-space-carnival-444xxpx4vpp3q4r6-5000.app.github.dev",
          changeOrigin: true,
        },
      },
    },
    client: {
      overlay: {
        warnings: false,
        errors: false,
        runtimeErrors: (error) => {
          if (
            error?.message ===
            "ResizeObserver loop completed with undelivered notifications."
          ) {
            console.error(error);
            return false;
          }
          return true;
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "ant-design-vue/es/package.json": path.resolve(
          __dirname,
          "node_modules/ant-design-vue/package.json"
        ),
      },
    },
  },
});
