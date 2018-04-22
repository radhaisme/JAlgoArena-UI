const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 3000;

const path = require("path");
const express = require("express");

const morgan = require("morgan");
const helmet = require("helmet");
const serveStatic = require("serve-static");
const proxy = require('http-proxy-middleware');

const app = express();
const compression = require("compression");
app.use(compression());
app.use(morgan("tiny"));

helmet(app);

let assetsDir;

if (env === "production") {
    require("./server/build/copyFiles")();
    assetsDir = path.join(__dirname, "public", "assets");
} else {
    require("./server/config/devWebpack")(app);
    assetsDir = path.join(__dirname, "assets");
}

app.use(serveStatic(assetsDir));

let jalgoarenaApiUrl = process.env.JALGOARENA_API_URL || "http://localhost:5001";

const apiProxy = proxy('/api', {
    target: jalgoarenaApiUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
});
app.use('/api', apiProxy);

let jalgoarenaWebSocketUrl = process.env.JALGOARENA_WS_URL || "http://localhost:5005";
const wsProxy = proxy('/ws', {
    target: jalgoarenaWebSocketUrl,
    ws: true,
    changeOrigin: true,
    pathRewrite: {
        '^/ws': ''
    }
});
app.use('/ws', wsProxy);

app.get("*", function (req, res) {
    res.sendFile(path.join(assetsDir, "index.html"));
});

app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});

