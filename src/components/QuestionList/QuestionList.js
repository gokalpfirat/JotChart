import React, {Component, Fragment} from 'react';
import axios from "axios/index";
import QuestionListItem from "./QuestionListItem";
import ReactTooltip from 'react-tooltip'
import TopNavigation from "../Navigation/TopNavigation";

class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    handleHomepage = () => {
        this.props.history.push('/');
    };

    componentDidMount() {
        if (sessionStorage.getItem('appKey') == null){
            this.props.history.push('/');
        }
        const formData = new FormData();
        formData.append('appKey', sessionStorage.getItem('appKey'));
        formData.append('formId', this.props.match.params.formId);
        axios.post(`http://gokalpfirat.com/callbacks/getQuestions.php`, formData)
            .then((response) => {
                this.setState({data: response.data});
            })


    };

    handleClick = (qId) => {
        this.props.history.push(`/forms/${this.props.match.params.formId}/${qId}`);
    };


    render() {
        if (this.state.data !== null) {
            return (
                <Fragment>
                    <TopNavigation handleHomepage={this.handleHomepage}/>
                <div className="shadow-lg p-3 mb-5 bg-white rounded w-100">
                    <div className='border border-dark rounded mb-3'>
                        <p className='text-center font-weight-bold my-2'>Please select the question you want to create
                            chart</p>
                    </div>
                    <table className="table table-hover text-center">
                        <thead>
                        <tr>
                            <th scope="col">Question Id</th>
                            <th scope="col">Text</th>
                            <th scope="col">Type</th>
                            <th scope="col">Availability</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.data).map((item, i) => (
                            <QuestionListItem key={this.state.data[item].id} data={this.state.data[item]} handleClick={this.handleClick}/>
                        ))}
                        </tbody>
                    </table>
                    <ReactTooltip type="error"/>
                </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <TopNavigation handleHomepage={this.handleHomepage}/>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded w-100">
                        <div className='border border-dark rounded text-center'>
                            <p className='text-center font-weight-bold my-2'>Loading your questions!</p>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default QuestionList;