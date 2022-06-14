import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";

import {Link} from "react-router-dom";
import HarbourFacade from "../HarbourFacade";
import "../card.css"

const AdminBoats = () => {
    const [boats, setBoats] = useState()
    const [harbours, setHarbours] = useState();


    useEffect(() => {
        HarbourFacade.getHarbours()
            .then(res => res.json())
            .then(harbours => setHarbours(harbours))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setHarbours]);

    useEffect(() => {
        getBoats()
    }, [])


    const getBoats = async () => {
        await HarbourFacade.getBoats()
            .then(res => res.json())
            .then(function (result) {
                setBoats(result)
            })
    }

    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <h3 className={"text-center"}>Boats</h3>
                <div className={"cardList"}>
                    {

                        boats &&
                        boats.map((boat) =>
                            <Card>
                                <Card.Img variant="top" src={boat.image}/>
                                <Card.Body>
                                    <Card.Title>{boat.name}</Card.Title>
                                    <Card.Text>
                                        Brand: {boat.brand}
                                    </Card.Text>
                                    <Card.Text>
                                        Make: {boat.make}
                                    </Card.Text>

                                     <Link
                                        style={{display: "block", margin: "0"}}
                                        to={`/adminboats/${boat.id}`}
                                        key={boat.id}
                                    >
                                        info
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
                    }
                </div>
            </Container>
        </div>
    );
};

export default AdminBoats;