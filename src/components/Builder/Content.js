import React, {Component, Fragment} from 'react';
import PieChart from "../Charts/PieChart";
import axios from "axios/index";
import Properties from "./Properties";
import ColumnChart from "../Charts/ColumnChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";

class Content extends Component {
    render() {
        if (this.props.showChart != 'empty') {
            return (
                <Fragment>
                    <div className='col-7 full-height content'>
                        <div className='shadow-lg p-3 bg-white rounded text-center w-75'>
                            {this.props.showChart === 'pie' ?
                                <PieChart percentageAnswers={this.props.percentageAnswers} qData={this.props.qData}
                                          options={this.props.options}/> : null}
                            {this.props.showChart === 'column' ?
                                <ColumnChart answers={this.props.answers} qData={this.props.qData}
                                             options={this.props.options}/> : null}
                            {this.props.showChart === 'bar' &&
                            <BarChart answers={this.props.answers} qData={this.props.qData}
                                      options={this.props.options}/>}
                            {this.props.showChart === 'doughnut' ?
                                <DoughnutChart percentageAnswers={this.props.percentageAnswers} qData={this.props.qData}
                                               options={this.props.options}/> : null}
                        </div>
                    </div>
                    <Properties clicked={this.props.clicked} onChangeClick={this.props.onChangeClick}
                                options={this.props.options} onNameChange={this.props.onNameChange}
                                onAngleChange={this.props.onAngleChange} onShowDescChange={this.props.onShowDescChange}
                                onSizeChange={this.props.onSizeChange} onSubtitleChange={this.props.onSubtitleChange}
                                onThemeChange={this.props.onThemeChange} showValues={this.props.showChart}/>
                </Fragment>
            );
        } else {
            return (
                <div>
                </div>
                )
        }
    }

}

export default Content;