import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Nav, Container } from "react-bootstrap";
import Loading from "../pages/shares/Loading";
import NotFound from '../pages/shares/NotFound';
import allCmsRoute from "./CmsRoutes";
import allFrontendRoute from "./FrontendRoutes";

export default () => {

    return (
        <BrowserRouter>

            {/* <ul>
                <li>
                    <Link to="/cms/course">Course</Link>
                </li>
                <li>
                    <Link to="/cms/category">Category</Link>
                </li>
            </ul> */}
            <Container>
                <Nav defaultActiveKey="/cms/" as="ul">
                    <Nav.Item as="li">
                        <Link className="nav-link" to="/cms/role">Role</Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Link className="nav-link" to="/cms/category">Category</Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Link className="nav-link" to="/cms/course">Course</Link>
                    </Nav.Item>
                </Nav>
            </Container>

            <Suspense fallback={() => <Loading />}>
                <Switch>
                    {[...allCmsRoute, ...allFrontendRoute]
                        .map((route, key) => <route.route
                            key={key}
                            exact
                            path={route.path}
                            name={route.name}
                            component={route.component} />
                        )}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter >
    )
}
