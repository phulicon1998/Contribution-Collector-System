import React, { Component } from "react";
import "../../assets/css/contribution/contribution.css";


export class ContributionCard extends Component {
  render() {
    const {active} = this.props;
    return (
      <div className={`card card-stats box ${active ?  "active-con" : "unactive-con"} `}>
        <div className="content">
          <div className="row">
            <div className="contain-items">
              <i className={`pe-7s-photo ${active ? "active" : "unactive"}`}></i>
              <i className={`pe-7s-news-paper ${active ? "active" : "unactive"}`}></i>
            </div>
          </div>
        </div>
        <div className="footer">
          <hr className={`${active ? "active" : "unactive"}`} />
          <div className="stats">
            <i>{this.props.statsIcon} {this.props.statsIconText}</i>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributionCard;
