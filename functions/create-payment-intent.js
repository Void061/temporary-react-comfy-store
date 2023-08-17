// domain/.netlify/functions/create-payment-intent
// Funzionerà come un vero e proprio server back-end, ma limitato alle richieste di netlify
// Le richieste totali si trovano su functions in netlify

// Per leggere le .env, in quanto sono settate per REACT e qui siamo su node
require("dotenv").config();

// Inizializziamo stripe con la key segreta
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // Controlliamo se viene effettuata una richiesta POST
  if (event.body) {
    // Prendiamo questi dati da event.body (che è stringa)
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    // Calcolo il totale dell'ordine
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
