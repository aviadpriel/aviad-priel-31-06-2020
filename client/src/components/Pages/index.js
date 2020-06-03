import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import {Spinner} from "reactstrap";
import routes from "../../routes";

function Pages() {
    const fallback = () => <Spinner color={"dark"} size={"lg"} />;

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