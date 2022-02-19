const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const App = require(appPath).default;

const server = express();

server.get("*", async (req, res) => {
  const app = createSSRApp(App);
  const appContent = await renderToString(app);
  const html = `
        <html>
            <head></head>
            <body>
             ${appContent}
            </body>
        </html>
    `;
  res.send(html);
});

server.listen(3000);
