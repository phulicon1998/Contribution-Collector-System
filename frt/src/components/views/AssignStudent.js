import React, {Component} from "react";
import ExchangeDataTable from "../Table/ExchangeDataTable";
import {apiAppCall} from "../../services/api";
import {Row, Col} from "react-bootstrap";
import AppLayout from "../Layout/AppLayout";
import withNotice from "../../hocs/withNotice";

class AssignStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            unassign: [],
            assign: []
        }
    }

    async componentDidMount(){
        await this.load();
    }

    assign = async(student_id) => {
        const {match, notify} = this.props;
        try{
            await apiAppCall("put", "/api/students/assign", {lecturer_id: match.params.lecturer_id, student_id});
            notify("success", "Assign student successfully!");
            return await this.load();
        } catch(err) {
            return notify("error", "The process has some errors. Please try again.");
        }
    }

    undoAssign = async(student_id) => {
        const {match, notify} = this.props;
        try{
            await apiAppCall("put", "/api/students/unassign", {lecturer_id: match.params.lecturer_id, student_id});
            notify("success", "Unassign student successfully!");
            return await this.load();
        } catch(err) {
            return notify("error", "The process has some errors. Please try again.");
        }
    }

    load = async() => {
        const {apiGet, notify, toTd, match, apiGetLecturer} = this.props;
        const {lecturer_id} = match.params;
        try {
            let data = await apiAppCall("get", apiGet);
            let studentWithFa = data.filter(val => val.faculty_id);
            let lecturer = await apiAppCall("get", apiGetLecturer(lecturer_id));
            let assStudent = data.filter(val => val.lecturer_id === match.params.lecturer_id);
            let unassStudent = [];
            for (let student of studentWithFa){
                if(student.lecturer_id === undefined && student.faculty_id._id === lecturer.faculty_id._id) {
                    unassStudent.push(student);
                }
            }
            this.setState({
                data,
                assign: toTd(assStudent),
                unassign: toTd(unassStudent)
            });
        } catch(err) {
            notify("error", "The process has some errors. Please try again.");
        }
    }

    render() {
        const {unassign, assign} = this.state;
        const {table} = this.props;
        return (
            <AppLayout {...this.props}>
                <Row>
                    <Col md={6}>
                        <ExchangeDataTable
                            {...table}
                            select={this.assign}
                            data={unassign}
                            title="Unassigned Student List"
                            cate="This is the list of all unassign student for lecturer's faculty"
                            load={this.load}
                        />
                    </Col>
                    <Col md={6}>
                        <ExchangeDataTable
                            {...table}
                            select={this.undoAssign}
                            data={assign}
                            title="Assigned Student List"
                            cate="This is the list of all assigned student for lecturer's faculty"
                            load={this.load}
                        />
                    </Col>
                </Row>
            </AppLayout>
        )
    }
}

export default withNotice(AssignStudent);
