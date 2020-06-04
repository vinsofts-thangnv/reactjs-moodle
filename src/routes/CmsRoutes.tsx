import React from 'react';
import { Route } from 'react-router-dom';
import PrivateCmsRoute from './middlewares/PrivateCmsRoute';

const Login = React.lazy(() => import('../pages/cms/auth/Login'));
const Logout = React.lazy(() => import('../pages/cms/auth/Logout'));
const Home = React.lazy(() => import('../pages/cms/home'));
const Role = React.lazy(() => import('../pages/cms/role'));
const CreateRole = React.lazy(() => import('../pages/cms/role/Create'));
const Category = React.lazy(() => import('../pages/cms/category'));
const CreateCategory = React.lazy(() => import('../pages/cms/category/Create'));
const EditCategory = React.lazy(() => import('../pages/cms/category/Edit'));
const Course = React.lazy(() => import('../pages/cms/course'));
const CreateCourse = React.lazy(() => import('../pages/cms/course/Create'));
const EditCourse = React.lazy(() => import('../pages/cms/course/Edit'));

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

const routeRole = {
    path: '/cms/role',
    name: 'Roles',
    component: Role,
    route: Route,
}

const routeCreateRole = {
    path: '/cms/role/create',
    name: 'Create Role',
    component: CreateRole,
    route: Route,
}

const routeCategory = {
    path: '/cms/category',
    name: 'Categories',
    component: Category,
    route: Route,
}

const routeCreateCategory = {
    path: '/cms/category/create',
    name: 'Create Category',
    component: CreateCategory,
    route: Route,
}

const routeEditCategory = {
    path: '/cms/category/:id/edit',
    name: 'Edit Category',
    component: EditCategory,
    route: Route,
}

const routeCourse = {
    path: '/cms/course',
    name: 'Courses',
    component: Course,
    route: Route,
}

const routeCreateCourse = {
    path: '/cms/course/create',
    name: 'Create Course',
    component: CreateCourse,
    route: Route,
}

const routeEditCourse = {
    path: '/cms/course/:id/edit',
    name: 'Edit Course',
    component: EditCourse,
    route: Route,
}

const allCmsRoute = [
    routeLogin,
    routeLogout,
    routeHome,
    routeRole,
    routeCreateRole,
    routeCategory,
    routeEditCategory,
    routeCreateCategory,
    routeCourse,
    routeCreateCourse,
    routeEditCourse
];

export default allCmsRoute;
