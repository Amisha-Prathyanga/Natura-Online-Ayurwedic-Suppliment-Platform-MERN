import "./App.css";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/checkoutForm";

const stripePromise = loadStripe(
  "pk_test_51MxnUfIr55hAMMKQuMS7wvYObxnJIi1y1iBbWUtkkHDx4jXFEo98NJDOzjUYEcFJftzUwyd5LeS63w442jBMy7iM00GdnVjReF"
);

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {/* <h1>Hello World !!!!?</h1> */}
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default App;
