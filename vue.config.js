const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const webpack = require("webpack"); // Thêm dòng này để import webpack

module.exports = defineConfig({
  transpileDependencies: ["ant-design-vue"],
  devServer: {
    port: 4300,
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
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Định nghĩa flag
      }),
    ],
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
