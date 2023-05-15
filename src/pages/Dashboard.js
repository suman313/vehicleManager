import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./dashboard.css";
import CardInfo from "../components/CardInfo/CardInfo";
import Cycle from "../assets/information-card/cycle.svg";
import Event from "../assets/information-card/events.svg";
import rider from "../assets/information-card/rides.svg";
import add from "../assets/add.svg";
import Button from "../components/Button/Button";
import Map from "../components/Map/Map";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [allEvents, setAllEvents] = useState([]);
  const [role, setRole] = useState()
  const navigate = useNavigate();

  const getRiderList = async () => {
    const url = "http://20.121.141.248:5000/get_all_events_all_riders";
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.post(
        url,
        {
          role: sessionStorage.getItem("role")
        },
        {
          headers: {
            "x-access-tokens": token,
          },
        }
      );

      // Handle the response data
      setRole(sessionStorage.getItem('role'))
      setAllEvents(data.events);
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleNavigate = (ph) => {
    navigate(`/userinterface/${ph}`)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/login");
    }

    getRiderList();
  }, [navigate]);

  return (
    <Layout>
      <div className="dashboard-grid">
        {/* <div className='dashboard-left'>
               
            </div> */}
        <CardInfo image={Cycle} aboutText="Total Riders" qty={54} />
        <CardInfo image={Event} aboutText="Total Events" qty={16} />
        <CardInfo image={rider} aboutText="Total Rides" qty={23} />
        <div className="dashboard-right">
          <Map />
        </div>
        <div className="rider-onboard">
          <p>Riders</p>
          {role ==="admin" && (<button
            type="submit"
            className="flex justify-between items-center bg-[#0F0B1F] rounded-full text-azure px-12 py-2 border-none gap-2 text-lg cursor-pointer"
          >
            <img src={add} alt="add" />
            <p className="font-medium text-white text-xl">Onboard Rider</p>
          </button>)}
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>Rider</td>
                <td>Status</td>
                <td>Riding hours</td>
                <td>Events Assigned</td>
              </tr>
            </thead>
            <tbody>
              {allEvents?.map((event) => (
                <tr onClick={() => handleNavigate(event?.rider_phone_no)}>
                  <td>
                    <div id="user-info-with-model">
                      <p className="user-info-with-model-name">{event?.rider_name}</p>
                      <p className="user-info-with-model-vehicle">
                        Honda active 125
                      </p>
                    </div>
                  </td>

                  <td>
                    <Button />
                  </td>
                  <td>{event?.riding_hours}</td>
                  <td>{event?.event_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="event-panel">
          <div className="event-panel-header">
            <p className="event-panel-header-text">Events</p>
            {role == "admin" &&(<button
              type="submit"
              className="flex justify-center items-center bg-[#0F0B1F] rounded-full text-azure px-6 py-2 border-none gap-2 text-sm cursor-pointer"
            >
              <img
                src={add}
                alt="add"
                style={{ maxWidth: "20px", marginTop: "5px" }}
              />
              <p className="font-normal text-white text-sm">Create Event</p>
            </button>)}
          </div>
          <div className="event-panel-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div id="event-name-with-type">
                      <p className="event-name-with-type-name">Right Turn</p>
                      <p className="event-name-with-type-type">event type</p>
                    </div>
                  </td>
                  <td>
                    <div id="event-name-with-type">
                      <p className="event-name-with-type-name">7</p>
                      <p className="event-name-with-type-type">
                        riders assigned
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
