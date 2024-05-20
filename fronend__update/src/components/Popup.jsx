import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Modal, TextField, Box, Typography } from "@material-ui/core";
import "../style/popup.css";

const Popup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  //   const theme = useTheme();
  //   const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setAge("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Phone:", phone);
    handleClose();
  };

  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={handleOpen}
        className="register"
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          background: "#f1f8ff",
          border: "2px solid #12372a",
          margin: "0 0 3rem",
          "&:hover": {
            background: "#12372a",
          },
        }}
      >
        Buy ticket <FaAngleRight />
      </Button> */}
      <button onClick={handleOpen} className="register">
        Buy ticket
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            background: "#f1f8ff",
            padding: "0rem 2rem",
            borderRadius: "10px",
            border: "1px solid #12372a",
          }}
        >
          <FaTimes
            style={{
              fontSize: "2em",
              float: "right",
              position: "relative",
              top: "2.5rem",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            style={{
              textAlign: "center",
              padding: "2rem 1rem",

              fontSize: "1.8em",
            }}
          >
            Fill the form
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              id="age"
              label="Age"
              variant="outlined"
              value={age}
              type="number"
              onChange={(e) => setAge(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                style={{
                  margin: "2rem auto",
                  display: "flex",
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;
