const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: ["ant-design-vue"],
  devServer: {
    port: 4300,
    client: {
      overlay: {
        warnings: false,
        errors: false,
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
