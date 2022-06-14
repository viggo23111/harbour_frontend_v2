import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import HarbourFacade from "../HarbourFacade";


const AddOwner = () => {
    const initialState = {name: "", phone: "", address: ""};

    const [owner, setOwner] = useState(initialState);

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setOwner({...owner, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        HarbourFacade.createOwner(owner)
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>Add owner</h1>
                </div>
                <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={owner.name} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required type="text" value={owner.address} placeholder="Address"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="text" value={owner.phone} placeholder="Phone"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AddOwner;