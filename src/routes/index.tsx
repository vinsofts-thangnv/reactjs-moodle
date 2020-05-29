import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from "../pages/shares/Loading";
import NotFound from '../pages/shares/NotFound';
import allCmsRoute from "./CmsRoutes";
import allFrontendRoute from "./FrontendRoutes";

export default () => {

    return (
        <BrowserRouter>
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
