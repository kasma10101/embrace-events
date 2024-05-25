import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice';
import transactionReducer from './transactionSlice';

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        transactions: transactionReducer,
    },
});

export default store;