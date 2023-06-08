import React, { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import MatchPage from "../../pages/MatchPage/MatchPage";
import { ToastContainer, toast } from "react-toastify";

const Card = (props: any) => {
  const navigate = useNavigate();
  // const [users, setUsers]= useState([])
  console.log(props)

  // setUsers(props.user)
  const backgroundColor: any[] = [
    { name: "bg-primary", text: "text-primary" },
    { name: "bg-info", text: "text-info" },
    { name: "bg-secondary", text: "text-secondary" },
    { name: "bg-success", text: "text-success" },
    { name: "bg-danger", text: "text-danger" },
  ];
  const generateRandomIndex = (): number => {
    const randomIndex = Math.floor(Math.random() * backgroundColor.length);
    // console.log(randomIndex)
    return randomIndex;
  };

  const matchUser = (user: any) => {
    // navigate('/match-profile/' + props.user._id);
    // console.log(user)
    // console.log(user.user.firstName + "hmm")
  };

  return (
    <div>
      <div className="card bg-dark card-hover" style={{ width: "18rem" }}>
      <div
          className=" d-flex justify-content-center"
          style={{ marginTop: "7%" }}
        >
          <img
            src={
              props.user.image
                ? props.user.image
                : `https://api.dicebear.com/6.x/lorelei/svg?seed=${props.user.firstName}`
            }
            alt="img"
            style={{ height: "130px", width: "130px" }}
            className="profile-photo"
          />
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between align-content-center align-items-center">
            <h5
              className="card-title text-uppercase text-white fw-bolder"
              style={{ fontSize: "12px" }}
            >
              {props.user.firstName} {props.user.lastName}
            </h5>
            <span className=" badge badge-primary text-info">
              {" "}
              {props.user.compatibilityScore}
            </span>
          </div>
          <div
            className="d-flex gap-1 flex-wrap align-content-center align-items-center"
            style={{ maxHeight: "55px", overflowY: "hidden" }}
          >
            {props.user.interests.map((interest: any) => {
              return (
                <span
                  className={`badge btn-sm   ${
                    backgroundColor[generateRandomIndex()].name
                  }`}
                >
                  {interest}
                </span>
              );
            })}
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal">Biography: </span> <br />
              <span style={{ fontSize: "13px", color:'grey' }}>{props.user.bio}</span>
            </span>
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal ">Visitor Tolerance: </span>
              <span className="" style={{ fontSize: "13px", color:'grey' }}>
                {props.user.visitorTolerance}
              </span>
            </span>
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal">Room Temperature: </span>
              <span className="" style={{ fontSize: "13px" , color:'grey' }}>
                {props.user.roomTemperature}
              </span>
            </span>
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal">Social Status: </span>
              <span className="" style={{ fontSize: "13px", color:'grey' }}>
                {props.user.socialStats}
              </span>
            </span>
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal">Campus Preference: </span>
              <span className="" style={{ fontSize: "13px", color:'grey' }}>
                {props.user.campusPreference}
              </span>
            </span>
          </div>
          <div className="text-start">
            <span className=" text-start" style={{ fontSize: "13px" }}>
              <span className="fw-normal">Campus: </span>
              <span className="" style={{ fontSize: "13px", color:'grey' }}>
                {props.user.campusBudget}
              </span>
            </span>
          </div>

          <div
            className="d-flex justify-content-between gap-2"
            style={{ marginTop: "20%" }}
          >
            <a
              onClick={() =>
                toast("Feature is not yet available, Coming soon...")
              }
              className="btn btn-sm btn-outline-primary"
            >
              View Details
            </a>
            <a
              href={`mailto:${props.user.email}`}
              className="btn btn-sm btn-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Card;
