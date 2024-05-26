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
router.get('/:ticketID', getTransactionByTicketID);

module.exports = router;