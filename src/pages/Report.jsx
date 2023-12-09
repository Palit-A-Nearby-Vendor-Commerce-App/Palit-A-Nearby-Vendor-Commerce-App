import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { UserContext } from "../UserContext";
import reportBg from "../assets/images/reportpng.png";
import { Alert } from "../assets/styles/styles.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Report = () => {
  const { user } = useContext(UserContext);
  const reportRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    handleCloseConfirmDialog();
    handleSubmitReport(e);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleOpenConfirmDialog();
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    const messageContent = reportRef.current.querySelector(
      'textarea[name="message"]'
    ).value;

    if (!messageContent.trim()) {
      alert("Please enter a message before submitting the report");
      return;
    }

    const reportData = {
      senderId: user.account,
      messageContent: messageContent,
      timestamp: new Date(),
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/createReport`,
        reportData
      );
      console.log(response.data);

      setAlertMessage("Report created successfully!");
      handleOpenDialog();
      setShowAlert(true);

      reportRef.current.reset();

      setTimeout(handleAlertClose, 3000);
    } catch (error) {
      console.log(error);
      alert("Report creation failed");
    }
  };

  return (
    <div className="w-full h-screen bg-stroke-bg bg-center bg-no-repeat bg-cover font-custom flex flex-col items-center">
      <NavigationBar />
      <div className="my-auto bg-blue-500 w-2/3 h-3/10 rounded-2xl shadow-2xl">
        <div className="h-full flex">
          <div className="my-auto w-full h-full bg-white px-14 py-20 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-10">Submit a report</h1>
            <p className="text-xl mb-5">Details of the report</p>
            <form
              ref={reportRef}
              onSubmit={handleFormSubmit}
              className="flex flex-col text-left"
            >
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                className="p-4 mb-5 border-b border-dark"
              />
              <input
                type="submit"
                value="Submit"
                className="w-1/3 bg-blue-500 rounded-3xl text-white p-2 text-lg font-semibolds cursor-pointer"
              />
            </form>
          </div>
          <img
            src={reportBg}
            alt="Report bg"
            className="col-span-1 w-[700px]"
          />
        </div>
      </div>
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "25%" }}
        >
          {alertMessage}
        </Alert>
      )}

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        PaperComponent={() => (
          <div className="rounded-xl shadow-2xl p-2 bg-white">
            <DialogTitle style={{ cursor: "move" }}>
              Confirm Submission
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to submit the report?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseConfirmDialog}
                color="primary"
                style={{ backgroundColor: "#E8594F", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSubmit}
                color="primary"
                style={{ backgroundColor: "#0575B4", color: "white" }}
              >
                Confirm
              </Button>
            </DialogActions>
          </div>
        )}
        aria-labelledby="draggable-dialog-title"
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperComponent={() => (
          <div className="rounded-xl shadow-2xl p-2 bg-white">
            <DialogTitle style={{ cursor: "move" }}>
              Report Submission
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Thank you for submitting the report! We will review it shortly.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
        )}
        aria-labelledby="draggable-dialog-title"
      />
    </div>
  );
};

export default Report;
