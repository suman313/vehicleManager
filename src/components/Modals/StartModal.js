import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";

function StartModal({ show, handleClose, setRideStarted, sessId,riderStartingTime, setRideStartingTime }) {
  const startRide = async (e) => {
    e.preventDefault();
    setRideStarted(true);
    setRideStartingTime(new Date());
    const url = "http://20.121.141.248:5000/start_ride";
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        url,
        {
          rider_phone_no: "",
          session_id: sessId,
          start_time: riderStartingTime,
          event_history: [],
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      console.log(response.data);
      handleClose();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };
  return (
    <>
      <Modal show={show} onClose={handleClose}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Token has been sent to your registered mobile number.
            </p>
            <p>{sessId}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="green" onClick={startRide}>
            Start Ride
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StartModal;
