const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["ant-design-vue"],
  devServer: {
    client: {
      overlay: {
        warnings: false,  // Tắt cảnh báo
        errors: false,     // Hiển thị chỉ lỗi
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "ant-design-vue/es/package.json": path.resolve(__dirname, "node_modules/ant-design-vue/package.json"),
      },
    },
  },
});
