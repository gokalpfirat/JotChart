import React, { Component } from 'react';
import firebase from '../../firebase';
import PieChart from "../Charts/PieChart";
import ColumnChart from "../Charts/ColumnChart";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";
import axios from "axios/index";
import darkLogo from '../../assets/logo-dark.png';

class ChartViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            answers: null,
            percentageAnswers: null,
            qData: null,
            formData: null,
            loading: true,
            settings : {},
        };
    }

    percentage(partialValue, totalValue) {
        return Math.round((100 * partialValue) / totalValue);
    }

    updateChart = () => {
        var data;
        var answers = {};
        var qData;
        var answersArray = [];
        var percentageArray = [];
        var total = 0;
        const formData = new FormData();
        const formData2 = new FormData();
        formData.append('appKey', this.state.settings.appKey);
        formData.append('formId', this.state.settings.formId);

        formData2.append('appKey', this.state.settings.appKey);
        formData2.append('formId', this.state.settings.formId);
        formData2.append('qId', this.state.settings.qId);

        axios.post(`http://gokalpfirat.com/callbacks/getFormSubmissions.php`, formData)
            .then((response) => {
                data = response.data;
            }).then(() => {
            for(var i = 0;i<data.length;i++){
                var tmp = data[i].answers[this.state.settings.qId];
                answers[tmp.answer] = answers[tmp.answer] == null ? 1 : answers[tmp.answer]+1;
                total++;
            }

            if(answers['undefined'] != null) {
                Object.defineProperty(
                    answers,
                    'Empty',
                    Object.getOwnPropertyDescriptor(answers, 'undefined')
                );
                delete answers['undefined'];
            } else if (answers[''] != null){
                Object.defineProperty(answers, 'Empty', Object.getOwnPropertyDescriptor(answers, ''));
                delete answers[''];
            }

            Object.keys(answers).map((item) => {
                answersArray.push({y: answers[item], label: item, name: item});
                percentageArray.push({y: this.percentage(answers[item],total), label: item, name: item})
            });
            this.setState({answers: answersArray, percentageAnswers: percentageArray});
        }).then(() => {
            axios.post(`http://gokalpfirat.com/callbacks/getQuestion.php`, formData2)
                .then((response) => {
                    qData = response.data;
                }).then(() => {
                this.setState({qData: qData});
            })
        }).then(() => {
            axios.post(`http://gokalpfirat.com/callbacks/getFormId.php`, formData)
                .then((response) => {
                    qData = response.data;
                }).then(() => {
                this.setState({formData: qData});
                this.setState({loading : false});
                setInterval(this.updateChart,500);
            });
        });
    };

    componentDidMount() {
        const myRef = firebase.database().ref('charts/'+this.props.match.params.chartId);
        myRef.on('value', (snapshot) => {
            let items = snapshot.val();
            this.setState({settings: items});
            this.updateChart();
        });

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleTopClick = () => {
        this.props.history.push('/');
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className='container centerDiv'>
                    <div className='w-75 p-3'>
                        <div className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                            <h2 className='textShadow mb-4 pb-2 pointer border-bottom' onClick={this.handleTopClick}><span style={{color: '#fa8900'}}>Jot</span><span style={{color: '#434343'}}>Charts</span></h2>
                            {this.state.settings.type === 'pie' ?
                                <PieChart percentageAnswers={this.state.percentageAnswers} qData={this.state.qData}
                                          options={this.state.settings.options}/> : null}
                            {this.state.settings.type === 'column' ?
                                <ColumnChart answers={this.state.answers} qData={this.state.qData}
                                             options={this.state.settings.options}/> : null}
                            {this.state.settings.type === 'bar' ?
                                <BarChart answers={this.state.answers} qData={this.state.qData}
                                          options={this.state.settings.options}/> : null}
                            {this.state.settings.type === 'doughnut' ?
                                <DoughnutChart percentageAnswers={this.state.percentageAnswers} qData={this.state.qData}
                                               options={this.state.settings.options}/> : null}
                            <div className='border border-dark mt-3'>
                                <p className='mt-auto mb-auto pb-1 pt-1'>Form Title: <b>{this.state.formData.title}</b></p>
                                <p className='mt-auto mb-auto pb-1'>Form Author: <b>{this.state.settings.username}</b></p>
                                <p className='mt-auto mb-auto pb-1'>Submission Count: <b>{this.state.formData.count}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='container centerDiv'>
                    <div className='w-50 p-3'>
                        <div className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                            <h3>Loading</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ChartViewer;