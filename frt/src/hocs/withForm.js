import React, {Component} from "react";
import "../assets/css/Manage/manage.css";
import { Row, Col } from "react-bootstrap";
import {apiAppCall} from "../services/api";
import AppLayout from "../components/Layout/AppLayout";
import withNotice from "./withNotice";

export default function withForm(DataTable, RenderedForm){
    class TableWithForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                open: false,
                data: [],
                tdData: [],
                select: {}
            }
        }

        async componentDidMount(){
            await this.load();
        }

        toggleForm = async(refresh = false) => {
            const {open} = this.state;
            if(refresh){
                await this.load();
            }
            if(open) {
                this.setState({open: !open, select: {}});
            } else {
                this.setState({open: !open});
            }
        }

        load = async() => {
            const {apiGet, notify, toTd} = this.props;
            try {
                let data = await apiAppCall("get", apiGet);
                let tdData = toTd(data);
                this.setState({data, tdData});
            } catch(err) {
                notify("error", "The process has some errors. Please try again.");
            }
        }

        select = (key) => {
            let select = this.state.data.filter(val => val._id === key)[0];
            this.setState({select, open: true});
        }

        render() {
            const {open, tdData, select} = this.state;
            const {table, form, notify, col, history} = this.props;
            let tableCol = col < 12 && open ? 12 - col : 12;
            return (
                <AppLayout {...this.props}>
                    <Row>
                        { open &&
                            <Col md={col}>
                                <div className="updateForm">
                                    <RenderedForm
                                        {...form}
                                        notify={notify}
                                        toggleForm={this.toggleForm}
                                        selected={select}
                                    />
                                </div>
                            </Col>
                        }
                        <Col md={tableCol}>
                            <DataTable
                                {...table}
                                data={tdData}
                                open={open}
                                notify={notify}
                                toggleForm={this.toggleForm}
                                load={this.load}
                                select={this.select}
                                history={history}
                            />
                        </Col>
                    </Row>
                </AppLayout>
            )
        }
    }

    return withNotice(TableWithForm);
}
