require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MxnUfIr55hAMMKQLxFCiGbaVy4gofEfsDFaiO8Le0TPSTqwlaVXTXdoau4xr0DegUzSSDuDUJWZr8PpaYGWzu3N008ZjqTtjz"
);
const express = require("express");
const mongoose = require("mongoose");
const cartRoutes = require("./routes/cartRoutes");

//express app
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/cart", cartRoutes);

//stripe payment
// app.post("/api/create-payment-intent", async (req, res) => {
//   const { paymentMethodId, amount } = req.body;
//   console.log("Received payment amount:", amount);

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       payment_method: paymentMethodId,
//       amount,
//       currency: "usd",
//       confirmation_method: "manual",
//       confirm: true,
//     });

//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.log(error);
//     console.error("Error creating PaymentIntent:", error.message);
//     res.status(500).send({ error: "Error creating payment intent." });
//   }
// });

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/api/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// //connect to DB
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     //listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("Connected to DB & listening on port", process.env.PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//connect to DB
mongoose.set("strictQuery", false);

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}

//listen for requests
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Listening on port", port);
});
