import axios from 'axios';


export const createTicket = async (ticketData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/tickets`, ticketData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTickets = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/tickets`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAvailableTickets = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/tickets/availableTickets`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUpcomingTickets = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/tickets/upcomingTickets`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getTicketById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateTicket = async (id, ticketData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/tickets/${id}`, ticketData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteTicket = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/api/tickets/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};