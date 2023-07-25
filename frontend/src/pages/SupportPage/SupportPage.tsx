import "./SupportPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
