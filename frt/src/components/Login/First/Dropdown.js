import React, {Component} from "react";
import {connect} from "react-redux";

class Dropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    render() {
        const {label, api} = this.props;
        return (
            <div className="mgzine-dropdown">
                <label>{label}</label>
                <select>{this.state.list}</select>
            </div>
        )
    }
}
const mapState = ({user}) => ({...user});

export default connect(mapState, null)(Dropdown);
