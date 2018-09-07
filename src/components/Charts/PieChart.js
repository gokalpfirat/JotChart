import React, { Component } from 'react';

var CanvasJSReact = require('../../library/canvasjs/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: null,
            qData: null,
        };
    }


    handleClick = (format) => {
        this.chart.exportChart({format: format});
    };

    render() {
        const options = {
            exportEnabled: false,
            animationEnabled: false,
            interactivityEnabled: false,
            theme: this.props.options.theme,
            title: {
                text: this.props.options.title,
            },
            subtitles: [{
                text: this.props.options.subtitle,
                fontFamily: "Verdana",
            }],
            data: [{
                type: "pie",
                startAngle: this.props.options.startAngle,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: this.props.options.showInLegend,
                legendText: "{label}",
                indexLabelFontSize: this.props.options.indexLabelFontSize,
                indexLabel: "{label} - {y}%",
                dataPoints: this.props.percentageAnswers
            }]
        }
        if(options.data[0].dataPoints != null) {
            return (
                <div>
                    <CanvasJSChart options={options}
                        onRef={ref => this.chart = ref}
                    />
                    <button className='btn btn-outline-dark mt-4 mr-5' onClick={() => {this.handleClick("jpg")}}>Save as JPEG</button>
                    <button className='btn btn-outline-dark mt-4' onClick={() => {this.handleClick("png")}}>Save as PNG</button>
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            );
        } else {
            return (
                <h1>Loading</h1>
            );
        }
    }
}

export default PieChart;