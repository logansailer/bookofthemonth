const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { bookIds } = req.body;

    if (!bookIds || bookIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    // Assumption: not stored so this would be functionally useless. A real application would have a "Orders" database where info like this is saved and the bookIds are saved.
    const orderId = `BOTM-${Math.floor(100000 + Math.random() * 900000)}`;

    const shipDate = new Date();
    // Assumption: fake data for the sake of demo. Real application would require much more calculation
    shipDate.setDate(shipDate.getDate() + 7);

    res.status(200).json({
      success: true,
      orderId,
      estimatedShipDate: shipDate.toISOString().split("T")[0],
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
