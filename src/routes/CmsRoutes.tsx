import React from 'react';
import { Route } from 'react-router-dom';
import PrivateCmsRoute from './middlewares/PrivateCmsRoute';

const Login = React.lazy(() => import('../pages/cms/auth/Login'));
const Logout = React.lazy(() => import('../pages/cms/auth/Logout'));
const Home = React.lazy(() => import('../pages/cms/home'));
const Course = React.lazy(() => import('../pages/cms/course'));
const CreateCourse = React.lazy(() => import('../pages/cms/course/Create'));

const routeLogin = {
    path: '/cms/login',
    name: 'Auth',
    component: Login,
    route: Route,
}

const routeLogout = {
    path: '/cms/logout',
    name: 'Auth',
    component: Logout,
    route: PrivateCmsRoute,
}

const routeHome = {
    path: '/cms',
    name: 'Home',
    component: Home,
    route: PrivateCmsRoute,
}

const routeCourse = {
    path: '/cms/course',
    name: 'Course',
    component: Course,
    route: Route,
}

const routeCreateCourse = {
    path: '/cms/course/create',
    name: 'Create Course',
    component: CreateCourse,
    route: Route,
}

const allCmsRoute = [routeLogin, routeLogout, routeHome, routeCourse, routeCreateCourse];

export default allCmsRoute;
