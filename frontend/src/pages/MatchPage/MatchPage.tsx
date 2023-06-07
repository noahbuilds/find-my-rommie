import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/Cards/Card";
import { useParams } from "react-router";
import axios from "axios";
import Header from "../../components/NavBar/NavBar";
import "./MatchPage.css";
import MatchResult from "../../components/MatchResult/MatchResult";
let matchResult: any = null;
const MatchPage = () => {
  const params = useParams();
  const userToMatchId = params.id;
  const baseUrl =
    "http://localhost:2000/api/v1/user/" ||
    "https://room-my-rommie-service.onrender.com/api/v1/user/";
  const loggedInUserId = localStorage.getItem("user");

  const matchProfiles = async () => {
    const response = await axios.get(
      baseUrl + `match/single/${loggedInUserId}/${userToMatchId}`,
      { withCredentials: true }
    );
    matchResult = response.data.msg[0].compatibilityScore;

    if (matchResult) {
      return <Result result={matchResult} />;
    }
    console.log("no result");
  };
  // console.log(loggedInUser)

  // // console.log(params.id)
  const [loggedInUser, setloggedInUser] = useState([]);
  const [userToMatch, setUserToMatch] = useState([]);

  useEffect(() => {
    const fetchLoggedInUserData = async () => {
      const response = await axios.get(baseUrl + `${loggedInUserId}`);
      setloggedInUser(response.data.msg);
    };

    const fetchUserToMatchData = async () => {
      const response = await axios.get(baseUrl + `${userToMatchId}`);
      setUserToMatch(response.data.msg);
    };

    fetchLoggedInUserData();
    fetchUserToMatchData();
  }, []);

  return (
    <>
      {/* <h3>hello user</h3> */}
      {/* <Header /> */}
      <div className="card-wrapper">
        <Card user={loggedInUser} showButton={false} />
        <Card user={userToMatch} showButton={false} />
      </div>

      <div className="button-wrapper">
        <button onClick={() => matchProfiles()}>Match Profile</button>
      </div>

      {/* {matchResult ? <MatchResult/> : null } */}
    </>
  );
};

const Result = (matchResult: any) => {
  return <MatchResult result={matchResult} />;
};

export default MatchPage;
