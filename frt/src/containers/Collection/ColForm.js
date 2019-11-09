import React, { Component } from "react";
import {apiAppCall} from "../../services/api";
import {connect} from "react-redux";
import withNotice from "../../hocs/withNotice";
import ColForm from "../../components/Collection/ColForm";
import moment from "moment";

class ColFormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            closureDate: moment(),
            finalClosureDate: moment(),
            description: ""
        }
    }

    async componentDidMount(){
        let {notify, api, user} = this.props;
        const {col_id} = this.props.match.params;
        if(col_id){
            try{
                let info = await apiAppCall("get", api.get(user.data._id, col_id));
                this.setState({
                    ...info,
                    closureDate: moment(info.closureDate),
                    finalClosureDate: moment(info.finalClosureDate)
                });
            } catch(err){
                return notify("error", "The data cannot loaded. Please try again.");
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClosure = (value) => {
        this.setState({
            closureDate: value
        })
    }

    handleFinalClosure = (value) => {
        this.setState({
            finalClosureDate: value
        })
    }

    verifyInput = () => {
        const {title, description, closureDate, finalClosureDate} = this.state;
        const closureLeft = moment(closureDate).diff(new Date(), "days") + 1;
        const finalClosureLeft = moment(finalClosureDate).diff(new Date(), "days") + 1;
        return description.length > 0 && title.length > 0 && closureLeft > 1 && finalClosureLeft > 1 && closureLeft < finalClosureLeft;
    }

    handleSubmit = async() => {
        let {notify, api, user, match, msg} = this.props;
        try{
            if(this.verifyInput()){
                if(match.params.col_id){
                    await apiAppCall("put", api.submit(user.data._id, match.params.col_id), this.state);
                } else {
                    await apiAppCall("post", api.submit(user.data._id), this.state);
                }
                notify("success", msg);
                return this.props.history.push("/collections");
            }
            return notify("warning", "The entered information is invalid. Please try again.");
        } catch(err){
            return notify("error", "The process get some errors. Please try again.");
        }
    }

    render() {
        return <ColForm
            {...this.props}
            {...this.state}
            hdChange={this.handleChange}
            hdClosure={this.handleClosure}
            hdFinalClosure={this.handleFinalClosure}
            hdSubmit={this.handleSubmit}
        />
    }
}

const mapState = ({user}) => ({user});

export default connect(mapState, null)(withNotice(ColFormContainer));
