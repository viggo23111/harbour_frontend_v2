import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import HarbourFacade from "../HarbourFacade";
import {Link} from "react-router-dom";

const UserOwners = () => {
    const [owners, setOwners] = useState()

    useEffect(() => {
        HarbourFacade.getOwners()
            .then(res=>res.json())
            .then(owners => setOwners(owners))
            .catch((error) =>{
                alert(error.status)
                console.log("error")
            })

    }, [setOwners])


    return (
        <Container>
            <h3 className={"text-center"}>Owners</h3>
            {
                owners &&

                <Table bordered hover className="mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>phone</th>
                        <th>address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        owners.map((owner) =>
                            <tr key={owner.id}>
                                <td>{owner.id}</td>
                                <td>{owner.name}</td>
                                <td>{owner.phone}</td>
                                <td>{owner.address}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            }

        </Container>)
};

export default UserOwners;