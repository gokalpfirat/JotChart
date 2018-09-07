import React, { Component } from 'react';
import axios from "axios/index";
import './Builder.css';
import Sidebar from "./Sidebar";
import Content from "./Content";
import Topbar from "./Topbar";
import lightLogo from '../../assets/logo-light.png';
import LoadingScreen from 'react-loading-screen';
import firebase from '../../firebase';

class Builder extends Component {
    constructor(props){
        super(props);
        this.state = {
          username: sessionStorage.getItem('username'),
          appKey: sessionStorage.getItem('appKey'),
          formId: this.props.match.params.formId,
          qId: this.props.match.params.qId,
          chartKey: null,
          loading: true,
          type : 'empty',
          title: "",
          answers: null,
          percentageAnswers: null,
          qData: null,
          formData: null,
          clicked: true,
            options: {
                title: "",
                startAngle: 75,
                showInLegend: true,
                indexLabelFontSize: 16,
                subtitle: "",
                theme: 'light1',
                loading: false,
            }
        };
    }

    handleShare = () => {
        const myRef = firebase.database().ref('charts/');
        myRef.push(this.state).then((res => {
            this.setState({chartKey: res.getKey()})
        }));
    };

    handleSave = (chartId) => {
        const myRef = firebase.database().ref('charts/'+chartId);
        myRef.update(this.state);
    };

    handleClick = (value) => {
      this.setState({type: value, clicked: true});
    };

    changeClick = () => {
        this.setState({clicked: !this.state.clicked});
    }

    handleTopClick = () => {
        this.props.history.push('/');
    }

    percentage(partialValue, totalValue) {
        return Math.round((100 * partialValue) / totalValue);
    }

    onNameChange = (value) => {
        let options = Object.assign({}, this.state.options);
        options.title = value;
        this.setState({options});
    };

    onAngleChange = (value) => {
        let options = Object.assign({}, this.state.options);
        options.startAngle = parseInt(value);
        this.setState({options});
    };

    onSizeChange = (value) => {
        let options = Object.assign({}, this.state.options);
        options.indexLabelFontSize = parseInt(value);
        this.setState({options});
    };

    onShowDescChange = (bool) => {
        let options = Object.assign({}, this.state.options);
        options.showInLegend = bool === 'true';
        this.setState({options});
    };

    onSubtitleChange = (value) => {
        let options = Object.assign({}, this.state.options);
        options.subtitle = value;
        this.setState({options});
    };

    onThemeChange = (value) => {
        let options = Object.assign({}, this.state.options);
        options.theme = value;
        this.setState({options});
    };

