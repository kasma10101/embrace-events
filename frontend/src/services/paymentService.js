import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_URL}/payment/createpayment`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyPayment = async (tx_ref) => {
    try {
        const response = await axios.post(`${API_URL}/payment/verifypayment`, { tx_ref });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
