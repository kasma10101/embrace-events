const {createPayment, verifyPayment, paymentSuccess} = require('../controllers/paymentController');

const router = require('express').Router();

router.post('/createpayment', createPayment);
router.get('/verifypayment', verifyPayment);
router.get('/success', paymentSuccess);

module.exports = router;