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
import CreateHouse from "./component/house/CreateHouse";


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
            <Route path="/house/:id" element={<Update/>}></Route>
            <Route path="/house/create" element={<CreateHouse/>}></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
            <Route path="/book/:id/:price" element={<BookingForm/>}></Route>
        </Routes>

    );
}

export default App;
