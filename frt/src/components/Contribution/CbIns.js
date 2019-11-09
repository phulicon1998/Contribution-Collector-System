import React from "react";

export const CbImg = ({link, name}) => (
    <div className="card boxUpload">
        <div className="content cbImg">
            <img src={link} alt="img"/>
            <div>
                <div>
                    <i className="fas fa-file-image"></i>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    </div>
)

export const CbWord = ({name}) => (
    <div className="card boxUpload">
        <div className="content cbWord">
            <i className="pe-7s-bookmarks"></i>
            <div>
                <div>
                    <i className="far fa-file-word"></i>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    </div>
)
