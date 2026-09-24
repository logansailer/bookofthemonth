const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    cart: [
      {
        id: 1,
        title: "Do Androids Dream of Electric Sheep?",
        author: "Philip K. Dick",
        image: "/DoAndroidsDream.png",
        price: 15.99,
        quantity: 1,
      },
      {
        id: 2,
        title: "The Lord of the Rings: The Two Towers",
        author: "J. R. R. Tolkien",
        image: "/TheLordofTheRingsTheTwoTowers.jpg",
        price: 19.99,
        quantity: 1,
      },
      {
        id: 3,
        title: "Kitchen Confidential: Adventures in the Culinary Underbelly",
        author: "Anthony Bourdain",
        image: "/KitchenConfidential.jpg",
        price: 19.99,
        quantity: 1,
      },
    ],
  });
});

module.exports = router;
