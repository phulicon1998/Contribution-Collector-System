import React, {Component} from "react";
import {Table, Row, Col } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import Card from "../Card/Card.jsx";
import {apiAppCall} from "../../services/api";
import {connect} from "react-redux";
import AppLayout from "../Layout/AppLayout";

class NumberPercentCb extends Component {
    constructor(props){
        super(props);
        this.state = {
            report: []
        };
    }

    async componentDidMount(){
        let {notify, data, apiGet} = this.props;
        try{
            let report = await apiAppCall("get", apiGet(data.faculty_id));
            this.setState({report});
        } catch(err){
            return notify("error", "The data cannot loaded. Please try angain.");
        }
    }

    render(){
        const selectHeaderTable = ["Type", "Number", "Percent"];
        const {report} = this.state;

        let approveCon = report.filter(val => val.approveStatus === "approve");
        let publicCon = report.filter(val => val.selectForPublic === true);
        let commentCon = report.filter(val => val.comment != null);

        let totalCon = report.length;

        let approve = approveCon.length;
        let approvePer = (approve*100/totalCon).toFixed(2);
        let unApprovePer = 100-approvePer;

        let published = publicCon.length;
        let publicPer = (published*100/approve).toFixed(2);
        let unpublicPer = 100 - publicPer;

        let commented = commentCon.length;
        let cmtPer = (commented*100/approve).toFixed(2);
        let unCmtPer = 100 - cmtPer;

        const approvedPie = {
            type: "Pie",
            data: {
                labels: [approvePer+`%`, unApprovePer+`%`],
                series: [approvePer, unApprovePer]
            }
        };

        const approveTableData = [
            ["Contributor who has approved contribution", [approve], [approvePer]+`%`],
            ["Contributor who has unapproved contribution", [totalCon]-[approve], [unApprovePer]+`%`]
        ]

        const selectPie = {
            type: "Pie",
            data: {
                labels: [publicPer+`%`, unpublicPer+`%`],
                series: [publicPer, unpublicPer]
            }
        };

        const selectTableData = [
            ["Contributor who has selected contribution", [published],[publicPer]+`%`],
            ["Contributor who has unselected contribution", [[approve]-[published]], [unpublicPer]+`%`]
        ]

        const commentPie = {
            type: "Pie",
            data: {
                labels: [cmtPer+`%`, unCmtPer+`%`],
                series: [cmtPer, unCmtPer]
            }
        };

        const commentTableData = [
            ["Contributor who has commented contribution", [commented],[cmtPer]+`%`],
            ["Contributor who has uncommented contribution", [[approve]-[commented]], [unCmtPer]+`%`]
        ]


        return (
            <AppLayout {...this.props}>
                <Row>
                    <Col md={6}>
                        <Card
                            title="Approved Contributor Number"
                            category="Number of contributor who has selected and approved contribution"
                            tableFullWidth
                            content={
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            {selectHeaderTable.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {approveTableData.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td><b>Total contributor</b></td>
                                            <td><b>{totalCon}</b></td>
                                            <td><b>100 %</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Approved Contributor Percentage"
                            category="Comparing with the total contribution"
                            content={
                                <ChartistGraph
                                    data={approvedPie.data}
                                    type={approvedPie.type}
                                    options={approvedPie.options}
                                    responsiveOptions={approvedPie.responsiveOptions}
                                />
                            }
                            legend={approvedPie.legend}
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Selected Contributor Number"
                            category="Number of contributor who has selected and approved contribution"
                            tableFullWidth
                            content={
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            {selectHeaderTable.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectTableData.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td><b>Total approved contributor</b></td>
                                            <td><b>{approve}</b></td>
                                            <td><b>100 %</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Selected Contributor Percentage"
                            category="Comparing with the total approved contribution"
                            content={
                                <ChartistGraph
                                    data={selectPie.data}
                                    type={selectPie.type}
                                    options={selectPie.options}
                                    responsiveOptions={selectPie.responsiveOptions}
                                />
                            }
                            legend={selectPie.legend}
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Comment Contributor Number"
                            category="Number of contributor who has comment and approved contribution"
                            tableFullWidth
                            content={
                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            {selectHeaderTable.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commentTableData.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td><b>Total approved contributor</b></td>
                                            <td><b>{approve}</b></td>
                                            <td><b>100 %</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Col>
                    <Col md={6}>
                        <Card
                            title="Selected Contributor Percentage"
                            category="Comparing with the total approved contribution"
                            content={
                                <ChartistGraph
                                    data={commentPie.data}
                                    type={commentPie.type}
                                    options={commentPie.options}
                                    responsiveOptions={commentPie.responsiveOptions}
                                />
                            }
                            legend={commentPie.legend}
                        />
                    </Col>
                </Row>
            </AppLayout>
        )
    }
}

const mapState = ({user}) => {
    return {
        data: user.data,
        code: user.data.roles[0].code
    }
}

export default connect(mapState, null)(NumberPercentCb);
