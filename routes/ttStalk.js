const express = require("express");
const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");

const author = process.env.AUTHOR || "AethersCode";
const router = express.Router();

router.get("/api/ttstalk", (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan nama pengguna Tiktok!"
    });
  }
  
  // Perform TikTok stalking logic here
  
  res.status(200).json({
    status: 200,
    author: author,
    message: `Stalking ${username} on TikTok`
  });
});

module.exports = router;