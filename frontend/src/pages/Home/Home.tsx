import { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  const baseUrl = "https://room-my-rommie-service.onrender.com/api/v1/user/";

  useEffect(() => {
    whoAmI();
  }, []);

  const whoAmI = async () => {
    const config = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "find/whoami", config);
      console.log(response);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar user={localStorage.getItem("token")}></NavBar>
      <main className="" id="main">
        <img src="/assets/banner.png" className="img splash" alt="main" />

        <section className="txt splash">
          <p className="title">
            <img src="/assets/RFA (2).png" height="100" />
          </p>
          <p className="title">Veritas University RoommateFinder</p>
          <p className="subtitle">
            Welcome to the unofficial Veritas University roommate finder
            application
          </p>
        </section>

        <section className="scroll splash">
          <p className="mb-2 no-auth">Login or sign up to get started</p>
          <p className="mb-3 auth-only d-none">
            Go to your Dashboard to update your profile or see current matches
          </p>
          <span>
            <span className="no-auth">
              <a
                href="/login"
                className="btn btn-lg btn-purple px-5 mx-2 mb-2 login-btn"
              >
                Log In
              </a>
              <a
                href="/sign-up"
                className="btn btn-lg btn-purple px-5 mx-2 mb-2"
                id="signupBtn"
              >
                Sign Up
              </a>
            </span>
            <span className="auth-only d-none">
              <a
                className="btn btn-lg btn-purple px-5 mx-2 mb-2"
                href="/dashboard.html"
              >
                Dashboard
              </a>
              <button className="btn btn-lg btn-danger px-5 mx-2 logout-btn mb-2">
                Log Out
              </button>
            </span>
          </span>
          <p className="d-none text-danger" id="warnMsg"></p>
        </section>
      </main>

      {/* <Body /> */}
    </>
  );
};

export default Home;
