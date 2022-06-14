import {Button, Container, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import harbourFacade from "../HarbourFacade";
import {Link, useParams} from "react-router-dom";
import HarbourFacade from "../HarbourFacade";

const AdminBoat = () => {
    const parms = useParams();
    const [boat, setBoat] = useState()
    const [currentOwners, setCurrentOwners] = useState();
    const [owners, setOwners] = useState();
    const [newOwner, setNewOwner] = useState();
    const [harbours, setHarbours] = useState();


    useEffect(() => {
        harbourFacade.getBoatByID(parms.boatID).then(boat => setBoat(boat));
        harbourFacade.getBoatOwnersByBoatID(parms.boatID).then(owners => setCurrentOwners(owners));
        harbourFacade.getOwners().then(r => r.json()).then(owners => setOwners(owners));

    }, [])

    useEffect(() => {
        HarbourFacade.getHarbours()
            .then(res => res.json())
            .then(harbours => setHarbours(harbours))
            .catch((error) => {
                alert(error.status)
                console.log("error")
            })

    }, [setHarbours]);

    const handleHarbourSelect = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        console.log(value)
        setBoat({...boat, [id]: value})
    }


    function handleChangeOwners(event) {
        const target = event.target
        const value = target.value
        let selectedOwner = owners.find(owner => owner.id === Number(value))
        setNewOwner(selectedOwner);
    }

    function handleAddOwnerSubmit(e) {
        e.preventDefault()
        harbourFacade.addOwnerToBoat(boat.id, newOwner.id)
        setCurrentOwners([...currentOwners, newOwner])
    }


    const handleRemove = (e) => {
        const ownerID = e.target.value;
        HarbourFacade.removeOwnerFromBoat(boat.id, ownerID)
        if (currentOwners) {
            const newOwners = currentOwners.filter((owner) => owner.id != ownerID);
            setCurrentOwners(newOwners)
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("boatid: " +boat.id + " HarbourID:" +boat.harbourId)
        HarbourFacade.updateBoatHarbour(boat.id, boat.harbourId)
    }

    return (
        <div>

            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                {boat &&
                    <div>
                        <h3 className={"text-center"}>Boat# {boat.id}</h3>
                        <h4 className="text-center">Information</h4>

                        <Form>
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
                                <Form.Control required type="email" value={boat.make}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control required type="text" value={boat.image}/>
                            </Form.Group>
                        </Form>

                        {harbours &&
                            <Form onChange={handleHarbourSelect} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="harbourID">Select harbour</Form.Label>
                                    <Form.Select id="harbourId" defaultValue={boat.harbourId}>
                                        <option value={"0"} selected disabled hidden>Select harbour</option>

                                        {harbours && harbours.map((harbour) => {
                                                return <option key={harbour.id} value={harbour.id}>{harbour.name}</option>
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit" className="btn-primary"> Update</Button>
                            </Form>

                        }
                    </div>
                }
                {
                    currentOwners &&
                    <div>
                        <h4 className="text-center">Owners</h4>
                        <Table bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>address</th>
                                <th>phone</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentOwners.map((owner) =>
                                    <tr key={owner.id}>
                                        <td>{owner.id}</td>
                                        <td>{owner.name}</td>
                                        <td>{owner.address}</td>
                                        <td>{owner.phone}</td>
                                        <td><Button value={owner.id} type="button" className="btn-danger float-end"
                                                    onClick={handleRemove}> Remove</Button></td>

                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                }
                {owners &&
                    <div>
                        <h5>Add owner</h5>
                        <Form onChange={handleChangeOwners} onSubmit={handleAddOwnerSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="ownerID">Select owner</Form.Label>
                                <Form.Select id="ownerID">
                                    <option value={""} selected disabled hidden>Select owner</option>
                                    {
                                        owners.map((owner) => {
                                                return <option key={owner.id}
                                                               value={owner.id}>{owner.id} - {owner.name} - {owner.phone}</option>
                                            }
                                        )}
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit" className="btn-primary"> Add</Button>
                        </Form>
                    </div>
                }

            </Container>
        </div>
    );
};

export default AdminBoat;