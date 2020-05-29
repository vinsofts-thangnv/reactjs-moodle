import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useAppState } from '../../contexts/AppContext';

export default (props: any) => {

    const appState = useAppState();

    const handle = (props: any) => {
        if (appState?.auth?.token) {
            return <Route
                key={props?.key}
                exact
                path={props?.path}
                name={props?.name}
                component={props?.component} />
        }
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;

    }

    return (
        handle(props)
    );
}