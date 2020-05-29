import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, useRouteMatch } from "react-router-dom";
import { moodleClient } from '../../../services/ClientMoodle';

export default () => {

    const [courses, setCourses]: any = useState([]);

    let { url } = useRouteMatch();

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_get_courses"
            }).then((res: any) => {
                setCourses(res);
            })
        });
    }, []);

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_get_courses"
            }).then((res: any) => {
                setCourses(res);
            })
        });
    }, []);

    const deleteCourse = (id: any) => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_delete_courses",
                args: {
                    courseids: [id]
                }
            }).then((res: any) => {
                if (res.warnings.length) {
                    alert('Đang chờ xử lý')
                } else {
                    let coursesTemp = [...courses];
                    coursesTemp = coursesTemp.filter(x => x.id !== id);
                    setCourses(coursesTemp);
                }
            })
        });
    }

    return (
        <Container>
            <h2>Course</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map((course: any) => {
                            return (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.displayname}</td>
                                    <td>
                                        <Button size="sm" variant="danger" onClick={() => deleteCourse(course.id)}>
                                            Delete
                                        </Button>
                                        <Link to={`${url}/${course.id}/edit`}>
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
