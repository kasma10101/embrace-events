import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { getTicketsThunk, deleteTicketThunk } from './redux/ticketSlice';
// import TicketForm from './TicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import TicketForm from './TicketForm';
import moment from 'moment'

const Ticket = () => {
    const dispatch = useDispatch();
    const { tickets, loading, error } = useSelector((state) => state.tickets);
    const [showForm, setShowForm] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);
    useEffect(() => {
        dispatch(getTicketsThunk());
    }, [dispatch]);
    
    const data = useMemo(() => tickets, [tickets]);
    const columns = useMemo(() => [
        { Header: 'No', accessor: 'no', Cell: ({ row }) => row.index + 1},
        { Header: 'Title', accessor: 'title' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Start Date', accessor: 'startDate', Cell: ({ row }) => moment(row.original.startDate).format('LL') },
        { Header: 'End Date', accessor: 'endDate',Cell: ({ row }) => moment(row.original.endDate).format('LL') },
        { Header: 'Standard Amount', accessor: 'standardAmount' },
        { Header: 'VIP Amount', accessor: 'vipAmount' },
        {Header: 'Location', accessor: 'location' },
        {Header: 'Image', accessor: 'image', Cell: ({ row }) => <img src={row.original.image.filePath} alt={row.original.title} style={{ width: '200px', height: '100px' }} />},
        {
            Header: 'Actions',
            Cell: ({ row }) => (
                <>
                    <button className="btn btn-warning btn-sm" style={{width: 80, margin: 5}} onClick={() => handleEdit(row.original)}>Edit</button>
                    <button className="btn btn-danger btn-sm" style={{width: 80, margin: 5}} onClick={() => handleDelete(row.original._id)}>Delete</button>
                </>
            ),
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: tickets,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
    );

    const handleEdit = (ticket) => {
        // setShowForm(true);
        setEditingTicket(ticket);
    };

    const handleDelete = async (id) => {
        await dispatch(deleteTicketThunk(id));
        dispatch(getTicketsThunk());
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        dispatch(getTicketsThunk());
    };


    return (
        <div className="text-dark mh-100" style={{marginTop: '10%', width: '100%',}}>
            <div className='container m-0'>
            <div className="d-flex p-3" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <button  className={showForm ? 'btn btn-primary mx-2' : 'btn btn-secondary  disabled' } onClick={() => setShowForm(false)}>Show Tickets</button>
                <button  className={showForm ? 'btn btn-secondary  disabled' : 'btn btn-primary mx-2'} 
                onClick={() => {
                    setShowForm(true)
                    setEditingTicket(null)
                }}>Create Ticket</button>
            </div>
                       {showForm ? (
               !editingTicket ?  <TicketForm  onFormSubmit={handleFormSubmit} /> : <TicketForm  onFormSubmit={handleFormSubmit} editingTicket={editingTicket}/>
            ) : (
                <>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {/* <div className='table-responsive'st> */}
                    <table className="table table-bordered table-striped" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} style={{padding: '15px 30px'}}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} style={{padding: 15}}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {/* </div> */}
                    <div>
                        <ul className="pagination justify-content-center align-center">
                            <span style={{padding: "5px", fontSize: '15px'}}>
                                    page{' '}
                                    <strong>
                                        <em style={{color: '#799a63'}}>{pageIndex + 1}</em> of {pageOptions.length}
                                    </strong>
                            </span>
                            <select className='page-link' style={{maxWidth: '90px', maxHeight: '37.5px', color: '#799a63'}}
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }} >
                            {[5, 10, 15, 20, 30, 40, 50].map((pageSize,index) => (
                                <option key={index} value={pageSize}>
                            Show {pageSize}
                                </option>
                            ))}
                            </select>
                        <li>
                            <button style={{color: '#799a63'}} className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                        </li>
                        <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
                            <button style={{color: '#799a63'}} className="page-link" onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
                        </li>
                        <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
                            <button style={{color: '#799a63'}} className="page-link" onClick={nextPage} disabled={!canNextPage}>Next</button>
                        </li>
                        <li>
                            <button style={{color: '#799a63'}} className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                        </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};

export default Ticket;