import axios from 'axios';


export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/transactions`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTransactionByTicketID = async (ticketID) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/transactions/${ticketID}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const filterTransactions = async (filters) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/transactions/filter`, { params: filters });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};