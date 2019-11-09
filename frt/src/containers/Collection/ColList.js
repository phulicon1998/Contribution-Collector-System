import React, { Component } from "react";
import {connect} from "react-redux";
import {apiAppCall} from "../../services/api";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";
import ColList from "../../components/Collection/ColList";

class ColListContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        let {notify, data, apiGet} = this.props;
        try{
            let list = await apiAppCall("get", apiGet(data.faculty_id));
            this.setState({list});
        } catch(err){
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    render() {
        const {list} = this.state;
        return (
            <ColList
                {...this.props}
                list = {list}
            />
        );
    }
}

const mapState = ({user}) => ({
    data: user.data,
    access: access(user.data.roles[0].code)
});

export default connect(mapState, null)(withNotice(ColListContainer));
