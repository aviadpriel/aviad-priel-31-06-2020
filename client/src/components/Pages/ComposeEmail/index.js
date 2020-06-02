import {Container} from "reactstrap";
import React from "react";
import {ComposeForm} from "./components";
function ComposeEmail(props) {

    return <Container className={""}>
        <h1 className="text-center py-4" >Compose Email</h1>
        <ComposeForm />
    </Container>
}

export default ComposeEmail