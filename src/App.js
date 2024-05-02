import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./component/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./component/login/Login";
import SignUp from "./component/login/SignUp";
import RegisterHost from "./component/login/RegisterHost";
import Host from "./component/host/Host";
import HostDetail from "./component/host/HostDetail";
import ListHouse from "./component/host/ListHouse";
import Update from "./component/house/Update";
import ChangePassword from "./component/changepassword/ChangePassword";
import BookingForm from "./component/booking/BookingForm";
import UpdateAccount from "./component/accountInfor/UpdateInfor";
import ListHouseRented from "./component/host/ListHouseRented";
import ListHouseMaintenance from "./component/host/ListHouseMaintenance";
import ListHouseAvailable from "./component/host/ListHouseAvailable";


function App() {
    return (

        <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/register/user'} element={<SignUp/>}></Route>
            <Route path={'/register/host'} element={<RegisterHost/>}></Route>
            <Route path={"/host"} element={<Host/>}></Route>
            <Route path="/detail/:id" element={<HostDetail/>}></Route>
            <Route path="/owner/:id" element={<ListHouse/>}></Route>
            <Route path="/ownerRented/:id" element={<ListHouseRented/>}></Route>
            <Route path="/ownerMaintenance/:id" element={<ListHouseMaintenance/>}></Route>
            <Route path="/ownerAvailable/:id" element={<ListHouseAvailable/>}></Route>
            <Route path="/house/:id" element={<Update/>}></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
            <Route path="/book/:id/:price" element={<BookingForm/>}></Route>
            <Route path="/account/profile/:id" element={<UpdateAccount/>}></Route>
        </Routes>

    );
}

export default App;
