import React, {Component} from "react";
import Files from "react-files";
import Button from "../../components/CustomButton/CustomButton.jsx";
import xlsx from "xlsx";

class ImportExcel extends Component {

    constructor(props){
        super(props);
        this.state = {
            file: ""
        }
    }

    onFile = (files) => {
        let file = files[0];
        const reader = new FileReader();
        reader.onload = async(e) => {
            const rs = e.target.result;
            let wb = xlsx.read(rs, {type: "binary"});
            const ws = wb.Sheets[this.props.sheet];
            let data = xlsx.utils.sheet_to_json(ws);
            // get unique data
            let unique = [];
            data.forEach(val => {
                if(unique.filter(u => u.email === val.email).length === 0){
                    unique.push(val);
                }
            })

            return await this.props.import(unique, data.length - unique.length);
        };
        reader.readAsBinaryString(file);
    }

    onErr = (err) => {
        console.log(err);
    }

    render() {
        return (
            <Files
                onChange={this.onFile}
                onError={this.onErr}
                accepts={[".xlsx"]}
                maxFiles={1}
                clickable
            >
                <Button bsStyle="info" wd><i className="fas fa-file-import"></i> Import Excel File</Button>
            </Files>
        )
    }
}

export default ImportExcel;
