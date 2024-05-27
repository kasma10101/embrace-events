import React,{ useMemo, useState } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import BackpackIcon from "@mui/icons-material/Backpack";


import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Modal,
} from '@mui/material';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
//Icons Imports
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const sxStyle = {
  modal:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'rgba(33, 35, 38, 0.7)',
      border: '2px solid #000',
      borderRadius:"20px",
      boxShadow: 24,
      p: 4,
      color:'white'
  },
  button:{
    textTransform:"inherit",
    fontWeight:"700"
  }
}

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

const DataTable = ({data}) => {
  
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

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
        accessorFn: (row) => `${row?.title||"Unknown"}`, 
        id: 'title', 
        header: 'Ticket Title',
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.ticketType}`, 
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Type',
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.loction}`, 
        enableClickToCopy: true,
        header: 'Location',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.phone}`, 
        enableClickToCopy: true,
        header: 'Phone',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.email}`, 
        enableClickToCopy: true,
        header: 'Email',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.name}`, 
        enableClickToCopy: true,
        header: 'Name',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.tx_ref}`, 
        enableClickToCopy: true,
        header: 'Transaction Reference',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.amount}`, 
        header: 'Amount',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.ticketNumber}`, 
        header: 'Ticket Number',
        enableClickToCopy: true,
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.status}`, 
        filterVariant: 'autocomplete',
        header: 'Status',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.createdAt}`, 
        filterVariant: 'autocomplete',
        header: 'Created Date',
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>
             {moment(renderedCellValue).format('LL')}
          </Box>
        ),
      },
      
    ],
    [],
  );

  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditModal, setOpenEditModal]= useState(false)

  const handleclose=()=>{
    setOpenEditModal(false)
    setSelectedRow(null)
  }

  

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
      baseBackgroundColor:'rgba(5, 63, 107,0.1)',
    }),
    muiTableBodyRowProps: { hover: false },
  
    muiTableHeadCellProps: {
      sx: {
        background: 'rgba(227, 255, 229)',
        color:"black",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        background:'rgba(78, 81, 110,0.1)',
        color:"black"

      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
      color:"secondary",
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
        {/* <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button> */}

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

        {/* <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRowsPdf(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows in Pdf
        </Button> */}
     
       
      </Box>
    ),

  });



  return (
   <div>
     <MaterialReactTable table={table} />
     <Modal
          open={openEditModal}
          onClose={handleclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         <Box sx={sxStyle.modal}>
            jdslnls
         </Box>
        
    </Modal>
    
   </div>
);
};



export default DataTable;
