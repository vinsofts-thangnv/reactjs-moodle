import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { moodleClient } from '../../../services/ClientMoodle';

export default () => {

    const [categories, setCategories] = useState([]);
    const [fullname, setFullname] = useState('');
    const [shortname, setShortname] = useState('');
    const [categoryid, setCategoryid] = useState();
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
                wsfunction: "core_course_create_courses",
                args: {
                    courses: [
                        {
                            fullname: fullname,
                            shortname: shortname,
                            categoryid: categoryid
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
        return (<Redirect to='/cms/course' />)
    }

    return (
        <Container>
            <h2>Course</h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={fullname} onChange={(e: any) => setFullname(e.target.value)} />
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
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" custom value={categoryid} onChange={(e: any) => setCategoryid(e.target.value)}>
                                {
                                    categories.map((category: any) => {
                                        return (<option value={category.id}>{category.name}</option>);
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
