import React, {Component} from "react";
import Home from "../../components/views/Home";
import {connect} from "react-redux";
import {apiAppCall} from "../../services/api";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    getSelected = (list) => {
        let select = [];
        for (let fa of list){
            let con = [];
            fa.collection_id.forEach(col => {
                con = [...con, ...col.contribution_id];
            })
            let selectCon = con.filter(c => c.selectForPublic);
            if(selectCon.length > 0){
                select.push({
                    faculty: fa.name,
                    contributions: selectCon
                });
            }
        }
        return select;
    }

    async componentDidMount() {
        const {notify, api} = this.props;
        try {
            let faculties = await apiAppCall("get", api.get());
            this.setState({list: this.getSelected(faculties)});
        } catch(err) {
            return notify("error", "The data cannot loaded. Please try again.");
        }
    }

    render() {
        return(
            <Home
                {...this.state}
                {...this.props}
            />
        )
    }
}

function mapState({user}){
    return {
        user: user.data,
        access: user.isAuthenticated ? access(user.data.roles[0].code) : access("005")
    }
}

export default connect(mapState, null)(withNotice(HomeContainer));
