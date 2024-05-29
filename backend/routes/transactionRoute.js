const express = require('express');
const {
    getAllTransactions,
    getTransactionByTicketID,
    filterTransactions,
    verifyOtpAndGetTransactions,
    requestOtp
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getAllTransactions);
router.get('/filter', filterTransactions);

//so as to get tickets transaction based on email
router.post("/requestOtp",requestOtp)
router.post("/verifyOtpAndGetTransactions",verifyOtpAndGetTransactions)
router.get('/:tx_ref', getTransactionByTicketID);

module.exports = router;