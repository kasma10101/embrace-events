import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { getAllTransactionsThunk } from './redux/transactionSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from './Table';
import { Typography } from '@mui/material';

const Transaction = () => {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector((state) => state.transactions);
    const data = useMemo(() => transactions, [transactions]);

    useEffect(() => {
        dispatch(getAllTransactionsThunk());
    }, [dispatch]);

    const [tableData,setTableData]=useState([])
    useEffect(()=>{
        if(data&&data.length>0){
            let availableData=[]
            for (const transaction of data){
                let eachData={
                    ticket:transaction.ticketID?.title,
                    location:transaction.ticketID?.location,
                    amount:transaction.amount,
                    email:transaction.email,
                    name:transaction.fname+" "+transaction.lname,
                    phone:transaction.phone,
                    status:transaction.status,
                    ticketNumber:transaction.ticketNumber,
                    ticketType:transaction.ticketType,
                    tx_ref:transaction.tx_ref,
                    createdAt: transaction?.createdAt
                }
                availableData.push(eachData)
            }
            setTableData(availableData)
        }
    },[data])
   
    
    return (
        <div style={{ paddingTop: '3%', width: '90%', margin: '0px auto', overflow: 'auto', scrollbarWidth: 'none' }}>
            <Typography
        variant="h3"
        sx={{color: "#13A014", textAlign: "center", margin: "10px 0", paddingTop: "3%" }}
      >
        Transactions
      </Typography>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
           {data&&<div className='table-responsive'>
                    <DataTable data={tableData} />
            </div>}
           
        </div>
    );
};

export default Transaction;