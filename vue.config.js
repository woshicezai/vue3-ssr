// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  outputDir: process.env.SSR ? "dist" : "client", //输出到本地的文件夹路径
  publicPath: process.env.SSR ? "/" : "client", //在服务器中的路径
  chainWebpack: (webpackConfig) => {
    if (!process.env.SSR) {
      webpackConfig.entry("app").clear().add("./src/entry-client.js");
      return;
    }
    webpackConfig.entry("app").clear().add("./src/entry-server.js");
    webpackConfig.target("node");
    webpackConfig.output.libraryTarget("commonjs2");
    webpackConfig.plugin("manifest").use(
      new WebpackManifestPlugin({
        fileName: "ssr-manifest.json",
      })
    );
    webpackConfig.externals(
      nodeExternals({
        allowlist: /\.(css|vue)$/,
      })
    );
    webpackConfig.optimization.splitChunks(false).minimize(false);
    webpackConfig.plugins.delete("hmr");
    webpackConfig.plugins.delete("preload");
    webpackConfig.plugins.delete("prefetch");
    webpackConfig.plugins.delete("pregress");
    webpackConfig.plugins.delete("friendly-errors");
  },
};
