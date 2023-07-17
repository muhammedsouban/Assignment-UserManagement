import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/admin/adminLogin";
import AdminHome from "./pages/admin/adminHome";
import UserUpdate from "./components/admin/userUpdate/userUpdate.js";
import AdminAddUser from "./pages/admin/addUser";
import Auth from "./components/Auth/Protected";

function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AdminLogin/>} />
          <Route element={<Auth />}>
          <Route exact path="/dashboard" element={<AdminHome />} />
          <Route exact path="/userUpdate" element={<UserUpdate />} />
          <Route exact path="/addUser" element={<AdminAddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;


