import React, {Component} from "react";
import CbComment from "../../components/Contribution/CbComment";
import {apiAppCall} from "../../services/api";
import {connect} from "react-redux";
import withNotice from "../../hocs/withNotice";
import access from "../../services/credential";

class CbCommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            writeCmt: false,
            comment: ""
        }
    }

    static getDerivedStateFromProps(nextProp, prevState) {
        if(prevState.comment === "" && nextProp.saveCmt)
            return {comment: nextProp.saveCmt.text}
        return null;
    }

    openCmt = () => {
        const {writeCmt} = this.state;
        const {saveCmt} = this.props;
        this.setState({writeCmt: !writeCmt, comment: saveCmt ? saveCmt.text : ""});
    }

    hdChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    hdAddComment = async() => {
        let {notify, user, match, api, load} = this.props;
        let {comment} = this.state;
        try{
            if(window.confirm("Do you want to comment this contribution?")){
                if(comment !== ""){
                    const {col_id, cb_id} = match.params;
                    const {viewname, profileImg} = user;
                    await apiAppCall("put", api.comment(user.faculty_id, col_id, cb_id), {
                        comment: {
                            text: comment,
                            profileImg: profileImg.link,
                            viewname
                        }
                    });
                    await load();
                    this.setState({writeCmt: false});
                    return notify("success", "Add comment for contribution successfully!");
                }
                return notify("error", "There is no written comment");
            }
        } catch(err){
            return notify("error", "Cannot comment for this contribution now. Please try again.");
        }
    }

    render() {
        console.log(this.props);
        return <CbComment
            {...this.props}
            {...this.state}
            hdAddComment={this.hdAddComment}
            hdChange={this.hdChange}
            openCmt={this.openCmt}
        />
    }
}

const mapState = ({user}) => {
    return {
        user: user.data,
        access: access(user.data.roles[0].code)
    }
}

export default connect(mapState, null)(withNotice(CbCommentContainer));
