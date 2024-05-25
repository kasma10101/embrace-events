import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { getAllTransactionsThunk } from './redux/transactionSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(getAllTransactionsThunk());
    }, [dispatch]);

    const data = useMemo(() => transactions, [transactions]);
    const columns = useMemo(() => [
        { Header: 'No', accessor: 'no', Cell: ({ row }) => row.index + 1 },
        { Header: 'Event Name', accessor: 'ticketID.title' },
        { Header: 'Ticket Type', accessor: 'ticketType' },
        { Header: 'Location', accessor: 'loction' },
        { Header: 'Phone', accessor: 'phone' },
        { Header: 'First Name', accessor: 'fname' },
        { Header: 'Last Name', accessor: 'lname' },
        { Header: 'Currency', accessor: 'currency' },
        { Header: 'Transaction Reference', accessor: 'tx_ref' },
        { Header: 'Amount', accessor: 'amount' },
        { Header: 'Ticket Number', accessor: 'ticketNumber' },
        { Header: 'Status', accessor: 'status' },
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
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
    );

    return (
        <div style={{ paddingTop: '10%', width: '90%', margin: '0px auto', overflow: 'auto', scrollbarWidth: 'none' }}>
            <h2>Transactions</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className='table-responsive'>
                <table className="table table-bordered table-striped" style={{ fontSize: "14px", width: "100%" }} {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} style={{ padding: 30 }}>{column.render('Header')}</th>
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
                                        <td {...cell.getCellProps()} style={{ padding: 15 }}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <ul className="pagination justify-content-center align-center">
                    <span style={{ padding: "5px", fontSize: '15px' }}>
                        page{' '}
                        <strong>
                            <em style={{ color: '#799a63' }}>{pageIndex + 1}</em> of {pageOptions.length}
                        </strong>
                    </span>
                    <select className='page-link' style={{ maxWidth: '90px', maxHeight: '37.5px', color: '#799a63' }}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }} >
                        {[5, 10, 15, 20, 30, 40, 50].map((pageSize, index) => (
                            <option key={index} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <li>
                        <button style={{ color: '#799a63' }} className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    </li>
                    <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
                        <button style={{ color: '#799a63' }} className="page-link" onClick={previousPage} disabled={!canPreviousPage}>Previous</button>
                    </li>
                    <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
                        <button style={{ color: '#799a63' }} className="page-link" onClick={nextPage} disabled={!canNextPage}>Next</button>
                    </li>
                    <li>
                        <button style={{ color: '#799a63' }} className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Transaction;