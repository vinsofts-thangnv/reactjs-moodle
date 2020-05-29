import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../../contexts/AppContext';
import Action from '../../../contexts/AppContext/Action';
import { loginCms } from "../../../services/Auth";
import CenterScreen from '../../shares/CenterScreen';

export default (props: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const appState = useAppState();
    const appDispatch = useAppDispatch();

    if (appState?.auth?.token) {
        return (<Redirect to={props?.location?.state?.from?.pathname || '/cms'} />)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await loginCms(
            { email, password }
        );
        if (res?.data?.auth) {
            appDispatch({ type: Action.UPDATE_AUTH, value: res.data.auth });
        }else{
            alert(res?.message);
        }
    }

    return (
        <CenterScreen>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </Container>
        </CenterScreen >
    );
}