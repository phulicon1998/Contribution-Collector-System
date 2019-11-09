import React, { Component } from "react";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <div className="row">
            <div className="col-xs-2">
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </div>
            <div className="col-xs-10">
              <div className="numbers">
                <p>{this.props.statsText}</p>
                <h5>{this.props.statsValue}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <hr />
          <div className="stats">
            {this.props.statsIcon} {this.props.statsIconText}
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
