import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../css/CheckoutForm.css";
import api from "../components/StripeAPI";

export default function CheckoutForm() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    setCurrency("RON");
    setAmount(localStorage.getItem("total"));

    // Step 2: Create PaymentIntent over Stripe API
    api
      .createPaymentIntent("RON", localStorage.getItem("total"))
      .then((clientSecret) => {
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    localStorage.setItem("total", 0);
    localStorage.setItem("cart", JSON.stringify([]));

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    await api
      .confirmPaymentMBDed(clientSecret)
      .then((payment) => {
        setError(null);
        setSucceeded(true);
        setProcessing(false);
        setMetadata(payment);
        console.log("[PaymentIntent]", payment);
      })
      .catch((err) => {
        setError(err.message);
      });

    // if (payload.error) {
    //   setError(`Payment failed: ${payload.error.message}`);
    //   setProcessing(false);
    //   console.log("[error]", payload.error);
    //   console.log(clientSecret);
    // } else {
    //   setError(null);
    //   setSucceeded(true);
    //   setProcessing(false);
    //   setMetadata(payload.paymentIntent);
    //   console.log("[PaymentIntent]", payload.paymentIntent);
    //   console.log(clientSecret);
    // }
  };

  const renderSuccess = () => {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
      </div>
    );
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    return (
      <form onSubmit={handleSubmit}>
        <h1>
          {amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{" "}
          {currency.toLocaleUpperCase()}{" "}
        </h1>
        <h4>Stripe | Secure payment processing platform</h4>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div>

          <div className="sr-combo-inputs-row">
            <CardElement
              className="sr-input sr-card-element"
              options={options}
            />
          </div>
        </div>

        {error && <div className="message sr-field-error">{error}</div>}

        <button
          className="btn"
          disabled={processing || !clientSecret || !stripe}
        >
          {processing ? "Processing…" : "Pay"}
        </button>
      </form>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
        {/* {renderForm()} */}
      </div>
    </div>
  );
}
