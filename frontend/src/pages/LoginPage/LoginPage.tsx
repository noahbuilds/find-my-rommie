import React, { ChangeEvent, useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const baseUrl =
    "https://room-my-rommie-service.onrender.com/api/v1/user/login";
  const navigate = useNavigate();
  let email = "";
  let password = "";
  const [processingLogin, setProcessingLogin] = useState(false);

  // todo: login process state

  const loginUser = async () => {
    setProcessingLogin(true);
    if (!email.includes("veritas.edu.ng")) {
      toast("Veritas email only");
      setProcessingLogin(false);
      return;
    }
    try {
      const response = await axios.post(baseUrl, { email, password });
      // console.log(response);
      if (response.status === 200) {
        // localStorage
        localStorage.setItem("token", response.data);
        document.cookie = `${response.data}`;
        // console.log(response);
        setProcessingLogin(false);
        navigate("/dashboard");
      } else {
        navigate("/login");
        setProcessingLogin(false);
      }
    } catch (error: any) {
      toast(error.response.data.msg);
      // console.log(error.response.data.msg)
      setProcessingLogin(false);
    }
  };
  // }, [])

  const captureEmail = (e: ChangeEvent<HTMLInputElement>) => {
    email = e.target.value;
    // console.log(e.target.value);
  };
  const capturePassword = (e: ChangeEvent<HTMLInputElement>) => {
    password = e.target.value;
    // console.log(e.target.value);
  };
  return (
    <>
      <img src="/assets/banner.png" className="img splash" alt="main" />
      <section id="formFloat">
        <div id="formClose">
          {/* <i
                        className="fa fa-times float-end"
                        // onClick={closeLoginForm}
                    ></i> */}
        </div>
        <div id="loginForm">
          <p className="w-100 h3 mb-2 text-center">Login</p>
          <label className="w-100">
            <span className="sr-only">
              Veritas Email Address (@verit as.edu.ng)
            </span>
            <input
              className="form-control mb-3"
              type="text"
              name="email"
              onChange={captureEmail}
              placeholder="Veritas Email Address (@veritas.edu.ng)"
            />
          </label>
          <label className="w-100">
            <span className="sr-only">Password</span>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              onChange={capturePassword}
            />
          </label>
          {/* <label className="w-100 mt-1">
                        <span className="mr-3">Keep me signed in?</span>
                        <div className="form-check-inline">
                            <label className="form-check-label mx-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="persist"
                                    value="y"
                                    checked
                                />
                                Yes
                            </label>
                            <label className="form-check-label mx-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="persist"
                                    value="n"
                                />
                                No
                            </label>
                        </div>
                    </label> */}
          <button
            className="mt-2 w-100 btn btn-success"
            onClick={loginUser}
            disabled={processingLogin}
          >
            {processingLogin ? "Processing..." : "Log in!"}
          </button>
          <p className="text-center my-1">
            Don't have an account?{" "}
            <a className="link" href="sign-up" id="showSignUpLink">
              Sign up instead
            </a>
          </p>
          {/* <p className="text-center my-1">
                        Forgot your password?{' '}
                        <a className="link" href="#" id="sendResetEmail">
                            Send a reset email
                        </a>
                    </p> */}
          <p className="text-center my-3">
            <span id="loginMsg"></span>
          </p>
        </div>

        <form className="d-none" id="signupForm">
          <p className="w-100 h3 mb-2 text-center">Sign up</p>
          <label className="w-100">
            <span className="sr-only">
              Veritas Email Address (@veritas.edu.ng){" "}
            </span>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Veritas Email Address (@veritas.edu.ng)"
            />
          </label>
          <label className="w-100">
            <span className="sr-only">Password</span>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>
          <label className="w-100">
            <span className="sr-only">Confirm Password</span>
            <input
              className="form-control"
              type="password"
              name="passwordverify"
              placeholder="Confirm Password"
            />
          </label>
          <button className="w-100 btn btn-success">Sign up!</button>
          <p className="text-center my-1">
            Already have an account?{" "}
            <a className="link" href="#" id="showLoginLink">
              Log in instead
            </a>
          </p>
          <p className="text-center my-3">
            <span id="signupMsg"></span>
          </p>
        </form>

        <form className="d-none" id="resetForm">
          <p className="w-100 h3 mb-2 text-center">Reset Password</p>
          <label className="w-100">
            <span className="sr-only">Password</span>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>
          <label className="w-100">
            <span className="sr-only">Confirm Password</span>
            <input
              className="form-control"
              type="password"
              name="passwordverify"
              placeholder="Confirm Password"
            />
          </label>
          <button className="w-100 btn btn-success">Confirm Reset</button>
          <p className="text-center my-3">
            <span id="resetMsg"></span>
          </p>
        </form>
      </section>

      <ToastContainer />
    </>
  );
};

export default LoginPage;
