import { useEffect, useState, useMemo } from "react";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Modal,
  Typography,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

function DataTable({ data }) {
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

    doc.save("mrt-pdf-example.pdf");
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.email}`,
        enableClickToCopy: true,
        header: "Email",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>{renderedCellValue}</Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.createdAt}`,
        filterVariant: "autocomplete",
        header: "Subscribed Date",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{}}>{moment(renderedCellValue).format("LLL")}</Box>
        ),
      },
    ],
    []
  );
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleclose = () => {
    setOpenEditModal(false);
  };

  const table = useMaterialReactTable({
    columns,
    data,
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
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: "rgba(5, 63, 107,0.1)",
    }),
    muiTableBodyRowProps: { hover: false },

    muiTableHeadCellProps: {
      sx: {
        background: "rgba(227, 255, 229)",
        color: "black",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        background: "rgba(78, 81, 110,0.1)",
        color: "black",
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
      color: "secondary",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data in CSV
        </Button>

        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
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
    <div>
      <MaterialReactTable table={table} />
      <Modal
        open={openEditModal}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sxStyle.modal}></Box>
      </Modal>
    </div>
  );
}

function Emails({ token }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/api/subscribe/getAllEmails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const emails = await response.json();
    setLoading(false);
    if (!emails.error) {
        if(emails.length>0){
          const organizedEmails= emails.map(e=>{
           return {...e,createdAt:moment(e.createdAt).format("LLL")}
          })
         setEmails(organizedEmails);
        }
        else{
          setEmails(emails)
        }
    } else {
      setError(emails.error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (emails && emails.length > 0) {
      let availableData = [];
      for (const data of emails) {
        let eachData = {
          email: data.email,
          createdAt: data?.createdAt,
        };
        availableData.push(eachData);
      }
      setTableData(availableData);
    }
  }, [emails]);
  return (
    <div
      style={{
        paddingTop: "3%",
        width: "90%",
        margin: "0px auto",
        overflow: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Typography
        variant="h3"
        sx={{color: "#13A014", textAlign: "center", margin: "10px 0", paddingTop: "3%" }}
      >
        Subscribers
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {emails && (
        <div className="table-responsive">
          <DataTable data={tableData} />
        </div>
      )}
    </div>
  );
}

export default Emails;