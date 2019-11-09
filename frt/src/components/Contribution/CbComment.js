import React from "react";
import Card from "../../components/Card/Card";
import moment from "moment";
import Empty from "../Empty";

function CbEnterComment({user, comment, hdChange, addCmt, openCmt}) {
    return (
        <div className="inputComment">
            <div>
                <img src={user.profileImg.link} alt=""/>
                <textarea
                    name="comment"
                    rows="3"
                    placeholder="Write some comments here..."
                    value={comment}
                    onChange={hdChange}
                />
            </div>
            <div>
                <button className="btn btn-fill btn-success" onClick={addCmt}><i className="fas fa-pen"></i> Confirm</button>
                <button className="btn btn-fill btn-default" onClick={openCmt}><i className="fas fa-eraser"></i></button>
            </div>
        </div>
    )
}

function CbAddComment({openCmt}) {
    return (
        <div className="selectBar">
            <button className="btn btn-info btn-fill" onClick={openCmt}><i className="fas fa-plus"></i> Add comment</button>
            <p>Click to make a comment for this contribution to the student</p>
        </div>
    )
}

function CbHasComment({profileImg, comment, viewname, openCmt, access}) {
    return (
        <div className="hasComment">
            <img src={profileImg} alt=""/>
            <div>
                <p><b>{viewname}</b> has commented at {moment(new Date()).format("MMMM Do, YYYY")}</p>
                <p>{comment}</p>
                {access("003") && <small onClick={openCmt}>Edit</small>}
            </div>
        </div>
    )
}

const CbComment = ({writeCmt, saveCmt, user, comment, hdChange, hdAddComment, openCmt, access}) => {
    if(comment.length > 0 && !writeCmt) {
        return <Card content={
            <CbHasComment
                comment={comment}
                profileImg={saveCmt.profileImg}
                viewname={saveCmt.viewname}
                openCmt={openCmt}
                access={access}
            />
        }/>
    } else {
        if(access("003")){
            if(writeCmt){
                return <Card content={
                    <CbEnterComment
                        hdChange={hdChange}
                        comment={comment}
                        openCmt={openCmt}
                        addCmt={hdAddComment}
                        user={user}
                    />
                }/>
            } else {
                return <Card content={
                    <CbAddComment
                        openCmt={openCmt}
                    />
                }/>
            }
        } else if(access("001")) {
            return <Card content={
                <Empty text="There is no comment yet." height={50} backgroundColor="white" justifyContent="flex-start"/>
            }/>
        } else {
            return <Card content={
                <CbHasComment/>
            }/>
        }
    }
}
export default CbComment;
