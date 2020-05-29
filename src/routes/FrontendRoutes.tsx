import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './middlewares/PrivateFrontendRoute';

const Auth = React.lazy(() => import('../pages/frontend/auth'));
const Home = React.lazy(() => import('../pages/frontend/home'));

const routeAuth = {
    path: '/login',
    name: 'Auth',
    component: Auth,
    route: Route,
}

const routeHome = {
    path: '/',
    name: 'Home',
    component: Home,
    route: PrivateRoute,
}

const allFrontendRoute = [routeAuth, routeHome];

export default allFrontendRoute;
