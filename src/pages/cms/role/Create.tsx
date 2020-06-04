import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { moodleClient } from '../../../services/MoodleClient';

export default () => {

    const [roles, setRoles]: any = useState([]);
    const [name, setName] = useState('');
    const [shortname, setShortname] = useState('');
    const [archetype, setArchetype] = useState();
    const [addSuccess, setAddSuccess] = useState(false);

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "roleservice_get_all_roles"
            }).then((res: any) => {
                setRoles(res);
            })
        });
    }, []);

    const onSubmit = (e: any) => {
        e.preventDefault();
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "roleservice_create_role",
                args: {
                    name: name,
                    shortname: shortname,
                    archetype: archetype
                }
            }).then((res: any) => {
                if (res.errorcode) {
                    alert(res.message)
                } else {
                    setAddSuccess(true)
                }
            })
        });
    }

    if (addSuccess) {
        return (<Redirect to='/cms/role' />)
    }

    return (
        <Container>
            <h2>Role</h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={name} onChange={(e: any) => setName(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="">
                            <Form.Label>Short Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={shortname} onChange={(e: any) => setShortname(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="">
                            <Form.Label>Archetype</Form.Label>
                            <Form.Control as="select" custom value={archetype} onChange={(e: any) => setArchetype(e.target.value)}>
                                {
                                    roles.map((role: any) => {
                                        return (<option key={role.id} value={role.shortname}>{role.name || role.shortname}</option>);
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
