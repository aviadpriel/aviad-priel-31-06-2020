import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import React from "react";

const SelectUserForm =({onSubmit,disabled,...props}) => {

    return  <Form  onSubmit={onSubmit} >
        <FormGroup>
            <Label for="form_user_id">select user id</Label>
            <Input

                type="number"
                name="user_id"
                id="form_user_id"
                placeholder="select user id"
            />
        </FormGroup>
        <Button disabled={disabled} type={"submit"} color={"primary"}> update</Button>
    </Form>
}

export default SelectUserForm;