const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({ origin: true }); // Allow all origins

exports.handleCors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).send("CORS applied successfully!");
  });
});
