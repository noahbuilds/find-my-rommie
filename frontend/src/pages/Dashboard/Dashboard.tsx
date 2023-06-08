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
import { useNavigate, redirect } from "react-router-dom";
import { IUser } from "../../shared/interface/user";
import { MultiSelect } from "primereact/multiselect";

// let matchResult: any = null;

const Dashboard = () => {
  const navigate = useNavigate();

  const baseUrl = "https://room-my-rommie-service.onrender.com/api/v1/user/";
  const [loggedInUser, setloggedInUser] = useState<any>({});
  const [matchResult, setMatchResult] = useState([]);
  const [view, setView] = useState("card");
  const [selectedAttributes, setAttributes] = useState(null);
  const attributes = [
    "location",
    "interests",
    "socialStats",
    "course",
    "visitorTolerance",
    "roomTemperature",
    "campusBudget",
    "campusPreference",
    "country",
    "sportChoice",
  ];

  useEffect(() => {
    // const checkIfLoggedIn = () => {
    //     if (loggedInUserId === null || '') {
    //         return (
    //             <div>
    //                 <h1>Please login to continue</h1>
    //             </div>
    //         );
    //     }
    // };
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
        selectedAttributes,
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
  const changeView = () => {
    if (view === "table") {
      setView("card");
    }
    if (view === "card") {
      setView("table");
    }
  };
  const findMatch = () => {
    console.log(selectedAttributes);
    matchProfiles();
  };

  return (
    <div className="cover-image">
      <NavBar token={localStorage.getItem("token")} />
      <section className="t">
        {/* <p className="h4 text-center mb-5">
                    RoommateFinder - Dashboard
                </p> */}

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

      {/* <Card user={matchResult} showButton={false}/>
            <Card user={matchResult} showButton={false}/>
            <Card user={matchResult} showButton={false}/> */}

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
          placeholder="Filter by"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
        />
        <button onClick={findMatch} className="btn btn-sm btn-dark">
          Find Match
        </button>
        {/* <button className="btn btn-sm btn-outline-dark" onClick={changeView}>
          Change view
        </button> */}

        {view === "table" ? (
          <div className="px-5  pb-5">
            <div className="card card-body w-100 " style={{ marginTop: "3%" }}>
              {/* <button>View as cards</button> */}
              <DataTable
                value={matchResult}
                tableStyle={{ minWidth: "50rem" }}
                showGridlines
                scrollable
                scrollHeight="400px"
              >
                <Column
                  field="firstName"
                  header="Name"
                  sortable
                  style={{ width: "25%" }}
                ></Column>
                <a href="http://">
                  <Column
                    field="email"
                    header="Contact"
                    sortable
                    style={{ width: "25%" }}
                  ></Column>
                </a>

                <Column
                  field="bio"
                  header="Biography"
                  sortable
                  style={{ width: "25%" }}
                ></Column>

                <Column
                  field="visitorTolerance"
                  header="visitorTolerance"
                  sortable
                  style={{ width: "25px" }}
                ></Column>
                <Column
                  field="roomTemperature"
                  header="roomTemperature"
                  sortable
                  style={{ width: "25px" }}
                ></Column>
                <Column
                  field="socialStats"
                  header="socialStats"
                  sortable
                  style={{ width: "25px" }}
                ></Column>
                <Column
                  field="campusPreference"
                  header="campusPreference"
                  sortable
                  style={{ width: "25px" }}
                ></Column>
                <Column
                  field="compatibilityScore"
                  header="Match Score"
                  sortable
                  style={{ width: "25%" }}
                ></Column>
              </DataTable>
            </div>
          </div>
        ) : (
          <div className="row mt-4">
            <div className="row-cols-12">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {matchResult ? (
                  matchResult.map((result: any, index) => {
                    if (!result.compatibilityScore.includes("NaN")) {
                      return (
                        <Card user={result} showButton={true} key={index} />
                      );
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
        )}

        {/* <table className="table">
                    <thead  style={{color: 'white'}}>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Biography</th>
                            <th>Match Score</th>
                            <th>Profile</th>
                        </tr>
                    </thead>
                    <tbody id="matchTable">
                        {matchResult
                            ? matchResult.map((result: any, index: number) => {
                                  // console.log(result + "here")
                                  
                                  return (
                                      <>
                                          <tr style={{color: 'white'}}>
                                              <td>{result.firstName}</td>
                                              <td>{result.firstName}</td>
                                              <td>{result.bio}</td>
                                              <td>{result.compatibilityScore}</td>
                                              <td>{result.firstName}</td>
                                          </tr>
                                      </>
                                  );
                              })
                            : null}
                    </tbody>
                </table> */}
      </section>
    </div>
  );
};

export default Dashboard;
