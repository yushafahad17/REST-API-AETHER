const express = require("express");
const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const router = express.Router();

const customCss = `
    .swagger-ui .topbar .link {
        display: none;
    }
    .swagger-ui .topbar:before {
        content: "AethersCode - Website";
        display: block;
        font-weight: bold;
        color: black;
        font-size: 20px;
        margin: 15px 0;
        text-align: left;
        padding-left: 80px;
    }
    .swagger-ui .topbar {
        background: url('https://telegra.ph/file/727ec9ce1a059ca515074.jpg') no-repeat;
        background-size: contain;
    }
`;

// Serve Swagger documentation beserta CSS kustom
router.get(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

router.get("/swagger-ui.css", async (req, res) => {
  const url =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui.min.css";
  const response = await axios.get(url);
  res.set("Content-Type", "text/css");
  res.send(response.data);
});

router.get("/swagger-ui-bundle.js", async (req, res) => {
  const url =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-bundle.min.js";
  const response = await axios.get(url);
  res.set("Content-Type", "application/javascript");
  res.send(response.data);
});

router.get("/swagger-ui-standalone-preset.js", async (req, res) => {
  const url =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-standalone-preset.min.js";
  const response = await axios.get(url);
  res.set("Content-Type", "application/javascript");
  res.send(response.data);
});

router.get("/swagger-ui-init.js", async (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.send(` window.onload = function () {
    const ui = SwaggerUIBundle({
      url: "/swagger.json",
      dom_id: "#swagger-ui",
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: "BaseLayout",
      deepLinking: true,
    });
  };`);
});

// Middleware untuk menyembunyikan /swagger.json
router.use((req, res, next) => {
  if (req.path === "/swagger.json") {
    res.status(404).send("Not found");
  } else {
    next();
  }
});

// Tambahkan rute untuk menampilkan swagger.json jika diperlukan
router.get("/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

module.exports = router;
