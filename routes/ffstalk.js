const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    let data = {
      "voucherPricePoint.id": 8050,
      "voucherPricePoint.price": "",
      "voucherPricePoint.variablePrice": "",
      "email": "",
      "n": "",
      "userVariablePrice": "",
      "order.data.profile": "",
      "user.userId": userId,
      "voucherTypeName": "FREEFIRE",
      "affiliateTrackingId": "",
      "impactClickId": "",
      "checkoutId": "",
      "tmwAccessToken": "",
      "shopLang": "in_ID",
    };

    const ffResponse = await axios.post("https://order.codashop.com/id/initPayment.action", data);
    const nickname = ffResponse.data["confirmationFields"];

    res.json({ id: userId, nickname });
  } catch (error) {
    console.error('Error fetching Free Fire user information:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
