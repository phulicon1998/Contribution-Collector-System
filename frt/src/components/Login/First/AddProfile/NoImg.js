import React, {Component} from "react";
import Files from "react-files";

class NoImg extends Component {

    onFilesChange = (files) => {
        this.props.change(files[0].preview.url, files[0]);
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message);
    }

    render(){
        return(
            <Files
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={["image/*"]}
                maxFiles={1}
                clickable
            >
                <div className="emptyImg"><i className="fas fa-plus"></i></div>
            </Files>
        )
    }
}

export default NoImg;
