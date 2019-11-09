import React, {Component} from "react";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import {apiAppFdCall} from "../../services/api";
import {CbImg, CbWord} from "../Contribution/CbIns";
import withUploader from "../../hocs/withUploader";
import ColUploadBox from "./ColUploadBox";
import {
  Row,
  Col,
  Nav,
  NavItem,
  Tab
} from "react-bootstrap";
import Card from "../Card/Card.jsx";

const Browse = () => <button className="btn btn-success btn-fill"><i className="fas fa-plus"></i> Browse more file</button>

class ColSubmit extends Component {

    constructor(props){
        super(props);
        this.state = {
            checked: false,
            imageFiles: [],
            wordFiles: []
        }
    }

    removeWord = () => this.setState({wordFiles: []});

    removeImage = () => this.setState({imageFiles: []});

    getImage = (files) => {
        const {imageFiles} = this.state;
        this.setState({imageFiles: [...imageFiles, ...files]});
    }

    getWord = (files) => {
        const {wordFiles} = this.state;
        this.setState({wordFiles: [...wordFiles, ...files]});
    }

    submit = async() => {
        let {notify, apiCreate, user, colId, load} = this.props;
        const {imageFiles, wordFiles} = this.state;
        try{
            let fd = new FormData();
            let hasImg = imageFiles.length > 0;
            let hasWord = wordFiles.length > 0;
            if(hasImg || hasWord){
                if(hasImg){
                    imageFiles.forEach((file, i) => {
                        fd.append('images' , file);
                    })
                }
                if(hasWord){
                    wordFiles.forEach((file, i) => {
                        fd.append('words', file);
                    })
                }
                fd.append("collection_id", colId);
                await apiAppFdCall("post", apiCreate(user._id), fd);
                notify("success", "Add new contribution successfully!");
                this.setState({
                    imageFiles: [],
                    wordFiles: [],
                    checked: false
                });
                await load();
            } else {
                return notify("error", "Cannot submit without any uploaded contribution.");
            }
        } catch(err){
            return notify("error", "Cannot submit contribution now. Please try again.");
        }
    }

    toggleChange = () => {
        this.setState({
            checked: !this.state.checked,
        });
    }

    render() {
        const {uploadImage, uploadWord} = this.props;
        const {checked, imageFiles, wordFiles} = this.state;
        const NoImg = withUploader(ColUploadBox);
        const NoWord = withUploader(ColUploadBox);
        const BrowseBtn = withUploader(Browse);
        const listImg = imageFiles.map(file => (
            <Col md={2} key={file.id}>
                <CbImg name={file.name} link={file.preview.url}/>
            </Col>
        ));
        const listWord = wordFiles.map(file => (
            <Col md={2} key={file.id}>
                <CbWord name={file.name}/>
            </Col>
        ));

        const tabsIcons = (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="info">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="info">
                                <i className="fa fa-info" /> Image
                            </NavItem>
                            <NavItem eventKey="account">
                                <i className="fa fa-user" /> Word
                            </NavItem>
                            <NavItem eventKey="style">
                                <i className="fa fa-cube" /> Confirm
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="info">
                                {
                                    listImg.length > 0
                                    ? <div>
                                        {listImg}
                                        <Col md={12}>
                                            <div className="uploadBtn">
                                                <BrowseBtn {...uploadImage} getFile={this.getImage}/>
                                                <button className="btn btn-default" onClick={this.removeImage}><i className="fas fa-trash"></i></button>
                                            </div>
                                        </Col>
                                    </div>
                                    : <NoImg
                                        {...uploadImage}
                                        rm={this.removeImage}
                                        getFile={this.getImage}
                                        file="image"
                                        icon="fas fa-file-image"
                                    />
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="account">
                                {
                                    listWord.length > 0
                                    ? <div>
                                        {listWord}
                                        <Col md={12}>
                                            <div className="uploadBtn">
                                                <BrowseBtn {...uploadWord} getFile={this.getWord}/>
                                                <button className="btn btn-default" onClick={this.removeWord}><i className="fas fa-trash"></i></button>
                                            </div>
                                        </Col>
                                    </div>
                                    : <NoWord
                                        {...uploadWord}
                                        rm={this.removeWord}
                                        getFile={this.getWord}
                                        file="word"
                                        icon="far fa-file-word"
                                    />
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="style">
                                <div className="checkBx">
                                <Checkbox number="1" checked={this.state.checked} onChange = {this.toggleChange} label="Please read terms and conditions of use carefully before accessing, using or obtaining any materials, information, products or services. By accessing, the website, mobile or tablet application, or any other feature or other platform (collectively “Our Website”) you agree to be bound by the terms and agree to responsible for all content posted on the website." />
                                </div>
                                {
                                    checked
                                    ? <Button bsStyle="info" pullRight fill onClick={this.submit}> Submit Contribution</Button>
                                    : <Button disabled bsStyle="info" pullRight fill> Submit Contribution</Button>
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );

        return (
            <div>
                <legend className="title">Submit Contribution</legend>
                <Card
                    title="Upload Images & Words"
                    category="Switch tabs for changing between file types"
                    ctFullWidth
                    content={tabsIcons}
                />
                <div className="clearfix" />
            </div>
        )
    }
}

export default ColSubmit;
