import "./SupportPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import NavBar from "../../components/NavBar/NavBar";

const SupportPage = () => {
  return (
    <>
      <NavBar token={localStorage.getItem("token")}></NavBar>

      <ToastContainer />
    </>
  );
};
export default SupportPage;
