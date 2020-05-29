import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '../../../contexts/AppContext';
import Action from '../../../contexts/AppContext/Action';

export default (props: any) => {

    const appDispatch = useAppDispatch();

    useEffect(() => {
        appDispatch({
            type: Action.LOGOUT_CMS
        })
    }, [appDispatch]);

    return (
        <Redirect to={props?.location?.state?.from?.pathname || '/cms/login'} />
    );
}