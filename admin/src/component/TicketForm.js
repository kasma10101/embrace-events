import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicketThunk, getTicketByIdThunk, getTicketsThunk, updateTicketThunk } from './redux/ticketSlice';
import {TextField} from '@mui/material'
import { Button } from 'bootstrap';
import '../style/ticketForm.css'

const TicketForm = ({ onFormSubmit, editingTicket }) => {
    const dispatch = useDispatch();
    const [ticketData, setTicketData] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        standardAmount: '',
        vipAmount: '',
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    
    useEffect(()=>{
        if (editingTicket) {
            setTicketData(editingTicket)
        }

    }, [editingTicket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(ticketData).forEach(key => {
            formData.append(key, ticketData[key]);
        });
        if (image) {
            formData.append('image', image);
        }
        
        await dispatch(createTicketThunk(formData));
        setTicketData({
            title: '',
            description: '',
            location: '',
            startDate: '',
            endDate: '',
            standardAmount: '',
            vipAmount: ''
        });
        onFormSubmit();
    };

    return (
        <div >
            <div>
                <h2 style={{textAlign: 'center'}}>Create Ticket</h2>
                <form onSubmit={handleSubmit} className='form-container' >
                        <TextField
                            type="text"
                            className="form-control"
                            name="title"
                            value={ticketData.title}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Ticket Titlec'
                        />
                        <TextField
                            className="form-control"
                            name="description"
                            value={ticketData.description}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Ticket Description'
                            multiline
                            maxRows={5}
                        />
                        <TextField
                            type="text"
                            className="form-control"
                            name="location"
                            value={ticketData.location}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Location'
                        />
                        <TextField
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={ticketData.startDate}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Start Date'
                        />
                        <TextField
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={ticketData.endDate}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='End Date'
                        />
                        <TextField
                            type="number"
                            // className="form-control"
                            name="standardAmount"
                            value={ticketData.standardAmount}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Standard Amount'
                        />
                        <TextField
                            type="number"
                            className="form-control"
                            name="vipAmount"
                            value={ticketData.vipAmount}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='VIP Amount'
                        />
                        <TextField
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleImageChange}
                            style={{width: 300}}
                            placeholder='Image'
                        />
                    <button type="submit" className="btn btn-primary" style={{gridColumn: '1 / 3'}}>
                       Create Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketForm;