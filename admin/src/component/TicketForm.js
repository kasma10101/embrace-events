import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicketThunk, getTicketByIdThunk, getTicketsThunk, updateTicketThunk } from './redux/ticketSlice';
import {Box, TextField, Typography} from '@mui/material'
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
        if(name==='endDate' && new Date(value).getTime()-new Date().getTime()<2 * 24 * 60 * 60 * 1000){
            return
        }
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
                       <Box>
                           <Typography>Title</Typography>
                           <TextField
                            type="text"
                            className="form-control"
                            name="title"
                            value={ticketData.title}
                            onChange={handleChange}
                            required
                            style={{width: 300}}
                            placeholder='Ticket Title'
                        />
                       </Box>

                       <Box>
                           <Typography>Description</Typography>
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
                       </Box>

                       <Box>
                           <Typography>Location</Typography>
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
                       </Box>
                      
                       <Box>
                           <Typography>Start Date</Typography>
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
                       </Box>

                       <Box>
                           <Typography>End Date</Typography>
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
                       </Box>

                       <Box>
                           <Typography>Standard Amount</Typography>
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
                       </Box>

                       <Box>
                           <Typography>VIP Amount</Typography>
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
                       </Box>
                        
                       <Box>
                           <Typography>Cover Image</Typography>
                           <TextField
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleImageChange}
                            style={{width: 300}}
                            placeholder='Image'
                        />
                       </Box>
                        
                        
                        
                        
                    <button type="submit" className="btn btn-primary" style={{gridColumn: '1 / 3'}}>
                       Create Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TicketForm;