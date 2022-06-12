import {Container, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import HarbourFacade from "../HarbourFacade";
import harbourFacade from "../HarbourFacade";
import {Link, useParams} from "react-router-dom";

const UserBoat = () => {
    const parms = useParams();
    const [boat, setBoat] = useState()
    const [owners,setOwners] = useState();

    useEffect( ()  => {
        harbourFacade.getBoatByID(parms.boatID).then(boat => setBoat(boat));
        harbourFacade.getBoatOwnersByBoatID(parms.boatID).then(owners => setOwners(owners));


    }, [])

    return (
        <div>

            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                {boat &&
                <div >
                <h3 className={"text-center"}>Boat# {boat.id}</h3>
                    <h4 className="text-center">Information</h4>

                        <Form className="disabled">
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" value={boat.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control required type="text" value={boat.brand}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="make">
                                <Form.Label>Make</Form.Label>
                                <Form.Control required type="email" value={boat.make} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control required type="text" value={boat.image} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="harbourID">
                                <Form.Label>Harbour</Form.Label>
                                <Form.Control required type="text" value={boat.harbourId} />
                            </Form.Group>
                        </Form>
                </div>
                    }
                    {
                        owners &&
                        <div>
                            <h4 className="text-center">Owners</h4>
                        <Table bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>address</th>
                                <th>phone</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                owners.map((owner) =>
                                    <tr key={owner.id}>
                                        <td>{owner.id}</td>
                                        <td>{owner.name}</td>
                                        <td>{owner.address}</td>
                                        <td>{owner.phone}</td>

                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                        </div>
                    }

            </Container>
        </div>
    );
};

export default UserBoat;