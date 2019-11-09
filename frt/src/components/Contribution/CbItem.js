import React from "react";

const CbItem = ({name, access, newSub, colId, conId, latest, comment, selectForPublic, approveStatus}) => (
    <div className="card">
        <div className="content cbBox">
            {access("001") && approveStatus === "Deny" && <div className="statusSign">
                <i className="fas fa-minus-circle deny"></i>
            </div>}
            {access("001") && latest && !comment && !selectForPublic && <div className="statusSign">
                <i className="far fa-arrow-alt-circle-up"></i>
            </div>}
            {!access("002") && latest && <div className="statusSign">
                {comment && <i className="far fa-dot-circle comment"></i>}
                {selectForPublic && <i className="far fa-check-circle select"></i>}
            </div>}
            {!access("001") && newSub && <div className="statusSign">
                <span>new</span>
            </div>}
            <a href={`/submissions/${colId}/contributions/${conId}`}><i className="pe-7s-folder"></i></a>
            <div className="label">
                <div>
                    <i className="fas fa-user"></i>
                    <p>{name}</p>
                </div>
                <i className="fas fa-cloud-download-alt"></i>
            </div>
        </div>
    </div>
)

export default CbItem;
