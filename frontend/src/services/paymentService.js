import axios from 'axios';


export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/payment/createpayment`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyPayment = async (tx_ref) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/payment/verifypayment`, { tx_ref });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};