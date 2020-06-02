import React from "react";
import {Container, Fade, Spinner} from "reactstrap";
import confirm from "reactstrap-confirm";

import {SelectUserForm,MangeTabs} from "./components/index.js"
import Api from "../../../utils/Api";

class MangeEmail extends React.Component {
    state = {
        current_user:false,
        loading:false,
        sent: [],
        received:[],

    }
    onDeleteMassage = (message_id,type = "sent") => async event => {
        event.stopPropagation();

        if (! await confirm()){
            return ;
        }
        this.setState(state => ({
            ...state,
            loading:true,
        }))

        const formData = new FormData();
        formData.set("user_id",this.state.current_user);
        formData.set("message_id",message_id);
        formData.set("user_type",type);
        try {
            const res = await Api.post("/delete-message", formData,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                });

            if (res.status !== 200){
                return ;
            }
            let { sent,received} = this.state
            switch (type) {
                case "sent":{
                    sent = sent.filter(msg => msg.id !== message_id);
                    break
                }
                case "receiver":{
                    received = received.filter(msg => msg.id !== message_id);
                    break
                }
            }
            this.setState(state => ({
                ...state,
                received,
                sent,
            }))

        } catch (e) {

        } finally {
            this.setState(state => ({
                ...state,
                loading:false,
            }))
        }
    };

    onChangeUser = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const user_id = Number(formData.get("user_id"));
        if (Number.isInteger(user_id) && user_id !== 0) {
            this.setState(state => ({
                current_user: user_id,
                loading: true
            }))


            try {
                const res = await Api.post("/get-messages", formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    });
                if (res.status === 200) {
                    const {sent,received} = res.data;
                    this.setState(state => ({
                        ...state,
                        sent: [...sent],
                        received: [...received],
                        loading : false,
                    }))
                }
            } catch (ignore) {
                this.setState(state => ({
                    ...state,
                    current_user: false,
                    sent: [],
                    received: [],
                    loading : false,
                }))
            }
        }
    }
    render()
    {
        return <Container>
            <h1 className="text-center py-4">Mange Email</h1>
            <Fade timeout={500} in={this.state.loading}  className="mt-3">
                <Spinner color="success" />
            </Fade>

            <SelectUserForm disabled={this.state.loading} onSubmit={this.onChangeUser}/>
            {this.state.current_user &&
            <MangeTabs sent={this.state.sent} received={this.state.received} deleteMassage={this.onDeleteMassage} />
            }

        </Container>
    }

}

export default MangeEmail