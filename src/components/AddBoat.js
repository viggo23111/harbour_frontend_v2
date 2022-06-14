import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import HarbourFacade from "../HarbourFacade";


const AddBoat = () => {
    const initialState = {name: "", brand: "", make: "", image: ""};

    const [boat, setBoat] = useState(initialState);

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setBoat({...boat, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        HarbourFacade.createBoat(boat)
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>Add boat</h1>
                </div>
                <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={boat.name} placeholder="Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control required type="text" value={boat.brand} placeholder="Brand"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="make">
                            <Form.Label>Make</Form.Label>
                            <Form.Control required type="text" value={boat.make} placeholder="Make"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control required type="text" value={boat.image} placeholder="Image"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AddBoat;