const path = require("path");
const fs = require("fs");
const express = require("express");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);

const createApp = require(appPath).default;

const server = express();

server.use("/client", express.static(path.join(__dirname, "../client")));

server.get("*", async (req, res) => {
  const { app } = createApp();
  const appContent = await renderToString(app);
  fs.readFile(path.join(__dirname, "../client", "index.html"), (err, html) => {
    if (err) {
      throw err;
    }
    html = html
      .toString()
      .replace('<div id="app"></div>', `<div id="app">${appContent}</div>`);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

server.listen(3000);
