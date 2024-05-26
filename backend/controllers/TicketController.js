const Ticket = require('../models/ticketModel');
const Joi = require('joi');
const { upload, fileSizeFormatter } = require('../config/fileUpload');
const path = require('path');
const fs = require('fs');

// Joi schema for ticket validation
const ticketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    standardAmount: Joi.number().required(),
    vipAmount: Joi.number().required(),
    location: Joi.string().required(),
});

// Create a new ticket
const createTicket = async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = ticketSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, description, startDate, endDate, standardAmount, vipAmount, location } = req.body;

        let imageInfo = {};
        if (req.file) {
            const imagePath = `${process.env.REACT_APP_BACKEND_API}/uploads/${req.file.filename}`;
            imageInfo = {
                fileName: req.file.filename,
                filePath: imagePath,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            };
        }

        const ticket = await Ticket.create({
            title,
            description,
            startDate,
            endDate,
            standardAmount,
            vipAmount,
            location,
            image: imageInfo,
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({isDeleted:false});
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        //if (ticket.isDeleted) return res.status(404).json({ message: 'Ticket is Deleted By Admin' });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
    try {
        // Validate request body against Joi schema
        // const { error } = ticketSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        // let imageInfo = {};
        // if (req.file) {
        //     const imagePath = path.join('uploads', req.file.filename.replace(/\\/g, '/'));
        //     imageInfo = {
        //         fileName: req.file.filename,
        //         filePath: imagePath,
        //         fileType: req.file.mimetype,
        //         fileSize: fileSizeFormatter(req.file.size, 2),
        //     };
        // }

        // Find the ticket by ID
        let ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update ticket properties
        ticket.title = req.body?.title?.trim();
        ticket.description = req.body?.description?.trim();
        ticket.startDate = req.body.startDate;
        ticket.endDate = req.body.endDate;
        ticket.standardAmount = req.body.standardAmount;
        ticket.vipAmount = req.body.vipAmount;
        ticket.location = req.body.location;

        // Save the updated ticket
        const updatedTicket = await ticket.save();
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({_id:req.params.id});
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        await Ticket.updateOne({_id:req.params.id},{$set:{isDeleted:true}});
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const upcomingTickets = async (req, res) => {
    try {
        const currentDate = new Date();
        const tickets = await Ticket.find({
            startDate: { $gt: currentDate },
            isDeleted:false
        });
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const availableTickets = async (req, res) => {
    try {
        const currentDate = new Date();
        const tickets = await Ticket.find({
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
            isDeleted:false
        });
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    availableTickets,
    upcomingTickets
};