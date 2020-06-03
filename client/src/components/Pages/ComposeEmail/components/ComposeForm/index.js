import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Api from "../../../../../utils/Api";
import confirm from "reactstrap-confirm"

const ComposeForm = ({...props} ) => {
    const [loading,setLoading] = useState(false);
    const onSubmit = async event =>{
        event.preventDefault();
        setLoading(true)
        const form  = event.target
        const data = new FormData(form);

        try {


            const res  = await Api.post("/create-message",data,
                {
                    headers: {'Content-Type': 'multipart/form-data' }
                });
            if (res.status === 201){
                await confirm({
                    title: null,
                    message: <p>
                        the massage sent to the receiver
                    </p>,

                    confirmText: 'OK',
                    confirmColor: 'success',
                    cancelText: null
                });
                form.reset();
            }
        } catch (ignore) {
        }
        finally {
            setLoading(false)

        }
    }
    return (
        <Form  onSubmit={onSubmit}>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="form_sender_id">From </Label>
                        <Input required  type="number" min={1} name="sender_id" id="form_sender_id" placeholder="select sender id " />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="form_receiver_id">To</Label>
                        <Input type="number" min={1} name="receiver_id" id="form_receiver_id" placeholder="select receiver id" />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="form_subject">Subject</Label>
                <Input required type="text" name="subject" id="form_subject" placeholder="Subject ... "/>
            </FormGroup>
            <FormGroup>
                <Label for="form_content">Content</Label>
                <Input rows={10} type="textarea" name="content" id="form_content" />
            </FormGroup>
            <Button color={"primary"} disabled={loading} type={"submit"}>Send</Button>
        </Form>
    );
}

export default ComposeForm;

ComposeForm.propTypes = {
    onSubmit: PropTypes.func
};