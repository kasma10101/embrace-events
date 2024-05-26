const express = require('express');
const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    availableTickets,
    upcomingTickets
} = require('../controllers/TicketController');
const { upload } = require('../config/fileUpload');

// Route to create a new ticket
router.post('/', upload.single('image') ,createTicket);

// Route to get all tickets
router.get('/', getTickets);

router.get('/availableTickets', availableTickets);

router.get('/upcomingTickets', upcomingTickets);

// Route to get a single ticket by ID
router.get('/:id', getTicketById);

// Route to update a ticket by ID
router.put('/:id', upload.single('image'), updateTicket);

// Route to delete a ticket by ID
router.delete('/:id', deleteTicket);

module.exports = router;