    updateChart = () => {
        if(this.props.match.params.chartId != null){
                this.qId = this.state.qId;
                this.formId = this.state.formId;
        } else {
            this.qId = this.props.match.params.qId;
            this.formId = this.props.match.params.formId;
        }

        var data;
        var answers = {};
        var qData;
        var answersArray = [];
        var percentageArray = [];
        var total = 0;
        const formData = new FormData();
        const formData2 = new FormData();
        formData.append('appKey', sessionStorage.getItem('appKey'));
        formData.append('formId', this.formId);

        formData2.append('appKey', sessionStorage.getItem('appKey'));
        formData2.append('formId', this.formId);
        formData2.append('qId', this.qId);

        axios.post(`http://gokalpfirat.com/callbacks/getFormSubmissions.php`, formData)
            .then((response) => {
                data = response.data;
            }).then(() => {
            for (var i = 0; i < data.length; i++) {
                var tmp = data[i].answers[this.qId];
                answers[tmp.answer] = answers[tmp.answer] == null ? 1 : answers[tmp.answer] + 1;
                total++;
            }

            if (answers['undefined'] != null) {
                Object.defineProperty(answers, 'Empty',
                    Object.getOwnPropertyDescriptor(answers, 'undefined'));
                delete answers['undefined'];
            } else if (answers[''] != null) {
                Object.defineProperty(answers, 'Empty',
                    Object.getOwnPropertyDescriptor(answers, ''));
                delete answers[''];
            }

            Object.keys(answers).map((item) => {
                answersArray.push({y: answers[item], label: item, name: item});
                percentageArray.push({y: this.percentage(answers[item], total), label: item, name: item});
                this.setState({answers: answersArray, percentageAnswers: percentageArray});
            });
        }).then(() => {
            axios.post(`http://gokalpfirat.com/callbacks/getQuestion.php`, formData2)
                .then((response) => {
                    qData = response.data;
                }).then(() => {
                this.setState({qData: qData});
            })
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        if(this.props.match.params.chartId != null) {
            this.handleSave(this.props.match.params.chartId);
        }
    }

    updateData = (qId,formId) => {
        var data;
        var answers = {};
        var qData;
        var answersArray = [];
        var percentageArray = [];
        var total = 0;
        const formData = new FormData();
        const formData2 = new FormData();
        formData.append('appKey', sessionStorage.getItem('appKey'));
        formData.append('formId', formId);

        formData2.append('appKey', sessionStorage.getItem('appKey'));
        formData2.append('formId', formId);
        formData2.append('qId', qId);

        axios.post(`http://gokalpfirat.com/callbacks/getFormSubmissions.php`, formData)
            .then((response) => {
                data = response.data;
            }).then(() => {
            for(var i = 0;i<data.length;i++){
                var tmp = data[i].answers[qId];
                answers[tmp.answer] = answers[tmp.answer] == null ? 1 : answers[tmp.answer]+1;
                total++;
            }

            if(answers['undefined'] != null) {
                Object.defineProperty(answers, 'Empty',
                    Object.getOwnPropertyDescriptor(answers, 'undefined'));
                delete answers['undefined'];
            } else if (answers[''] != null){
                Object.defineProperty(answers, 'Empty',
                    Object.getOwnPropertyDescriptor(answers, ''));
                delete answers[''];
            }

            Object.keys(answers).map((item) => {
                answersArray.push({y: answers[item], label: item, name: item});
                percentageArray.push({y: this.percentage(answers[item],total), label: item, name: item})
                this.setState({answers: answersArray, percentageAnswers: percentageArray});
            });
        }).then(() => {
            axios.post(`http://gokalpfirat.com/callbacks/getQuestion.php`, formData2)
                .then((response) => {
                    qData = response.data;
                }).then(() => {
                this.setState({qData: qData});
                let options = Object.assign({}, this.state.options);
                if (options.title == '') {
                    options.title = qData.text;
                }
                this.setState({options});
            })
        }).then(() => {
            axios.post(`http://gokalpfirat.com/callbacks/getFormId.php`, formData)
                .then((response) => {
                    qData = response.data;
                }).then(() => {
                this.setState({formData: qData});
                this.setState({loading : false});
                this.interval = setInterval(this.updateChart, 500);
            });
        });
    };

    componentDidMount() {
        if(this.props.match.params.chartId != null){
            this.setState({chartKey: this.props.match.params.chartId});
            const myRef = firebase.database().ref('charts/'+this.props.match.params.chartId);
            myRef.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState(items);
                this.qId = items.qId;
                this.formId = items.formId;
                this.updateData(this.qId,this.formId);
            });
        } else {
            this.qId = this.props.match.params.qId;
            this.formId = this.props.match.params.formId;
            this.updateData(this.qId,this.formId);
        }
        setTimeout(() =>
                this.setState({loading: false})
            , 1500)

    };





    render() {
        const { loading } = this.state;
        return (
            <LoadingScreen
                loading={loading}
                bgColor='#333333'
                spinnerColor='#fa8900'
                textColor='#ffffff'
                logoSrc={lightLogo}
                text='Loading Builder'
            >
            <div className='container-fluid'>
                <Topbar handleTopClick={this.handleTopClick} handleShare={this.handleShare} handleSave={this.handleSave} chartKey={this.state.chartKey}/>
                <div className='row'>
                    <Sidebar handleClick={this.handleClick} type={this.state.type}/>
                    <Content options={this.state.options} clicked={this.state.clicked} onChangeClick={this.changeClick} formId={this.formId} qId={this.qId} showChart={this.state.type} answers={this.state.answers} percentageAnswers={this.state.percentageAnswers} qData={this.state.qData}
                             onNameChange={this.onNameChange} onAngleChange={this.onAngleChange} onShowDescChange={this.onShowDescChange} onSizeChange={this.onSizeChange} onSubtitleChange={this.onSubtitleChange} onThemeChange={this.onThemeChange}/>
                </div>
            </div>
            </LoadingScreen>
        );
    }
}

export default Builder;