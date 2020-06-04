import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, useRouteMatch } from "react-router-dom";
import { moodleClient } from '../../../services/MoodleClient';

export default (props: any) => {

    const [categories, setCategories]: any = useState([]);

    const { url } = useRouteMatch();

    useEffect(() => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_get_categories"
            }).then((res: any) => {
                setCategories(res);
            })
        });
    }, []);

    const deleteCategory = (id: any) => {
        moodleClient.then((client: any) => {
            client.call({
                wsfunction: "core_course_delete_categories",
                args: {
                    categoryids: [id]
                }
            }).then((res: any) => {
                if (res.warnings.length) {
                    alert('Đang chờ xử lý')
                } else {
                    let categoriesTemp = [...categories];
                    categoriesTemp = categoriesTemp.filter(x => x.id !== id);
                    setCategories(categoriesTemp);
                }
            })
        });
    }
    return (
        <Container>
            <h2>Categories</h2>
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
                        categories.map((category: any) => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button size="sm" variant="danger" onClick={() => deleteCategory(category.id)}>
                                            Delete
                                        </Button>
                                        <Link to={`${url}/${category.id}/edit`}>
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