const nodemailer=require("nodemailer")
const moment=require("moment")
require("dotenv").config()


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASSWORD
        },
    tls: {
        rejectUnauthorized: false
    }
    });


const SendEmail=async(email, data, subject,title)=>{
    try{
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
        
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
        
                .content {
                    margin-bottom: 20px;
                }
        
                .link {
                    color: #007bff;
                }
        
                .footer {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>${title}</h1>
                </div>
                <div class="content">
                    <p>Dear ${data.fname} ${data.lname} your ticket detail is,</p>

                    <p>Ticket: ${data.ticketID.title}</p>
                    <p>Ticket Started: ${moment(data.ticketID.startDate).format('LL')}</p>
                    <p>Ticket Type: ${data.ticketType}</p>
                    <p>Amount: ${data.amount}</p>
                    <p>Ticket Number: ${data.ticketNumber}</p>
                </div>
                <div class="footer">
                    <p><em>This email was sent automatically. Please do not reply.</em></p>
                </div>
            </div>
        </body>
        </html>
        `;  
         const mailOption={
            from:{
                name:'Embrace Events',
                address:process.env.NODEMAILER_EMAIL
            },
            to:email,
            subject:subject,
            html:html
         }
     
         await transporter.sendMail(mailOption,(err,info)=>{
         if(err){
             console.log("unable to send", err);
             return false
         }
          console.log("message sent", info.messageId);
         return true

         })
     
     
    
   } catch (error) {
    console.log(error);
    return false
   }


}


const SendOTP=async(email, message, subject,title)=>{
    try{
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
        
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
        
                .content {
                    margin-bottom: 20px;
                }
        
                .link {
                    color: #007bff;
                }
        
                .footer {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>${title}</h1>
                </div>
                <div class="content">
                    <p>Dear ${email},</p>
                    <p>${message}</p>

                    </div>
                <div class="footer">
                    <p><em>This email was sent automatically. Please do not reply.</em></p>
                </div>
            </div>
        </body>
        </html>
        `;  
         const mailOption={
            from:{
                name:'Embrace Events',
                address:process.env.NODEMAILER_EMAIL
            },
            to:email,
            subject:subject,
            html:html
         }
     
         await transporter.sendMail(mailOption,(err,info)=>{
         if(err){
             console.log("unable to send", err);
             return false
         }
          console.log("message sent", info.messageId);
         return true

         })
     
     
    
   } catch (error) {
    console.log(error);
    return false
   }


}

module.exports={
    SendEmail,
    SendOTP
}