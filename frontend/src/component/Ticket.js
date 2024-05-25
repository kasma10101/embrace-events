import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { getTicketsThunk, deleteTicketThunk } from '../redux/ticketSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        { Header: 'No', accessor: 'no', Cell: ({ row }) => row.index + 1 },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Start Date', accessor: 'startDate', Cell: ({ row }) => moment(row.original.startDate).format('LL') },
        { Header: 'End Date', accessor: 'endDate',Cell: ({ row }) => moment(row.original.endDate).format('LL') },
        { Header: 'Standard Amount', accessor: 'standardAmount' },
        { Header: 'VIP Amount', accessor: 'vipAmount' },
        { Header: 'Location', accessor: 'location' },
        { Header: 'Image', accessor: 'image', Cell: ({ row }) => <img src={row.original.image.filePath} alt={row.original.title} style={{ width: '200px', height: '100px' }} /> },
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
        setShowForm(true);
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
        <div style={{paddingTop: '10%'}}>
            <h1>Tickets</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
                <table className="table table-bordered table-striped" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} style={{padding: 23}}>{column.render('Header')}</th>
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
                                        <td {...cell.getCellProps()}  style={{padding: 15}}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            <div>
                <ul className="pagination justify-content-center align-center">
                    <span style={{ padding: "5px", fontSize: '15px' }}>
                        page{' '}
                        <strong>
                            <em style={{ color: '#789461' }}>{pageIndex + 1}</em> of {pageOptions.length}
                        </strong>
                    </span>
                    <select className='page-link' style={{ maxWidth: '90px', maxHeight: '37.5px', color: '#799a63' }}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }} >
                        {[5, 10, 15, 20, 30, 40, 50].map((pageSize, index) => (
                            <option key={index} value={pageSize} style={{color: '#799a63'}}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <li>
                        <button className="page-link" style={{color: '#799a63'}} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
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
        </div>
    );
};

export default Ticket;