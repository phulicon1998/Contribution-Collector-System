import React, { Component } from "react";
import "../../assets/css/submitContribution/submit.css";
import Button from "../CustomButton/CustomButton.jsx";
import UploadCard from "./UploadCard";
import {apiCall} from "../../services/api";
import {
    Row,
    Col,
    ProgressBar
} from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import {connect} from "react-redux";
import "../../assets/css/collection/collection.css";

const NoImg = () => (
    <p className="param-in "> <i className="fa fa-file-image-o"></i> Drop images here</p>
)

const NoWord = () => (
    <p className="param-in "> <i className="fa fa-file-word-o"></i> Drop words here</p>
)

class SubmitForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            checked: false,
            imageFiles: [],
            wordFiles: [],
            dated: new Date().toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).toString()
        }
        // this.toggleChange = this.toggleChange.bind(this);
    }

    getWord = (files) => this.setState({wordFiles: files});

    removeWord = () => this.setState({wordFiles: []});

    getImage = (files) => {
        console.log(files);
        this.setState({imageFiles: files});
    }

    removeImage = () => this.setState({imageFiles: []});

    submit = async() => {
        const err = [] ;

        let fd = new FormData();
        if(this.state.imageFiles.length > 0){
            this.state.imageFiles.forEach((file, i) => {
                fd.append('images' , file);
            })
        }
        if(this.state.wordFiles.length > 0){
            this.state.wordFiles.forEach((file, i) => {
                fd.append('words', file);
            })
        }

        const {student_id} = this.props;

        await apiCall("post", `/api/student/${student_id}/contributions`, fd);

        this.setState({
            imageFiles: [],
            wordFiles: [],
            checked: false
        });

    }

    toggleChange = () => {
        this.setState({
            checked: !this.state.checked,
        });
    }

    render() {
        const {uploadWord, uploadImage} = this.props;
        const {imageFiles, wordFiles, checked} = this.state;

        const listImg = imageFiles.map(file => (
            <img className='image' src={file.preview.url} key={file.id} />
        ));

        const listWord = wordFiles.map(file => (
            <div className="col-md-4 margind" key={file.id}>
                <div className="word">
                    <i className="fa fa-file-word-o"></i> <b>{file.name}</b> - {this.state.dated}
                </div>
            </div>
        ));

        const checkbx = (
            <Col>
                <div className="checkBx">
                    <Checkbox number="1" checked={this.state.checked} onChange = {this.toggleChange} label="Please read terms and conditions of use carefully before accessing, using or obtaining any materials, information, products or services. By accessing, the website, mobile or tablet application, or any other feature or other platform (collectively “Our Website”) you agree to be bound by the terms and agree to responsible for all content posted on the website." />
                </div>
                {
                    this.checked = checked
                    ? <Button bsStyle="info" pullRight fill onClick={this.submit}> Submit Contribution</Button>
                    : <Button disabled bsStyle="info" pullRight fill onClick={this.submit}>Submit Contribution</Button>

                }
                <div className="clearfix" />
            </Col>

        );

        const collection = (
            <div className="card">
                <div className="content">
                    <Row>
                        <Col sm={7}>
                            <div className="information">
                                <h3>Collection A</h3>
                                <p><b>Description: </b><br/>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections</p>
                                <p>Created at April 4th, 2019</p>
                            </div>
                        </Col>

                        <Col sm={5}>
                            <div className="process">
                                <h5>Deadline: 30%</h5>
                                <ProgressBar
                                    now={30}
                                    className="progress-line-primary"
                                    label="30% Complete"
                                    srOnly
                                />

                                <h5>Process: 60%</h5>
                                <ProgressBar
                                    bsStyle="info"
                                    now={60}
                                    className="progress-line-info"
                                    label="60% Complete"
                                    srOnly
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );


        return (
          <div>
                {collection}

                <UploadCard {...uploadImage} rm={this.removeImage} getFile={this.getImage} empty={imageFiles.length === 0} list={listImg.length > 0 ? listImg : <NoImg />}/>
                <UploadCard {...uploadWord} rm={this.removeWord} getFile={this.getWord} empty={wordFiles.length === 0} list={listWord.length > 0 ? listWord : <NoWord />}/>

                {checkbx}

          </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        student_id: reduxState.user.data._id
    }
}

export default connect(mapStateToProps, null)(SubmitForm);
