import React from 'react';

const URL = "http://localhost:8080/ca2_war_exploded";

function HarbourFacade() {
    const getOwners = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/owner/all", options);
    }
    const getBoats = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/boat/all", options);
    }

    const getBoatByID = (boatID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/boat/"+boatID, options).then(r => r.json());;
    }

    const getBoatOwnersByBoatID = (boatID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/boatowners/"+boatID, options).then(r => r.json());;
    }

    const getHarbours = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/harbour/all", options);
    }

    const getBoatsByHarbourID = (harbourID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/system/harbour/"+harbourID, options);
    }

    const createBoat = (boat) => {
        const options = makeOptions("POST", boat, true); //True add's the token
        fetch(URL + "/api/system/createboat/", options).then(r => r.json());
    }
    const createOwner = (owner) => {
        const options = makeOptions("POST", owner, true); //True add's the token
        fetch(URL + "/api/system/createowner/", options).then(r => r.json());
    }

    const updateBoatHarbour = (boatID,harbourID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/system/boatconnectharbour/"+boatID+"/"+harbourID, options).then(r => r.json());
    }

    const removeOwnerFromBoat = (boatID,ownerID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/system/boatremoveowner/"+boatID+"/"+ownerID, options).then(r => r.json());
    }

    const addOwnerToBoat = (boatID,ownerID) => {
        const options = makeOptions("PUT",false,true); //True add's the token
        return fetch(URL + "/api/system/boataddowner/"+boatID+"/"+ownerID, options).then(r => r.json());
    }



/*
    const getRequestByCoachID = (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/request/coach/"+coachID, options).then(r => r.json());
    }
    const getAmountOfRequestsByCoachID = (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/request/amount/"+coachID, options).then(r => r.json());
    }

    const getRequestByRequestID = (requestID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/request/"+requestID, options).then(r => r.json());
    }

    const deleteRequest = (requestID) => {
        const options = makeOptions("DELETE",false,true); //True add's the token
        fetch(URL + "/api/request/delete/"+requestID, options).then(r => r.json());
    }
*/

    const makeOptions = (method, body,addToken) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken) {
            opts.headers["x-access-token"] = localStorage.getItem("jwtToken");
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        getOwners,
        getBoats,
        getHarbours,
        getBoatsByHarbourID,
        getBoatByID,
        getBoatOwnersByBoatID,
        createBoat,
        updateBoatHarbour,
        createOwner,
        removeOwnerFromBoat,
        addOwnerToBoat
    }
}

const facade = HarbourFacade();
export default facade;