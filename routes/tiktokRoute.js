const express = require("express");
const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");

const author = process.env.AUTHOR || "AethersCode";
const router = express.Router();

router.get("/api/tiktok", (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan URL Tiktok!"
    });
  }
  
  TiktokDownloader(url, { version: "v2" })
    .then(data => {
      if (!data.result) {
        throw new Error("Tidak ada hasil yang ditemukan.");
      }
      res.status(200).json({
        status: 200,
        author: author,
        result: data.result
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        author: author,
        message: err.message || "Terjadi kesalahan dalam mengunduh video Tiktok."
      });
    });
});

module.exports = router;
