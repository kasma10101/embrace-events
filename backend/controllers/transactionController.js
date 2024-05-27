const TicketTransaction = require('../models/ticketTransactionModel');
const otpGeenerator=require("otp-generator")
const EmailOtpRequest=require("../models/emailOtpRequest")
const { SendOTP } = require("../services/sendEmail")


// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TicketTransaction.find()
        .populate('ticketID', 'title')
        .sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ticketID
const getTransactionByTicketID = async (req, res) => {
    const { tx_ref } = req.params;
    console.log("ouuuuuuuuuuu",req.params);
    console.log("okkk", req.params.tx_ref);
    console.log(tx_ref);
    try {
        const transaction = await TicketTransaction.find({ tx_ref });
        console.log("ouuuuuuuuuuu",transaction);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter transactions by dates, ticketType, and name
const filterTransactions = async (req, res) => {
    const { startDate, endDate, ticketType, name } = req.query;

    let filter = {};

    if (startDate && endDate) {
        filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (ticketType) {
        filter.ticketType = ticketType;
    }

    if (name) {
        filter.$or = [
            { fname: new RegExp(name, 'i') },
            { lname: new RegExp(name, 'i') }
        ];
    }

    try {
        const transactions = await TicketTransaction.find(filter);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const requestOtp = async (req, res) => {
    try {
      const { email } = req.body;
      let emailExist = await TicketTransaction.findOne({ email: email });
      console.log(emailExist);
      if (!emailExist)
        return res
          .status(400)
          .send({ error: "No Transaction found with this email" });
  
      let otp = await otpGeenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
  
      let requestExists = await EmailOtpRequest.findOne({ email: email });

      if (requestExists) await EmailOtpRequest.updateOne({ email: email }, { $set: { otp: otp } });
      else await EmailOtpRequest.create({ email, otp });
  
       
      const meessage=`your OTP verification code is ${otp}. this code is will expire after 5 minutes`
      const subject='Verification'
      const title="Verification code"
      
      await SendOTP(email, meessage,subject,title )
  
      return res.status(200).send({ otp: otp});
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).send({ error: "An error occurred" });
    }
  };

  function encodeEmail(email) {
    const encodedBytes = Buffer.from(email, 'utf-8');
    return encodedBytes.toString('base64');
  }
  
  function decodeEmail(encodedEmail) {
    const decodedBytes = Buffer.from(encodedEmail, 'base64');
    return decodedBytes.toString('utf-8');
  }


const verifyOtpAndGetTransactions = async (req, res) => {
  try {
      let { email, otp } = req.body;
      
      let requestExists = await EmailOtpRequest.findOne({ email: email });
      if (!requestExists ){ 
        
        let userTickets = await TicketTransaction.find({ email: decodeEmail(email) }).populate('ticketID'); 
        if(userTickets.length === 0){
          return res.status(400).send({error:"Request not found"});
        }
        return res.status(200).send({tickets:userTickets});
      }
      
      let date1 = new Date();
      let date2 = new Date(requestExists.createdAt);
      let diffTime = date1 - date2;
      let diffMins = diffTime / (1000 * 60);
      
      if(diffMins>5){
         await EmailOtpRequest.deleteOne({ email: email })
         return  res.status(400).send({ error: "Request Expired. Please try again !" }); 
      }

      if(otp!==requestExists.otp) return  res.status(400).send({ error: "Invalid OTP" }); 

      await EmailOtpRequest.deleteOne({ email: email })

      let userTickets = await TicketTransaction.find({ email: email }).populate('ticketID'); 
    console.log(userTickets.createdAt);
      return res.status(200).send({tickets:userTickets,email:encodeEmail(email)} );

    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).send({ error: "An error occurred" });
    }
  };

module.exports = {
    getAllTransactions,
    getTransactionByTicketID,
    filterTransactions,

    requestOtp,
    verifyOtpAndGetTransactions
};