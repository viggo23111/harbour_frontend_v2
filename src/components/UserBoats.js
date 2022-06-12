import {Container, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import HarbourFacade from "../HarbourFacade";
import harbourFacade from "../HarbourFacade";
import {Link} from "react-router-dom";

const UserBoats = () => {
    const [boats, setBoats] = useState()
    const [harbours,setHarbours] = useState();

    useEffect(() => {
        HarbourFacade.getHarbours()
            .then(res=>res.json())
            .then(harbours => setHarbours(harbours))
            .catch((error) =>{
                alert(error.status)
                console.log("error")
            })

    }, [setHarbours]);

    useEffect(() => {
        HarbourFacade.getBoats()
            .then(res=>res.json())
            .then(boats => setBoats(boats))
            .catch((error) =>{
                alert(error.status)
                console.log("error")
            })

    }, [])

    const handleHarbourSelect = async (event) => {
        console.log(boats)
        const target = event.target
        const value = target.value
        console.log(value)
        await harbourFacade.getBoatsByHarbourID(value)
            .then(res=>res.json())
            .then(function(result) {
                setBoats(result)
            })
    }

    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <h3 className={"text-center"}>Boats</h3>

                {harbours &&
                    <Form onChange={handleHarbourSelect}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="harbourID">Select harbour</Form.Label>
                            <Form.Select id="harbourID">
                                <option value={""} selected disabled hidden>Select harbour</option>

                                {harbours && harbours.map((harbour) => {
                                        return <option key={harbour.id} value={harbour.id}>{harbour.name}</option>
                                    }
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                }
                {
                    boats &&

                    <Table bordered hover className="mt-5">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>brand</th>
                            <th>make</th>
                            <th>image</th>
                            <th>harbourID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            boats.map((boat) =>
                                <tr key={boat.id}>
                                    <td>{boat.id}</td>
                                    <td>{boat.name}</td>
                                    <td>{boat.brand}</td>
                                    <td>{boat.make}</td>
                                    <td>{boat.image}</td>
                                    <td>{boat.harbourId}</td>
                                    <td>
                                        <Link
                                            style={{ display: "block", margin: "0" }}
                                            to={`/boats/${boat.id}`}
                                            key={boat.id}
                                        >
                                            See boat
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                }
            </Container>
        </div>
    );
};

export default UserBoats;