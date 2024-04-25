import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./component/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./component/login/Login";
import SignUp from "./component/login/SignUp";
import RegisterHost from "./component/login/RegisterHost";
import ChangePassword from "./component/changepassword/ChangePassword";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/register/user'} element={<SignUp/>}></Route>
            <Route path={'/register/host'} element={<RegisterHost/>}></Route>
            <Route path={'/change-password'} element={<ChangePassword/>}></Route>
        </Routes>
    );
}

export default App;