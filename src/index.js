import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./apiFacade";
import Admin2 from "./components/Admin2";
import Admin3 from "./components/Admin3";
import User1 from "./components/UserOwners";
import User2 from "./components/UserBoats";
import User3 from "./components/User3";
import Admin1 from "./components/Admin1";
import './waves.css'
import UserOwners from "./components/UserOwners";
import UserBoats from "./components/UserBoats";
import UserBoat from "./components/UserBoat";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin1" element={<Admin1/>}/>
                <Route path="/admin2" element={<Admin2/>}/>
                <Route path="/admin3" element={<Admin3/>}/>
                <Route path="/owners" element={<UserOwners/>}/>
                <Route path="/boats" element={<UserBoats/>}/>
                <Route path="boats/:boatID" element={<UserBoat/>}/>
                <Route path="/user3" element={<User3/>}/>

            </Route>
            <Route
                path="*"
                element={
                    <main style={{padding: "1rem"}}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    rootElement
);