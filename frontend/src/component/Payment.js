import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentThunk, verifyPaymentThunk } from '../redux/paymentSlice';
import { getAvailableTicketsThunk, getTicketsThunk } from '../redux/ticketSlice';
import ButtonLoading from './Loader/ButtonLoader';
import { useLocation, useParams } from 'react-router-dom';
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Button from 'react-bootstrap/esm/Button';
import '../style/payment.css'
import { FaCircle } from 'react-icons/fa';
import moment from 'moment';

const PaymentComponent = () => {
    const dispatch = useDispatch();
    // const location = useLocation();
    // const { ticket } = location.state || {}; // Get ticket data from the state
    const { payment, verification, loading, error } = useSelector((state) => state.payment);
    const { tickets, availableTickets } = useSelector((state) => state.tickets);
    const { id } = useParams();
    const [ticket, setTicket] = useState([]);

    const [paymentData, setPaymentData] = useState({
        ticketID: ticket?._id || '',
        ticketType: '',
        email: '',
        phone: '',
        fname: '',
        lname: '',
        currency: 'ETB'
    });

    useEffect(() => {
        const ticket = availableTickets.find(ticket => ticket._id === id)
        setTicket(ticket)
        setPaymentData({ ...paymentData, ticketID: ticket?._id })
        console.log(id, availableTickets);
        console.log(ticket);
    }, [availableTickets])

    useEffect(() => {
        dispatch(getTicketsThunk());
        dispatch(getAvailableTicketsThunk())
    }, [dispatch]);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleCreatePayment = async () => {
        const result = await dispatch(createPaymentThunk(paymentData));
        if (createPaymentThunk.fulfilled.match(result)) {
            const checkoutUrl = result.payload.response.data.checkout_url;
            window.location.href = checkoutUrl; // Redirect to Chapa checkout page
        }
    };

    const handleVerifyPayment = () => {
        if (payment && payment.tx_ref) {
            dispatch(verifyPaymentThunk(payment.tx_ref));
        }
    };
    return (
        <div className='whole-payment-container'>
            <div className="container" >
                <h4 style={{ textAlign: 'center' }}>Billing address</h4>
                <form className='input-group p-2 border border-0'>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 20 }}>
                        <TextField
                            type="text"
                            className="form-control"
                            name="fname"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={paymentData.fname}
                            style={{ width: 400 }}
                        />
                        <TextField
                            type="text"
                            className="form-control"
                            name="lname"
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={paymentData.lname}
                            style={{ width: 400 }}
                        />
                        <TextField
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            value={paymentData.email}
                            style={{ width: 400 }}
                        />
                        <TextField
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="0911111... or +25191111..."
                            onChange={handleChange}
                            value={paymentData.phone}
                            style={{ width: 400 }}
                        />
                        <div>
                            <InputLabel>Ticket type</InputLabel>
                            <Select
                                name="ticketType"
                                onChange={handleChange}
                                value={paymentData.ticketType}
                                style={{ width: 400, backgroundColor: '#fff' }}
                            >
                                <MenuItem value="">Select Ticket Type</MenuItem>
                                <MenuItem value="standard">Standard</MenuItem>
                                <MenuItem value="vip">VIP</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <InputLabel>Currency</InputLabel>
                            <Select
                                name="currency"
                                onChange={handleChange}
                                value={paymentData.currency}
                                style={{ width: 400, backgroundColor: '#fff' }}
                            >
                                <MenuItem value="ETB">ETB</MenuItem>
                            </Select>
                        </div>
                        {loading ? (
                            <ButtonLoading className="w-100 btn btn-primary btn-lg" type="submit" disabled>Loading...</ButtonLoading>
                        ) : (
                            <Button style={{ width: 400, backgroundColor: '#12372a', border: 0, padding: 10 }} onClick={handleCreatePayment}>Continue to checkout</Button>
                        )}
                    </div>
                </form>
                {/* </div> */}
                {/* {error && <p className="text-danger">{error}</p>} */}
                {payment && (
                    <div className="mt-3">
                        <h3>Payment Created</h3>
                        <p>Transaction Reference: {payment.tx_ref}</p>
                        <button className="btn btn-success" onClick={handleVerifyPayment}>Verify Payment</button>
                    </div>
                )}
                {verification && (
                    <div className="mt-3">
                        <h3>Payment Verification</h3>
                        <p>Status: {verification.status}</p>
                    </div>
                )}
            </div>
            <div className='ticket-detail'>
                <div>
                    <div className='ticket-title'>{ticket?.title}</div>
                    <div className='title-underline'></div>
                </div>
                <div style={{ display: 'flex', gap: 5, }}>
                    <span><FaCircle style={{ color: '#789461', fontSize: 13 }} /></span>
                    <span>{ticket?.description}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, }}>
                    <span><FaCircle style={{ color: '#789461', fontSize: 13 }} /></span>
                    <span>{ticket?.location}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, }}>
                    <span><FaCircle style={{ color: '#789461', fontSize: 13 }} /></span>
                      <span>{moment(ticket?.startDate).format('LL') + '-' + moment(ticket?.endDate).format('LL')}</span>
                </div>
                <div style={{ display: 'flex', gap: 5, }}>
                    <span><FaCircle style={{ color: '#789461', fontSize: 13 }} /></span>
                    <span>{ticket?.vipAmount || ticket?.standardAmount}ETB</span>
                </div>
                <div><img style={{ objectFit: 'contain', width: '100%', height: '200px' }} src={ticket?.image?.filePath} /></div>
            </div>
        </div>
    );
};

export default PaymentComponent;