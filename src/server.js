const express = require("express");

const server = express();

server.get("*", (req, res) => {
  const html = `
        <html>
            <head></head>
            <body>
                <h1>hello everyone</h1>
            </body>
        </html>
    `;
  res.send(html);
});

server.listen(3000);
