import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTransactionByTicketID = async (ticketID) => {
    try {
        const response = await axios.get(`${API_URL}/${ticketID}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const filterTransactions = async (filters) => {
    try {
        const response = await axios.get(`${API_URL}/filter`, { params: filters });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
