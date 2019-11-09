import React, {Component} from "react";
import Files from "react-files";
import {Row} from "react-bootstrap";

export default function withUploader(RenderComponent){
    class Uploader extends Component {

        getUpFile = (files) => {
            const {getFile} = this.props;
            getFile(files);
            this.refs.files.removeFiles();
        }

        showErr = (error, file) => console.log('error code ' + error.code + ': ' + error.message);

        render() {
            const {type, file, icon} = this.props;
            return (
                <Row>
                    <div className="col-md-12">
                        <Files
                            ref='files'
                            onChange={this.getUpFile}
                            onError={this.showError}
                            multiple
                            accepts={type}
                            clickable
                        >
                            <RenderComponent file={file} icon={icon}/>
                        </Files>
                    </div>
                </Row>
            )
        }
    }

    return Uploader;
}
