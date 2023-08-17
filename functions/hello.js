// domain/.netlify/functions/hello

// Funzionerà come un vero e proprio server back-end, ma limitato alle richieste di netlify
// Le richieste totali si trovano su functions in netlify
const items = [
  {
    id: 1,
    name: "john",
  },
  {
    id: 2,
    name: "susan",
  },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'Hello World!'
  };
};
