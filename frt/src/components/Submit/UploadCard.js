import React, {Component} from "react";
import Files from "react-files";
import Card from "../Card/Card.jsx";
import {
    Row,
    Col
} from "react-bootstrap";


class UploadCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            oldFiles: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.empty){
            return {oldFiles: []};
        }
        return null;
    }

    showErr = (error, file) => console.log('error code ' + error.code + ': ' + error.message);

    filesRemoveAll = () => {
        this.refs.files.removeFiles();
    }

    getUploadFile = (files) => {
        console.log(files);
        // console.log(files[0].lastModifiedDate.toString());
        const {getFile} = this.props;
        const {oldFiles} = this.state;
        if(oldFiles.length > 0) {
            let oldFilesDate = oldFiles.map(file => file.lastModifiedDate.toString());
            let newFiles = files.filter(file => oldFilesDate.indexOf(file.lastModifiedDate) === -1);
            getFile(newFiles);
        } else {
            this.setState({oldFiles: files});
            getFile(files);
        }
    }

    render() {
        const {list, button, title, uploader, className, getFile, rm} = this.props;
        return (
            <Row>
                <Col md={12}>
                    <Card
                        title={title} 
                        content={
                            <div className="row">
                                <div className="col-md-12 uploadBox">
                                    <button onClick={this.filesRemoveAll} onChange={rm} className="btn-fill btn-wd btn btn-primary uploadButton"><i className={button.icon} />{button.name}</button>
                                    <Files
                                        ref='files'
                                        onChange={this.getUploadFile}
                                        onError={this.showError}
                                        multiple
                                        accepts={uploader.type}
                                        clickable
                                    >
                                        <div className="border-box itemDisplay">
                                            <div className="row itemDisplay">
                                                {list}
                                            </div>
                                        </div>
                                    </Files>
                                </div>
                            </div>
                        }
                    />
                </Col>
            </Row>
        )
    }

    componentDidMount() {
        if(this.state.oldFiles.length === 0){
            this.refs.files.removeFiles();
        }
    }
}

export default UploadCard;
