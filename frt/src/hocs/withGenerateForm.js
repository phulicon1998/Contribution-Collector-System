import React, {Component} from "react";
import { FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import Button from "../components/CustomButton/CustomButton.jsx";
import ImportExcel from "../components/Generate/ImportExcel";
import Card from "../components/Card/Card.jsx";
import {apiAppCall} from "../services/api";

const Empty = () => <span></span>

export default function withGenerateForm(RenderComponent = Empty){
    class GenerateForm extends Component {

        constructor(props){
            super(props);
            this.state = {
                faculty: "",
                email: "",
                excelData: []
            }
        }

        handleChange = (e) => {
            this.setState({email: e.target.value});
        }

        handleSubmit = (e) => {
            e.preventDefault();
            const {waitForGen, gatherData} = this.props;
            const {excelData, ...account} = this.state;
            let data = gatherData(account);
            if(data) waitForGen([data]);
            this.setState({faculty: "", email: ""});
        }

        import = async(data, duplicate) => {
            if(this.props.hasFaculty) {
                let faculties = await apiAppCall("get", "/api/faculties");
                let addressFa = faculties.reduce((acc, next) => {
                    acc[next.name] = next._id
                    return acc;
                }, {});
                let syncData = data.map(val => ({
                    ...val,
                    faculty: {
                        label: val.faculty,
                        value: addressFa[val.faculty]
                    }
                }))
                return this.props.waitForGen(syncData, duplicate);
            }
            return this.props.waitForGen(data, duplicate);
        }

        getFa = (faculty) => {
            this.setState({faculty});
        }

        render(){
            const {title, excel} = this.props;
            return (
                <Card
                    title={title}
                    content={
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <ControlLabel>Email address</ControlLabel>
                                <FormControl
                                    placeholder="Enter email"
                                    type="email"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <RenderComponent getFa={this.getFa} faculty={this.state.faculty}/>
                            <div className="btnGen">
                                <Button type="submit" bsStyle="info" fill>Add</Button>
                                <ImportExcel import={this.import} {...excel}/>
                            </div>
                        </form>
                    }
                />
            )
        }
    }

    return GenerateForm;
}
