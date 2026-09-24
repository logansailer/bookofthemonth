const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    const orderId = `BOTM-${Math.floor(100000 + Math.random() * 900000)}`;

    const shipDate = new Date();
    shipDate.setDate(shipDate.getDate() + 7);

    res.status(200).json({
      success: true,
      orderId,
      shipDate: shipDate.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to place order. Please try again.",
    });
  }
});

module.exports = router;
