import {Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import routes from "../../routes";
function Pages() {
    const fallback = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    return <Suspense fallback={fallback()}>

        <Switch>
            {routes.map((route, idx) => {


                return route.component && (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                            <route.component {...props} />
                        )} />
                ) ;
            })}}
        </Switch>
    </Suspense>
}

export default Pages