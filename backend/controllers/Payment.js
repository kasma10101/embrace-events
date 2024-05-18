const Chapa = require('chapa-nodejs').Chapa;

const chapa = new Chapa({
    secretKey: process.env.API_KEY,
  });

const createPayment = async (req, res) => {
    const { ticketID, ticketType, email, fname, lname, currency, callback_url, return_url } = req.body;

    const chapa_tx_ref = await chapa.generateTransactionReference();
    const date = new Date().toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const time = new Date().toISOString().slice(11, 16).replace(":", ""); // Get HH:MM format (without seconds)
    // ${ticketID}-
    const tx_ref = `${chapa_tx_ref}-${date}-${time}`;

    // const amount = Ticket.find({ ticketID: ticketID, ticketType }).price || 250;
    const amount = 250;

    try {
        const response = await chapa.initialize({
            first_name: fname,
            last_name: lname,
            email: email,
            currency: currency,
            amount: amount,
            tx_ref: tx_ref,
            return_url: 'https://www.google.com/',
            customization: {
                title: 'Test Title',
                description: 'Test Description',
            },
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const verifyPayment = async (req, res) => {
    const { tx_ref } = req.body;

    try {
        const response = await chapa.verify(tx_ref);
        if (response.status === 'success') {
            // Update the ticket status to 'paid'
            Ticket.findOneAndUpdate({ tx_ref: tx_ref }, { status: 'paid' }, { new: true }, (err, doc) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
            });
        } else {
            // Update the ticket status to 'failed'
            Ticket.findOneAndUpdate({ tx_ref: tx_ref }, { status: 'failed' }, { new: true }, (err, doc) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createPayment,
    verifyPayment
};