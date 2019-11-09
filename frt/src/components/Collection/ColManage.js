import React, { Component } from "react";
import { Row, Col, FormGroup, FormControl} from "react-bootstrap";
import Datetime from "react-datetime";
import Button from "../CustomButton/CustomButton.jsx";
import "../../assets/css/collection/collection.css";
import {apiAppCall} from "../../services/api";

class ColManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            closureDate: new Date(),
            finalClosureDate: new Date(),
            description: "Enter some description",
            info: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClosure = (value) =>{
        this.setState({
            closureDate: value
        })
    }

    handleFinalClosure = (value) => {
        this.setState({
            finalClosureDate: value
        })
    }

    handleAdd = async() => {
        let {notify} = this.props;
        try{
            const {api} = this.props;
            await apiAppCall("post", api.post("123"), this.state);
            notify("success", "Add new collection successfully!");
            // this.props.history.push("/collections");
        } catch(err){
            return notify("error", "Cannot add this collection. Please try again.");
        }
    }

    handleUpdate = async() => {
        let {notify} = this.props;
        try{
            const {api} = this.props;
            const {col_id} = this.props.match.params;
            await apiAppCall("put", api.put("123", col_id), this.state);
            notify("success", "Update collection successfully!");
            // this.props.history.push("/collections");
        } catch(err){
            return notify("error", "Cannot update this collection. Please try again.");
        }
    }

    // componentDidUpdate
    async componentDidMount(){
        let {notify} = this.props;
        try{
            const {api} = this.props;
            const {col_id} = this.props.match.params;
            if(col_id !=null){
                let info = await apiAppCall("get", api.getOne("123", col_id));
                // this.setState({info});
                this.setState({
                    title: info.title,
                    closureDate: info.closureDate,
                    finalClosureDate: info.finalClosureDate,
                    description: info.description
                });
                console.log(info);
            }
        } catch(err){
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }


    render() {
        return (
            <div className="collectionList">
                {/* Coordinator */}
                <div className="card">
                    <div className="content">
                    <legend className="title">Manage Collection</legend>
                        <Row>
                            <Col sm={4}>
                                <div className="manage">
                                    <h4 className="title">Collection title</h4>
                                    <FormGroup>
                                        <FormControl placeholder="Enter some title" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                                    </FormGroup>
                                </div>
                            </Col>

                            <Col sm={4}>
                                <div className="manage">
                                    <h4 className="title">Closure date</h4>
                                    <FormGroup>
                                        <Datetime
                                            inputProps={{ placeholder: "Datetime Picker Here" }}
                                            value={this.state.closureDate}
                                            onChange={this.handleClosure}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>

                            <Col sm={4}>
                                <div className="manage">
                                    <h4 className="title">Final closure date</h4>
                                    <FormGroup>
                                        <Datetime
                                            inputProps={{ placeholder: "Datetime Picker Here" }}
                                            value={this.state.finalClosureDate}
                                            onChange={this.handleFinalClosure}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="area">
                    <div className="card">
                        <div className="content">
                            <legend className="title">Described Collection</legend>
                            <div className="contri-row">
                                <Row>
                                    <div className="parag">
                                        <Col>
                                            <textarea className="areatext" name="description" rows="7" cols="221" value={this.state.description} onChange={this.handleChange} />
                                        </Col>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

                <Row sm={12}>
                    <div className="btn-manage">
                        <Col>
                            <Button bsStyle="primary" pullRight fill wd onClick={this.handleAdd}> <i className="fas fa-plus"/> Create </Button>
                            <Button bsStyle="info" pullRight fill wd onClick={this.handleUpdate}> <i className="fas fa-pencil-alt" /> Update </Button>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default ColManage;
