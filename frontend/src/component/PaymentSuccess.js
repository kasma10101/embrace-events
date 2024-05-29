import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ButtonLoading from './Loader/ButtonLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/PaymentSuccess.css';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        const tx_ref = searchParams.get('tx_ref');
        if (tx_ref) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_API}/api/transactions/${tx_ref}`)
                .then((res) => {
                    setTransactionDetails(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err?.response?.data?.error || 'Please check your internate connection');
                    setLoading(false);
                });
        }
    }, [searchParams]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <ButtonLoading />;
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="my-4">{transactionDetails?'Payment Successful':'Transaction Not found'}</h2>
            {transactionDetails && (
                <div className="ticket" id="ticket">
                    <div className="ticket-header">
                        <h4 className="ticket-title">Event Ticket</h4>
                    </div>
                    <div className="ticket-body">
                        <p><strong>Transaction Reference:</strong> {transactionDetails.tx_ref}</p>
                        <p><strong>Ticket Type:</strong> {transactionDetails.ticketType}</p>
                        <p><strong>Amount Paid:</strong> {transactionDetails.amount} {transactionDetails.currency}</p>
                        <p><strong>Payer Name:</strong> {transactionDetails.fname} {transactionDetails.lname}</p>
                        <p><strong>Email:</strong> {transactionDetails.email}</p>
                        <p><strong>Phone:</strong> {transactionDetails.phone}</p>
                        <p><strong>Ticket Number:</strong> {transactionDetails.ticketNumber}</p>
                    </div>
                    <div className="ticket-footer">
                        <button onClick={handlePrint} className="btn btn-primary">Print Ticket</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;