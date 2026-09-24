const express = require("express");
const cors = require("cors");

const app = express();

// middleware
//assumption: obviously would be better to host separately, but this works for sake of demo
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// routes
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");

app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error_code: 500,
    error_title: "Internal Server Error",
    error_message: "An unexpected error occurred",
  });
});

// server
const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Environment: development");
});
