import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { moodleClient } from '../../../services/MoodleClient';

export default () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [parent, setParent] = useState();
    const [addSuccess, setAddSuccess] = useState(false);

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_get_categories"
            }).then((res: any) => {
                setCategories(res);
            })
        });
    }, []);

    const onSubmit = (e: any) => {
        e.preventDefault();
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_create_categories",
                args: {
                    categories: [
                        {
                            name: name,
                            parent: parent
                        }
                    ]
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
        return (<Redirect to='/cms/category' />)
    }

    return (
        <Container>
            <h2>Category</h2>
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
                            <Form.Label>Parent</Form.Label>
                            <Form.Control as="select" custom value={parent} onChange={(e: any) => setParent(e.target.value)}>
                                {
                                    categories.map((category: any) => {
                                        return (<option key={category.id} value={category.id}>{category.name}</option>);
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
