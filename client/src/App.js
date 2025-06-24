import "./App.css";
import Header from "./Components/Header";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import About from "./Components/About";
import Details from "./Components/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Addpet from "./Components/Addpet";
import PetDetails from "./Components/PetDetails";
import AdoptionForm from "./Components/AdoptionForm";
import Notification from "./Components/Notification";
import Account from "./Components/Account";
import ProtectedRoute from "./Components/ProtectedRoute";
import Signout from "./Components/Signout";
import LandMark from "./Components/LandMark";
import Rescue from "./Components/Rescue";
import AdminRescue from "./Components/AdminRescue";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Addpet />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/Details" element={<Details />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/petdetails" element={<PetDetails/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/adoptionform" element={<ProtectedRoute><AdoptionForm/></ProtectedRoute>}/>
          <Route path="/signout" element={<Signout/>}></Route>
          <Route path="/notification" element={<Notification/>}></Route>
          <Route path="/landmark" element={<LandMark/>}></Route>
          <Route path="/rescue" element={<Rescue/>}></Route>
          <Route path="/adminrescueresponse" element={<AdminRescue/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
