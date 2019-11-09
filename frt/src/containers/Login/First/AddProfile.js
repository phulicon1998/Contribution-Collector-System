import React, {Component} from "react";
import FirstDetail from "../../../components/Login/First/AddProfile/FirstDetail";
import HasImg from "../../../components/Login/First/AddProfile/HasImg";
import NoImg from "../../../components/Login/First/AddProfile/NoImg";
import TextField from "../../../components/Login/First/TextField";
import {connect} from "react-redux";
import "../../../assets/css/addProfile/addProfile.css";
import {firstAddProfile, firstAddProfileWithFd} from "../../../store/actions/user";
import AuthLayout from "../../../components/Layout/AuthLayout";

class AddProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            avaList: [
                {
                    url: "https://res.cloudinary.com/dkpl83zte/image/upload/v1555838372/riccardo-mion-652664-unsplash_r0coos.webp",
                    select: false
                },
                {
                    url: "https://res.cloudinary.com/dkpl83zte/image/upload/v1555837249/avaB_ycjce3.webp",
                    select: false
                },
                {
                    url: "https://res.cloudinary.com/dkpl83zte/image/upload/v1555837891/avaC_npeb2v.webp",
                    select: false
                },
                {
                    url: "https://res.cloudinary.com/dkpl83zte/image/upload/v1555838064/avaC-_1__px4ncl.webp",
                    select: false
                }
            ],
            selectAva: "",
            file: "",
            viewname: "",
            submit: false
        }
    }

    componentDidMount(){
        !this.props.isAuth && this.props.history.push("/login");
        this.props.viewname && this.props.history.push("/login/password");
    }

    componentDidUpdate(){
        !this.props.isAuth && this.props.history.push("/login");
        this.props.viewname && this.props.history.push("/login/password");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    changeAva = (ava, file) => {
        this.setState({
            selectAva: ava,
            file
        });
    }

    selectAva = ({url, select}) => {
        const {avaList} = this.state;
        let listAva = avaList.map(ava => (
            {url: ava.url, select: ava.url === url ? true : false}
        ));
        this.setState({
            selectAva: url,
            file: "",
            avaList: listAva
        });
    }

    removeAva = () => {
        let {avaList} = this.state;
        avaList = avaList.map(ava => (
            {url: ava.url, select: false}
        ));
        this.setState({selectAva: "", avaList, file: ""});
    }

    complete = async() => {
        const {viewname, file, selectAva} = this.state;
        if(viewname !== ""){
            this.setState({submit: true});
            if(file !== "" && selectAva !== ""){
                let formData = new FormData();
                formData.append("viewname", viewname);
                formData.append("avatar", file);
                await this.props.firstAddProfileWithFd(formData);
            } else if(file === "" && selectAva !== "") {
                await this.props.firstAddProfile({viewname, profileImg: {link: selectAva, cloud_id: "123"}});
            } else {
                return;
            }
            this.props.history.push("/login/password");
        }
    }

    render(){
        const {avaList, selectAva, submit} = this.state;
        let displayAva = avaList.map((ava, i) => (
            <img
                className={ava.select ? "selected" : ""}
                src={ava.url}
                alt=""
                onClick={this.selectAva.bind(this, ava)}
                key={i}
            />
        ))
        return (
            <AuthLayout {...this.props}>
                <div className="container">
                    <div className="row">
                        <FirstDetail />
                        <div className="col-md-7 logProfile-select">
                            <div className="imgDisplay">
                                {
                                    selectAva === ""
                                    ? <NoImg change={this.changeAva}/>
                                    : <HasImg select={selectAva} remove={this.removeAva}/>
                                }
                            </div>
                            <div className="imgSelect">
                                <p>-  Or using these below  -</p>
                                <div>
                                    {displayAva}
                                </div>
                            </div>
                            <TextField
                                hold={"Please enter your viewname"}
                                name="viewname"
                                value={this.state.viewname}
                                hdChange={this.handleChange}
                                icon={"fas fa-user-tag"}
                            />
                            <div className="next">
                                <button className="btn-fill btn-wd btn btn-info" onClick={this.complete}>{submit ? <i className="fas fa-circle-notch fa-spin"></i> : "Next"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>

        )
    }
}

const mapState = ({user}) => ({isAuth: user.isAuthenticated, email: user.data.email, viewname: user.data.viewname});

export default connect(mapState, {firstAddProfile, firstAddProfileWithFd})(AddProfile);
