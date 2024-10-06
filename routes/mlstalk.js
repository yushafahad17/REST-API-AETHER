const express = require("express");
const router = express.Router();

router.get("/api/mlstalk", (req, res) => {
  const userId = req.query.user_id;
  const zoneId = req.query.zone_id;
  
  if (!userId || !zoneId) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan User ID dan Zone ID Mobile Legends!"
    });
  }
  
  // Perform Mobile Legends stalking logic here
  
  res.status(200).json({
    status: 200,
    message: `Stalking user ${userId} in zone ${zoneId} on Mobile Legends`
  });
});

module.exports = router;