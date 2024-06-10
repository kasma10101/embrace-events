const mongoose = require('mongoose');
const TicketTransaction = require('../models/ticketTransactionModel'); // Import TicketTransaction model
const Ticket = require('../models/ticketModel');
const { SendEmail } = require("../services/sendEmail")

const Chapa = require('chapa-nodejs').Chapa;
require("dotenv").config()

const chapa = new Chapa({
    secretKey: process.env.API_KEY,
});
const createPayment = async (req, res) => {
    const { ticketID, ticketType, email, phone, fname, lname, currency } = req.body;
    console.log(req.body);

    if(!ticketID || !email || !phone){
        return res.status(400).send({error:"Ticket or email or phone not found"})
    }
     const currentDate = new Date();

    const ticket = await Ticket.findOne({
                            _id:ticketID, 
                            startDate: { $lte: currentDate },
                            endDate: { $gte: currentDate },
                            isDeleted:false});

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (ticket.isDeleted) return res.status(404).json({ message: 'Ticket is Deleted By Admin' });


    const chapa_tx_ref = await chapa.generateTransactionReference();
    const date = new Date().toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const time = new Date().toISOString().slice(11, 16).replace(":", ""); // Get HH:MM format (without seconds)
    const tx_ref = `${chapa_tx_ref}-${date}-${time}`;

    const publicUrl =  process.env.BACKEND_API// Replace with your actual Localtunnel URL
    const frontEndUrl =  process.env.FRONTEND_API
    const callback_url = `${publicUrl}/api/payment/verifypayment`;
    const return_url = `${frontEndUrl}/payment/success?tx_ref=${tx_ref}`;

    const amount = await Ticket.findOne({ _id: ticketID }).then((ticket) => {
        if (ticketType === 'standard') {
            return ticket.standardAmount;
        } else if (ticketType === 'vip') {
            return ticket.vipAmount;
        }
    });


    try {
        const response = await chapa.initialize({
            first_name: fname,
            last_name: lname,
            email: email,
            phone: phone,
            currency: currency,
            amount: amount,
            tx_ref: tx_ref,
            callback_url: callback_url,
            return_url: return_url,
           
            
        });

        // Create TicketTransaction with pending status
        const ticketTransaction = new TicketTransaction({
            ticketID: ticketID,
            ticketType: ticketType,
            email: email,
            phone: phone,
            fname: fname,
            lname: lname,
            currency: currency,
            tx_ref: tx_ref,
            amount: amount,
            ticketNumber: generateTicketNumber(), // Generate random 5-digit ticket number
            status: 'pending'
        });

        await ticketTransaction.save();

        res.status(200).json({ response, tx_ref });
    } catch (error) {
        console.log(error)

        res.status(500).json({ error:error?.message||'Error occured' });
    }
}

const verifyPayment = async (req, res) => {
    const { trx_ref} = req.body;

    try {
        const response = await chapa.verify({ tx_ref: trx_ref });
        // Update TicketTransaction status if payment is successful
        if (response.status === 'success') {
            let transaction= await TicketTransaction.findOne({tx_ref: trx_ref}).populate('ticketID')
            if(transaction){
                await TicketTransaction.findOneAndUpdate({ tx_ref: trx_ref }, { status: 'paid' });
                const subject = "Payment Succeed ✅"
                const title = "Ticket Transaction Detail"
                await SendEmail(transaction?.email, transaction ,subject,title )

            }
        }

       
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// Function to generate random 5-digit ticket number
function generateTicketNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}

const paymentSuccess = (req, res) => {
    const { tx_ref, ticketID } = req.query;
    res.status(200).send(`Payment successful for transaction ${tx_ref} and ticket ${ticketID}`);
};

module.exports = {
    createPayment,
    verifyPayment,
    paymentSuccess
};