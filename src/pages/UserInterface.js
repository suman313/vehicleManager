import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./userinterface.css";
import UserImage from "../assets/userInfoCard/userImage.svg";
import Vaccine from "../components/UserInfoCards/Vaccine/Vaccine";
import License from "../components/UserInfoCards/License/License";
import Experience from "../components/UserInfoCards/Experience/Experience";
import StartBtn from "../components/Button/startButton/StartBtn";
import Uphill from "../components/EventCards/Uphill";
// images
import uphill from "../assets/eventCards/uphill.svg";
import downhill from "../assets/eventCards/downhill.svg";
import goodBreak from "../assets/eventCards/goodBreak.svg";
import hardAcceleration from "../assets/eventCards/hardAcceleration.svg";
import hardBreak from "../assets/eventCards/hardBreak.svg";
import reset from "../assets/eventCards/reset.svg";
import leftTurn from "../assets/eventCards/leftTurn.svg";
import rightTurn from "../assets/eventCards/rightTurn.svg";
import walking from "../assets/eventCards/walking.svg";
import straight from "../assets/eventCards/straightRoad.svg";
import uTurn from "../assets/eventCards/uTurn.svg";
import scooter from "../assets/scooter.svg";

import Map from "../components/Map/Map";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import StartModal from "../components/Modals/StartModal";
import EventModal from "../components/Modals/EventModal";
import axios from "axios";
import { useParams } from "react-router-dom";
function UserInterface() {
  const [rideStartingTime, setRideStartingTime] = useState(new Date());
  const [rideStopTime, setRideStopTime] = useState(new Date());
  const [eventType, setEventType] = useState("");
  const [rideStarted, setRideStarted] = useState(false);
  const [sessId, setSessId] = useState("");
  const {phone_no} = useParams();
  const [riderDetails, setRiderDetails] = useState({})

  useEffect(()=> {
    try {
      const {data} = axios.post("http://20.121.141.248:5000/get_all_events_per_rider",
     { phone_no: phone_no,},
     {
      headers : {
        "x-access-tokens" : sessionStorage.getItem("token")
      }
     }
      )
     setRiderDetails(data.response.event_list_rider);
    } catch (error) {
      console.log(error)
    }
  })

  const generateSessId = async () => {
    const url = "http://20.121.141.248:5000/generate_session_id";
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        url,
        {
          phone_no: 1122331,
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      console.log(response.data);
      setSessId();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleStart = () => {};

  const [show, setShow] = useState(false);
  const [showEventModal, setShowEventModal] = useState();

  const handleShow = () => {
    // generate session id
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };

  return (
    <>
      <StartModal
        show={show}
        handleClose={handleClose}
        handleStart={handleStart}
        setRideStarted={setRideStarted}
        sessId={sessId}
        rideStartingTime={rideStartingTime}
        setRideStartingTime={setRideStartingTime}
      />
      <EventModal
        show={showEventModal}
        setShowEventModal={setShowEventModal}
        eventType={eventType}
        rideStarted={rideStarted}
      />
      <Layout>
        <div className="userinterface">
          <div className="userinterface-firstPanel">
            <div className="userinterface-firstPanel-first">
              <p style={{ color: "rgba(99, 99, 99, 1)", fontSize: "1.5rem" }}>
                Rider Profile
              </p>
              <div className="userinterface-firstPanel-first-userDetails">
                <img
                  src={UserImage}
                  style={{ maxWidth: "213px", maxHeight: "189px" }}
                  alt="user-image"
                />
                <div className="userinterface-firstPanel-first-userDetails-vlr">
                  <Vaccine />
                  <License />
                  <Experience />
                </div>
              </div>
              <div className="userinterface-firstPanel-first-name">
                {riderDetails?.rider_name}
              </div>
              <div className="userinterface-firstPanel-first-age">
                Age: 35 years
              </div>
            </div>
            <div className="userinterface-firstPanel-second">
              <Map />
            </div>
          </div>
          <div className="userinterface-secondPanel">
            <StartBtn
              handleShow={handleShow}
              genSessId={generateSessId}
              rideStarted={rideStarted}
              setRideStarted={setRideStarted}
            />
            <Uphill
              icon={uphill}
              cardText={"Uphill Riding"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={downhill}
              cardText={"Downhill Riding"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={straight}
              cardText={"Straight Road Riding"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={goodBreak}
              cardText={"Good Break"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={hardAcceleration}
              cardText={"Good Acceleration"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={hardBreak}
              cardText={"Hard Break"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={leftTurn}
              cardText={"Left Turn"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
            <Uphill
              icon={rightTurn}
              cardText={"Right Turn"}
              show={showEventModal}
              setShowEventModal={setShowEventModal}
              eventType={eventType}
              setEventType={setEventType}
            />
          </div>
          <div className="userinterface-thirdPanel">
            <div className="vehicle">
              <img src={scooter} alt="scooter" style={{ maxWidth: "50%" }} />
              <div className="vehicle-description">
                <div className="vehicle-description-name-with-model">
                  <p className="vehicle-model-name">Honda Activa 125 2019</p>
                  <p className="vehicle-type">Scooter</p>
                </div>
                <p className="vehicle-engine">125 cc</p>
              </div>
            </div>
            <WeatherCard />
            <div className="action-cards">
              <Uphill
                icon={uTurn}
                cardText={"U-turn"}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={reset}
                cardText={"Reset"}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
              <Uphill
                icon={walking}
                cardText={"Walking"}
                show={showEventModal}
                setShowEventModal={setShowEventModal}
                eventType={eventType}
                setEventType={setEventType}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default UserInterface;
