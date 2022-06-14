import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./apiFacade";
import Admin3 from "./components/Admin3";
import User3 from "./components/User3";
import './waves.css'
import UserOwners from "./components/UserOwners";
import UserBoats from "./components/UserBoats";
import UserBoat from "./components/UserBoat";
import AdminBoats from "./components/AdminBoats";
import AdminBoat from "./components/AdminBoat";
import AddBoat from "./components/AddBoat";
import AddOwner from "./components/AddOwner";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/adminboats" element={<AdminBoats/>}/>
                <Route path="adminboats/:boatID" element={<AdminBoat/>}/>
                <Route path="/addboat" element={<AddBoat/>}/>
                <Route path="/addowner" element={<AddOwner/>}/>

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