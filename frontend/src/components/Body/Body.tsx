import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import axios from "axios";
import "./Body.css";

const baseUrl =
  "http://localhost:2000/api/v1/user/" ||
  "https://room-my-rommie-service.onrender.com/api/v1/user/";

const Body = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setUsers(response.data.msg);
    };

    fetchData();
  }, []);
  // console.log(users);
  return (
    <div className="body-container">
      <div className="text-center">
        <h3 style={{ marginTop: 10, marginBottom: 0 }}>
          Welcome to Find your roomie App
        </h3>
        <p style={{ margin: 0, color: "GrayText", fontSize: 14 }}>
          Match a user profile to see compatibility score
        </p>
      </div>

      <div className="card-container">
        {users.map((user, index) => {
          return <Card user={user} key={index} showButton={true} />;
        })}
        {/* <Card/> */}
      </div>
    </div>
  );
};

export default Body;
