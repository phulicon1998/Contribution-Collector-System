import React, {Component} from "react";
import {apiAppFdCall, apiAppCall} from "../services/api";

export default function userForm(WrappedComponent) {
    class UserForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                id: this.props.selected._id || "",
                viewname: this.props.selected.viewname || "",
                profileImg: this.props.selected.profileImg.link || "",
                email: this.props.selected.email || "",
                faculty_id: this.props.selected.faculty_id ? this.props.selected.faculty_id._id : undefined,
                avatar: ""
            }
        }

        changeState = (obj) => this.setState({...obj});

        hdlChange = (e) => this.setState({[e.target.name]: e.target.value});

        hdlUpdate = async() => {
            this.setState({update: true});
            const {api, toggleForm, notify} = this.props;
            try {
                const {id, viewname, email, faculty_id, avatar} = this.state;
                let data = {viewname, email, faculty_id};
                if(avatar !== ""){
                    let fd = new FormData();
                    for(let key in data){
                        fd.append(key, data[key]);
                    }
                    fd.append("avatar", avatar);
                    await apiAppFdCall("put", `${api.update}/${id}`, fd);
                } else {
                    await apiAppCall("put", `${api.update}/${id}`, data);
                }
                notify("success", "Update data successfully!");
                this.setState({update: false});
            } catch(err) {
                notify("warning", "The information is available. Please try again");
                this.setState({update: false});
            }
            return toggleForm(true);
        }

        onFilesChange = (files) => {
            this.setState({profileImg: files[0].preview.url, avatar: files[0]});
        }

        onFilesError = (error, file) => {
            console.log('error code ' + error.code + ': ' + error.message);
        }

        render() {
            return (
                <WrappedComponent
                    setSt={this.changeState}
                    st={{...this.state}}
                    hdlChange={this.hdlChange}
                    hdlUpdate={this.hdlUpdate}
                    fileChange={this.onFilesChange}
                    fileError={this.onFilesError}
                    {...this.props}
                />
            )
        }
    }

    return UserForm;
}
