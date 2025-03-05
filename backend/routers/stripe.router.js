const expess = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller');

router.post('/create-checkout-session', stripeController.createPaymentIntent);

module.exports = router;