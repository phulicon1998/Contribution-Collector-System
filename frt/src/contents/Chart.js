var React = require("react");

// ##############################
// // // 12 Months Performance
// #############################
const hoursChart = {
  type: "Line",
  data: {
    labels: [
        "0am",
        "2am",
        "4am",
        "6am",
        "8am",
        "10am",
        "12am",
        "2pm",
        "4pm",
        "6pm",
        "8pm",
        "10pm"
    ],
    series: [[1, 16, 17, 24, 37, 38, 42, 56, 59, 64, 70, 80]]
  },
  options: {
    showPoint: false,
    lineSmooth: true,
    height: "260px",
    axisX: {
      showGrid: false,
      showLabel: true
    },
    axisY: {
      offset: 40
    },
    low: 0,
    high: 100,
    chartPadding: {
      right: -18
    }
  }
};

// ##############################
// // // Views
// #############################
const viewsChart = {
    type: "Bar",
    data: {
      labels: [
        "0am",
        "2am",
        "4am",
        "6am",
        "8am",
        "10am",
        "12am",
        "2pm",
        "4pm",
        "6pm",
        "8pm",
        "10pm"
      ],
      series: [[320, 326, 434, 444, 453, 542, 553, 568, 610, 756, 780, 895]]
    },
    options: {
      seriesBarDistance: 10,
      classNames: {
        bar: "ct-bar ct-azure"
      },
      axisX: {
        showGrid: false
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ]
  };

// ##############################
// // // Users Behavior
// #############################
const usersChart = {
  type: "Line",
  data: {
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    series: [
      [287, 385, 490, 554, 586, 698, 752, 788, 846, 944],
      [67, 143, 152, 287, 335, 435, 539, 542, 544, 647],
      [23, 67, 113, 190, 239, 307, 308, 410, 410, 509]
    ]
  },
  options: {
    low: 0,
    high: 1000,
    showArea: false,
    height: "245px",
    axisX: {
      showGrid: true
    },
    lineSmooth: true,
    showLine: true,
    showPoint: true,
    chartPadding: {
      right: -25
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ]
};


// ##############################
// // // Contribution with comment
// #############################
const cbWithCmt = {
    type: "Pie",
    data: {
      labels: ["62%", "", "38%"],
      series: [62, 38]
    }
  };

// ##############################
// // // Contribution without comment
// #############################
const cbWithoutCmt = {
    type: "Pie",
    data: {
      labels: ["94%", "6%%", "0%"],
      series: [94, 6, ]
    }
  };



// ##############################
// // // All charts
// #############################

const faculty = [
  {
    chart: {
      title: "Contribution submited in per days",
      category: "Number of contribution",
      chart: hoursChart
    }
  },
  {
    chart: {
      title: "Contribution submited in per days",
      category: "Number of contribution",
      chart: viewsChart
    }
  }
];

const coordinator = [
    {
      chart: {
        title: "Users Behavior",
        category: "Number of contribution",
        chart: usersChart,
        legend: (
            <div>
            <span>
                <i className="fa fa-circle text-info" /> Information technology
            </span>
            <span>
                <i className="fa fa-circle text-danger" /> Economic
            </span>
            <span>
                <i className="fa fa-circle text-warning" /> Medical
            </span>
            </div>
        )
      }
    }
  ];

  const eception = [
    {
        chart: {
          title: "Contribution with comment in date",
          category: "Pie Chart",
          chart: cbWithCmt,
          legend: (
            <div>
              <span>
                <i className="fa fa-circle text-info" /> Commented
              </span>
              <span>
                <i className="fa fa-circle text-warning" /> Without comment
              </span>
            </div>
          )
        }
      },
      {
        chart: {
          title: "Contribution without comment after final date",
          category: "Pie Chart",
          chart: cbWithoutCmt,
          legend: (
            <div>
              <span>
                <i className="fa fa-circle text-info" /> Commented after final day
              </span>
              <span>
                <i className="fa fa-circle text-danger" /> Without comment after final day
              </span>
            </div>
          )
        }
      }
  ];

  const dashboard = [
    {
        chart: {
          title: "Number of people submit",
          category: "Pie Chart",
          chart: cbWithCmt,
          legend: (
            <div>
              <span>
                <i className="fa fa-circle text-info" /> Submit
              </span>
              <span>
                <i className="fa fa-circle text-warning" /> No submit
              </span>
            </div>
          )
        }
      },
      {
        chart: {
          title: "Number of contribution",
          category: "Number of contribution",
          chart: usersChart,
          legend: (
              <div>
              <span>
                  <i className="fa fa-circle text-info" /> Submited
              </span>
              <span>
                  <i className="fa fa-circle text-danger" /> Comment
              </span>
              <span>
                  <i className="fa fa-circle text-warning" /> Public
              </span>
              </div>
          )
        }
      }
  ];

module.exports = {
  hoursChart,
  usersChart,
  cbWithCmt,
  cbWithoutCmt,
  faculty,
  coordinator,
  eception,
  dashboard
};
