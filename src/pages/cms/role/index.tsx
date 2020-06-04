import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, useRouteMatch } from "react-router-dom";
import { moodleClient } from '../../../services/MoodleClient';

export default (props: any) => {

    const [roles, setRoles]: any = useState([]);

    const { url } = useRouteMatch();

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "roleservice_get_all_roles"
            }).then((res: any) => {
                setRoles(res);
            })
        });
    }, []);

    const deleteRole = (id: any) => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "roleservice_delete_role",
                args: {
                    roleid: id
                }
            }).then((res: any) => {
                if (!res.deleted) {
                    alert('Đang chờ xử lý')
                } else {
                    let rolesTemp = [...roles];
                    rolesTemp = rolesTemp.filter(x => x.id !== id);
                    setRoles(rolesTemp);
                }
            })
        });
    }
    return (
        <Container>
            <h2>Roles</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Short Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map((role: any) => {
                            return (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>{role.shortname}</td>
                                    <td>
                                        <Button size="sm" variant="danger" onClick={() => deleteRole(role.id)}>
                                            Delete
                                        </Button>
                                        <Link to={`${url}/${role.id}/edit`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Link to={`${url}/create`} >Add</Link>
        </Container>
    )
}