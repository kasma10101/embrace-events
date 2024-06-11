import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";
import {
  getTicketsThunk,
  deleteTicketThunk,
  updateTicketThunk,
} from "./redux/ticketSlice";
// import TicketForm from './TicketForm';
import "bootstrap/dist/css/bootstrap.min.css";
import TicketForm from "./TicketForm";
import moment from "moment";
import { Box, Modal, TextField, Typography } from "@mui/material";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
//Material UI Imports
import { Button } from "@mui/material";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../style/ticket.css";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});
const sxStyles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "200px",
    width: "60%",
    bgcolor: "#fff",
    boxShadow: 24,
    paddingTop: "120px",
    color: "black",
    zIndex: 10,
    maxHeight: "80vh",
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "1px",
    },
  },
};

const Ticket = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  useEffect(() => {
    dispatch(getTicketsThunk());
  }, [dispatch]);

  const data = useMemo(() => tickets, [tickets]);
 
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      let availableData = [];
      for (const ticket of data) {
        let eachData = {
          id: ticket._id,
          title: ticket.title,
          description: ticket.description,
          startDate: ticket.startDate,
          eventEndDate: ticket.eventEndDate,
          eventStartedDate: ticket.eventStartedDate,
          endDate: ticket.endDate,
          standardAmount: ticket.standardAmount,
          vipAmount: ticket.vipAmount,
          location: ticket.location,
          image: ticket.image,
        };
        availableData.push(eachData);
      }
      setTableData(availableData);
    }
  }, [data]);

  const [openEditModal, setOpenEdit] = useState(false);

  const handleEdit = (ticket) => {
    setEditingTicket({
      ...ticket,
      startDate: formatDate(ticket.startDate),
      endDate: formatDate(ticket.endDate),
      eventStartedDate: formatDate(ticket.eventStartedDate),
      eventEndDate: formatDate(ticket.eventEndDate),
    });
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTicketThunk(id));
    dispatch(getTicketsThunk());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTicket((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    dispatch(getTicketsThunk());
  };

  const handleclose = () => {
    setOpenEdit(false);
    setEditingTicket(null);
  };

  const saveEdit = async () => {
    await dispatch(
      updateTicketThunk({ id: editingTicket._id, ticketData: editingTicket })
    );
    dispatch(getTicketsThunk());
    setOpenEdit(false);
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

    doc.save("mrt-pdf-example.pdf");
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row?.title || "Unknown"}`,
        id: "title",
        header: "Ticket Title",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              gap: "1rem",
              width: 200,
              overflowWrap: "break-word",
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.description}`,
        filterVariant: "autocomplete",
        header: "Ticket description",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              width: 200,
              overflowWrap: "break-word",
              whiteSpace: "break-spaces",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.location}`,
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Location",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.startDate}`,
        enableClickToCopy: true,
        header: "Ticket Sale Start date",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LL")}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.endDate}`,
        enableClickToCopy: true,
        header: "Ticket Sale End date",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LL")}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.eventStartedDate}`,
        enableClickToCopy: true,
        header: "Actual Event Start date",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LL")}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.eventEndDate}`,
        enableClickToCopy: true,
        header: "Actual Event End date",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LL")}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.standardAmount}`,
        enableClickToCopy: true,
        header: "Standard Amount",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.vipAmount}`,
        enableClickToCopy: true,
        header: "VIP Amount",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {renderedCellValue}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.image?.filePath}`,
        header: "Image",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            <img
              src={renderedCellValue}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.createdAt}`,
        enableClickToCopy: true,
        header: "Created At",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LLL")}
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row?.updatedAt}`,
        enableClickToCopy: true,
        header: "Updated At",
        size: 300,
        Cell: ({ renderedCellValue, row }) => (
          <Box sx={{ width: 200, overflowWrap: "break-word" }}>
            {moment(renderedCellValue).format("LLL")}
          </Box>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ width: 100, overflowWrap: "break-word" }}>
            <Button
              onClick={() => {
                handleEdit(row.original);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(row.original._id)}>
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
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
   
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className="text-dark mh-100" style={{ marginTop: "3%" }}>
      <div
        className="d-flex p-3"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <button
          className={showForm ? "secondary_btn" : "primary_btn"}
          onClick={() => setShowForm(false)}
        >
          Show Tickets
        </button>
        <button
          className={showForm ? "primary_btn" : "secondary_btn"}
          onClick={() => {
            setShowForm(true);
            setEditingTicket(null);
          }}
        >
          Create Ticket
        </button>
      </div>
      {showForm ? (
        <TicketForm onFormSubmit={handleFormSubmit} />
      ) : (
        <>
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
              sx={{
                color: "#13A014",
                textAlign: "center",
                margin: "10px 0",
                paddingTop: "3%",
              }}
            >
              Tickets
            </Typography>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {data && (
              <div className="table-responsive">
                <MaterialReactTable table={table} />
              </div>
            )}
          </div>
        </>
      )}

      <Modal
        open={openEditModal}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...sxStyles.modal,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            marginTop: "2rem",
            padding: "24rem 0 2rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "5px", color: "#13A014", fontWeight: "bold" }}
          >
            Update Ticket{" "}
          </Typography>

          <Typography sx={{ color: "#13A014" }}>Title</Typography>
          <TextField
            type="text"
            className="form-control"
            name="title"
            value={editingTicket?.title || ""}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="Ticket Title"
          />

          <Typography sx={{ color: "#13A014" }}>Description</Typography>
          <TextField
            className="form-control"
            name="description"
            value={editingTicket?.description || ""}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="Ticket Description"
            multiline
            rows={5}
          />

          <Typography sx={{ color: "#13A014" }}>Ticket Sale Start Date</Typography>
          <TextField
            type="date"
            className="form-control"
            name="startDate"
            value={editingTicket?.startDate}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="Start Date"
          />

          <Typography sx={{ color: "#13A014" }}>Ticket Sale End Date</Typography>
          <TextField
            type="date"
            className="form-control"
            name="endDate"
            value={editingTicket?.endDate}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="End Date"
          />

          <Typography sx={{ color: "#13A014" }}>Actual Event Start Date</Typography>
          <TextField
            type="date"
            className="form-control"
            name="eventStartedDate"
            value={editingTicket?.eventStartedDate}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="Start Date"
          />

          <Typography sx={{ color: "#13A014" }}>Actual Event End Date</Typography>
          <TextField
            type="date"
            className="form-control"
            name="eventEndDate"
            value={editingTicket?.eventEndDate}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="End Date"
          />

          <Typography sx={{ color: "#13A014" }}>Standard Amount</Typography>
          <TextField
            type="number"
            className="form-control"
            name="standardAmount"
            value={editingTicket?.standardAmount}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="Standard Amount"
          />

          <Typography sx={{ color: "#13A014" }}>VIP Amount</Typography>
          <TextField
            type="number"
            className="form-control"
            name="vipAmount"
            value={editingTicket?.vipAmount}
            onChange={handleChange}
            required
            style={{ width: 300 }}
            placeholder="VIP Amount"
          />

          <button
            className="save_btn"
            style={{ width: 80, margin: 5 }}
            onClick={saveEdit}
          >
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default Ticket;
