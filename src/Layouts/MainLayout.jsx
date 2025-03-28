import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const MainLayout = () => {
  return ( <>
      <ToastContainer  
    autoClose = {1000}
    />
    <Navbar />
    <Outlet />
  

    </>
  )
}

export default MainLayout