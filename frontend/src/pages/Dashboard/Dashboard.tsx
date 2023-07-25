import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Card from "../../components/Cards/Card";

//core
import "primereact/resources/primereact.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../shared/interface/user";
import { MultiSelect } from "primereact/multiselect";

// let matchResult: any = null;

const Dashboard = () => {
  const navigate = useNavigate();

  const baseUrl = "https://room-my-rommie-service.onrender.com/api/v1/user/";
  const [loggedInUser, setloggedInUser] = useState<any>({});
  const [matchResult, setMatchResult] = useState([]);
  const [selectedAttributes, setAttributes] = useState(null);
  const attributes = [
    "interests",
    "socialStats",
    "course",
    "visitorTolerance",
    "roomTemperature",
    "campusBudget",
    "campusPreference",
    "country",
    "sportChoice",
    "male",
    "female",
    "age",
  ];

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      const config = {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      };
      const response = await axios.get(baseUrl + "find/whoami", config);
      setloggedInUser(response.data.result);
    };

    fetchLoggedInUserData();
  }, []);
  const matchProfiles = async () => {
    // checkIfLoggedIn();
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.post(
        baseUrl + `match`,
        { attributes: selectedAttributes },
        config
      );
      if (response.status === 200) {
        setMatchResult(response.data.msg);
        // console.log(matchResult);
      } else if (response.status === 401) {
        console.log("here i am");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }

    // console.log('no result');
  };

  const findMatch = () => {
    console.log(selectedAttributes);
    matchProfiles();
  };

  return (
    <div className="cover-image">
      <NavBar token={localStorage.getItem("token")} />
      <section className="t">
        <div
          className=" d-flex justify-content-center"
          style={{ marginTop: "7%" }}
        >
          <img
            src={
              loggedInUser
                ? loggedInUser.image
                : `https://api.dicebear.com/6.x/lorelei/svg?seed=${loggedInUser?.result.firstName}`
            }
            alt="img"
            style={{ height: "130px", width: "130px" }}
            className="profile-photo border border-5"
          />
        </div>

        <p className="text-light text-center fs-2 fw-bolder">
          Welcome back{" "}
          <span className="text-info"> {loggedInUser.firstName}</span>
        </p>

        <p className="text-center small fs-6 text-danger px-5">
          NB: Make sure your <a href="/profile">profile</a> is at least 50%
          completed to see matches
        </p>
      </section>

      <section className="text-center my-4 m-5 " id="matches">
        <p className="h2 text-center mt-3">Matches</p>
        <p className="text-center small text-info">
          If you see someone who looks like a good match, reach out to them
          using the contact information they listed.
        </p>
        <MultiSelect
          value={selectedAttributes}
          onChange={(e) => setAttributes(e.value)}
          options={attributes}
          display="chip"
          placeholder="Match with"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
        />
        <button onClick={findMatch} className="btn btn-sm btn-dark">
          Find Match
        </button>

        <div className="row mt-4">
          <div className="row-cols-12">
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {matchResult ? (
                matchResult.map((result: any, index) => {
                  if (!result.compatibilityScore.includes("NaN")) {
                    return <Card user={result} showButton={true} key={index} />;
                  }
                })
              ) : (
                <>
                  <h4> No user found</h4>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
