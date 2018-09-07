import React, { Component } from 'react';

var CanvasJSReact = require('../../library/canvasjs/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: null,
            qData: null,
        };
    }

    percentage(partialValue, totalValue) {
        return Math.round((100 * partialValue) / totalValue);
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
            axisY: {
              // labelFormatter: (e) => {return e.value+"%"}
            },
            data: [{
                type: "column",
                dataPoints: this.props.answers
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

export default ColumnChart;