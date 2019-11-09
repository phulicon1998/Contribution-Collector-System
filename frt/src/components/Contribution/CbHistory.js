import React from "react";
import AppLayout from "../Layout/AppLayout";
import CbList from "./CbList";
import "../../assets/css/contribution/contribution.css";

const CbHistory = ({title, ...props}) => (
    <AppLayout {...props}>
        <CbList {...props} title={`Submissions of '${title}'`}/>
    </AppLayout>
)

export default CbHistory;
