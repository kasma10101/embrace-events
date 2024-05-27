import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { getTicketsThunk, deleteTicketThunk, updateTicketThunk } from './redux/ticketSlice';
// import TicketForm from './TicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TicketForm from './TicketForm';
import moment from 'moment'
import { Box, Modal, TextField, Typography } from '@mui/material';
//MRT Imports
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';


import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
//Material UI Imports
import { Button, } from '@mui/material';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const sxStyle = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(33, 35, 38, 0.7)',
        border: '2px solid #000',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        color: 'white'
    },
    button: {
        textTransform: "inherit",
        fontWeight: "700"
    }
}

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});
const sxStyles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '200px',
        width: "60%",
        bgcolor: '#fff',
        boxShadow: 24,
        p: 4,
        color: 'white',
        zIndex: 10,
        maxHeight: "80vh",
        overflow: "auto",
        color: "white",
        "::-webkit-scrollbar": {
            width: "1px",
        },
    },
}

const Ticket = () => {
    const dispatch = useDispatch();
    const { tickets, loading, error } = useSelector((state) => state.tickets);
    const [showForm, setShowForm] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    useEffect(() => {
        dispatch(getTicketsThunk());
    }, [dispatch]);

    const data = useMemo(() => tickets, [tickets]);
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        if (data && data.length > 0) {
            let availableData = []
            for (const ticket of data) {
                let eachData = {
                    id: ticket._id,
                    title: ticket.title,
                    description: ticket.description,
                    startDate: ticket.startDate,
                    endDate: ticket.endDate,
                    standardAmount: ticket.standardAmount,
                    vipAmount: ticket.vipAmount,
                    location: ticket.location,
                    image: ticket.image
                }
                availableData.push(eachData)
            }
            setTableData(availableData)
        }
    }, [data])

    const [openEditModal, setOpenEdit] = useState(false)

    const handleEdit = (ticket) => {
        setEditingTicket(ticket);
        setOpenEdit(true)
    };


    const handleDelete = async (id) => {
        await dispatch(deleteTicketThunk(id));
        dispatch(getTicketsThunk());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingTicket((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        dispatch(getTicketsThunk());
    };


    const handleclose = () => {
        setOpenEdit(false)
        setEditingTicket(null)
    }

    const saveEdit = async () => {
        await dispatch(updateTicketThunk({ id: editingTicket._id, ticketData: editingTicket }));
        dispatch(getTicketsThunk());
        setOpenEdit(false)
    }

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    };

    const handleExportRowsPdf = (rows) => {
        const doc = new jsPDF();
        const tableData = rows.map((row) => Object.values(row.original));
        const tableHeaders = columns.map((c) => c.header);

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save('mrt-pdf-example.pdf');
    };

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => `${row?.title || "Unknown"}`,
                id: 'title',
                header: 'Ticket Title',
                size: 250,
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            gap: '1rem',
                            width: 200,
                            overflowWrap: 'break-word'
                        }}
                    >
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.description}`,
                filterVariant: 'autocomplete',
                header: 'Ticket description',
                size: 200,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.location}`,
                enableClickToCopy: true,
                filterVariant: 'autocomplete',
                header: 'Location',
                size: 200,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.startDate}`,
                enableClickToCopy: true,
                header: 'Start date',
                size: 300,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {moment(renderedCellValue).format('LL')}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.endDate}`,
                enableClickToCopy: true,
                header: 'End date',
                size: 300,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {moment(renderedCellValue).format('LL')}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.standardAmount}`,
                enableClickToCopy: true,
                header: 'Standard Amount',
                size: 300,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.vipAmount}`,
                enableClickToCopy: true,
                header: 'VIP Amount',
                size: 300,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        {renderedCellValue}
                    </Box>
                ),
            },
            {
                accessorFn: (row) => `${row?.image?.filePath}`,
                header: 'Image',
                size: 300,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ width: 200, overflowWrap: 'break-word' }}>
                        <img src={renderedCellValue} style={{ width: 100, height: 100, objectFit: 'cover' }} />

                    </Box>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <Box sx={{ width: 100, overflowWrap: 'break-word' }}>
                        <Button onClick={() => {
                            handleEdit(row.original)
                            console.log(row.original);
                        }}>Edit</Button>
                    </Box>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <Box sx={{ width: 100, overflowWrap: 'break-word' }}>
                        <Button onClick={() => handleDelete(row.original.id)}>Delete</Button>
                    </Box>
                ),
            },
        ],
        [],
    );



    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            columnPinning: {
                left: ['mrt-row-expand', 'mrt-row-select'],
                right: ['mrt-row-actions'],
            },
        },
        mrtTheme: (theme) => ({
            baseBackgroundColor: 'rgba(5, 63, 107,0.1)',
        }),
        muiTableBodyRowProps: { hover: false },

        muiTableHeadCellProps: {
            sx: {
                background: 'rgba(227, 255, 229)',
                color: "black",
            },
        },
        muiTableBodyCellProps: {
            sx: {
                background: 'rgba(78, 81, 110,0.1)',
                color: "black"

            },
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
            color: "secondary",
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Data in CSV
                </Button>

                <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                        handleExportRowsPdf(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Rows in Pdf
                </Button>
            </Box>
        ),

    });


    return (
        <div className="text-dark mh-100" style={{ marginTop: '3%', }}>
            <div className="d-flex p-3" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button className={showForm ? 'btn btn-primary mx-2' : 'btn btn-secondary  disabled'} onClick={() => setShowForm(false)}>Show Tickets</button>
                <button className={showForm ? 'btn btn-secondary  disabled' : 'btn btn-primary mx-2'}
                    onClick={() => {
                        setShowForm(true)
                        setEditingTicket(null)
                    }}>Create Ticket</button>
            </div>
            {showForm ? (
                <TicketForm onFormSubmit={handleFormSubmit} />
            ) : (
                <>
                    <div style={{ paddingTop: '3%', width: '90%', margin: '0px auto', overflow: 'auto', scrollbarWidth: 'none' }}>
                        <h2>Tickets</h2>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-danger">{error}</p>}
                        {data && <div className='table-responsive'>
                            <MaterialReactTable table={table} />
                        </div>}

                    </div>
                </>
            )}

            <Modal
                open={openEditModal}
                onClose={handleclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...sxStyles.modal, display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexDirection: "column", margin: 0, }}>
                    <Typography variant='h5'>Update Ticket </Typography>
                    <TextField
                        type="text"
                        className="form-control"
                        name="title"
                        value={editingTicket?.title || ""}
                        onChange={handleChange}
                        required

                        style={{ width: 300 }}
                        placeholder='Ticket Title'
                    />
                    <TextField
                        className="form-control"
                        name="description"
                        value={editingTicket?.description || ''}
                        onChange={handleChange}
                        required
                        style={{ width: 300 }}
                        placeholder='Ticket Description'
                        multiline
                        rows={5}
                    />
                    <TextField
                        type="number"
                        className="form-control"
                        name="standardAmount"
                        value={editingTicket?.standardAmount}
                        onChange={handleChange}
                        required
                        style={{ width: 300 }}
                        placeholder='Standard Amount'
                    />
                    <TextField
                        type="number"
                        className="form-control"
                        name="vipAmount"
                        value={editingTicket?.vipAmount}
                        onChange={handleChange}
                        required
                        style={{ width: 300 }}
                        placeholder='VIP Amount'
                    />

                    <button className="btn btn-success btn-sm" style={{ width: 80, margin: 5 }} onClick={saveEdit}>Save</button>

                </Box>

            </Modal>
        </div>
    );
};

export default Ticket;