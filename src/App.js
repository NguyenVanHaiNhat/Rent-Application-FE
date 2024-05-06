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
import ChangePassword from "./component/changepassword/ChangePassword";
import BookingForm from "./component/booking/BookingForm";
import UpdateAccount from "./component/accountInfor/UpdateInfor";
import ListHouseRented from "./component/host/ListHouseRented";
import ListHouseMaintenance from "./component/host/ListHouseMaintenance";
import ListHouseAvailable from "./component/host/ListHouseAvailable";
import HouseDetail from "./component/house/HouseDetail";
import UpdateHouse from "./component/house/UpdateHouse";
import {ToastContainer} from "react-toastify";
import UserProfile from "./component/accountInfor/UserProfile";



function App() {
    return (
        <div>
        <Routes>
            <Route path={'/'} element={<Home/>}>
                    <Route path={"/host"} element={<Host/>}></Route>
                    <Route path="/detail/:id" element={<HostDetail/>}></Route>
                    <Route path="/owner/:id" element={<ListHouse/>}></Route>
                    <Route path="/house/update/:id" element={<UpdateHouse/>}></Route>
                    <Route path="/house/:id" element={<HouseDetail/>}></Route>
            </Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/register/user'} element={<SignUp/>}></Route>
            <Route path={'/register/host'} element={<RegisterHost/>}></Route>
            <Route path={"/host"} element={<Host/>}></Route>
            <Route path="/detail/:id" element={<HostDetail/>}></Route>
            <Route path="/owner/:id" element={<ListHouse/>}></Route>
            <Route path="/ownerRented/:id" element={<ListHouseRented/>}></Route>
            <Route path="/ownerMaintenance/:id" element={<ListHouseMaintenance/>}></Route>
            <Route path="/ownerAvailable/:id" element={<ListHouseAvailable/>}></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
            <Route path="/book/:id/:price" element={<BookingForm/>}></Route>
            <Route path="/account/profile/:id" element={<UpdateAccount/>}></Route>
            <Route path="/account/profile2/:id" element={<UserProfile/>}></Route>
        </Routes>
    <ToastContainer />
        </div>

    );
}

export default App;
