import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentThunk, verifyPaymentThunk } from '../redux/paymentSlice';
import { getAvailableTicketsThunk, getTicketsThunk } from '../redux/ticketSlice';
import ButtonLoading from './Loader/ButtonLoader';
import { useLocation, useParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Button from 'react-bootstrap/esm/Button';
import '../style/payment.css'
import { FaCircle } from 'react-icons/fa';
import moment from 'moment';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        ticketType: 'standard',
        email: '',
        phone: '',
        fname: '',
        lname: '',
        currency: 'ETB'
    });

    useEffect(() => {
        const ticket = availableTickets.find(ticket => ticket._id === id)
        if(ticket){
            setTicket(ticket)
            setPaymentData({ ...paymentData, ticketID: ticket?._id })
        }
        else{
            window.location.href="/"
        }

    }, [availableTickets])

    useEffect(() => {
        dispatch(getTicketsThunk());
        dispatch(getAvailableTicketsThunk())
    }, [dispatch]);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleCreatePayment = async () => {
         if(new Date(ticket.startDate).getTime()-new Date().getTime() > 1 * 60 * 60 * 1000 ){
            window.location.href="/"
            return
         }
        if(!paymentData.ticketType || !paymentData.email || !paymentData.phone || !paymentData.fname || !paymentData.lname
            || !paymentData.currency
        ){
            return
        }
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
            <div className="container-form" >
                <h4 style={{ textAlign: 'center',fontWeight:"800" }}>Billing address</h4>
                <form className='input-group p-2 border border-0' style={{width:"100%"}}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 20 }}>
                        <TextField
                            type="text"
                            className="form-control"
                            name="fname"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={paymentData.fname}
                            style={{ width: '100%' }}
                        />
                        <TextField
                            type="text"
                            className="form-control"
                            name="lname"
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={paymentData.lname}
                            style={{ width: '100%' }}
                        />
                        <TextField
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            value={paymentData.email}
                            style={{ width: '100%' }}
                        />
                        <TextField
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="0911111... or +25191111..."
                            onChange={handleChange}
                            value={paymentData.phone}
                            style={{ width: '100%' }}
                        />
                        <div style={{width:"100%", }} >
                                <FormControl fullWidth sx={{backgroundColor: '#fff'}}>
                                    <InputLabel  id="demo-simple-select-standard-label">Ticket Type</InputLabel>
                                    <Select
                                        name="ticketType"
                                        value={paymentData.ticketType}
                                        label="Ticket Type"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange}
                                        
                                    >
                                        <MenuItem value="standard">Standard</MenuItem>
                                        <MenuItem value="vip">VIP</MenuItem>
                                    </Select>
                            </FormControl>
                        </div>
                       <div style={{width:"100%"}}>

                            {loading ? (
                                <ButtonLoading  className="w-100 btn btn-primary btn-lg" type="submit" disabled>Loading...</ButtonLoading>
                            ) : (
                                <Button style={{ width: '100%', backgroundColor: '#12372a', border: 0, padding: 10 }} onClick={handleCreatePayment}>Continue to checkout</Button>
                            )}
                       </div>
                    </div>
                </form>
                {/* </div> */}
                {/* {error && <p className="text-danger">{error}</p>} */}
                
            </div>
            <div className='ticket-detail'>
                <div>
                    <img style={{ objectFit: 'cover', width: '100%', height: '300px' }} src={ticket?.image?.filePath} />
              </div>

              <div style={{padding:"20px",lineBreak:"anywhere",whiteSpace:"break-spaces"}}>
                    <div>
                        <div className='ticket-title'>{ticket?.title}</div>
                        <div className='title-underline'></div>
                    </div>
                    <div style={{ marginBottom:"10px", }}>
                        <span>{ticket?.description}</span>
                    </div>
                    <div style={{marginBottom:"10px",color:"red",fontSize:"14px" }}>
                        <span><LocationOnIcon style={{ color: 'red', fontSize: 25,padding:0 }} /></span>
                        <span>{ticket?.location}</span>
                    </div>
                   
                    <div style={{ }}>
                         <div><span style={{fontWeight:"800"}}>VIP</span> {ticket?.vipAmount}ETB</div>
                         <div><span style={{fontWeight:"800"}}>Standard</span> {ticket?.standardAmount}ETB</div>

                    </div>

                    <div style={{ fontSize: '13px',textAlign:"center",marginTop:"15px" }}>
                      Ticket Sale Date:  <span>{moment(ticket?.startDate).format('LL') + ' - ' + moment(ticket?.endDate).format('LL')}</span>
                    </div>
                    <div style={{ fontSize: '13px',textAlign:"center",marginTop:"5px" }}>
                      Evnt Date:  <span>{moment(ticket?.eventStartedDate).format('LL') + ' - ' + moment(ticket?.eventEndDate).format('LL')}</span>
                    </div>
              </div>

            </div>
        </div>
    );
};

export default PaymentComponent;


/*
{!payment && (
                    <div className="mt-3">
                        <h3>Payment Created</h3>
                        <p>Transaction Reference: {payment?.tx_ref}</p>
                        <button className="btn btn-success" onClick={handleVerifyPayment}>Verify Payment</button>
                    </div>
                )}
                {verification && (
                    <div className="mt-3">
                        <h3>Payment Verification</h3>
                        <p>Status: {verification.status}</p>
                    </div>
                )}
*/ 