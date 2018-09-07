import React, {Component, Fragment} from 'react';
import './FormList.css';
import FormListItem from './FormListItem';
import axios from "axios/index";
import ReactTooltip from 'react-tooltip'
import TopNavigation from "../Navigation/TopNavigation";

class FormList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    handleClick = (formId) => {
        this.props.history.push(`/forms/${formId}`);
    };

    handleHomepage = () => {
        this.props.history.push('/');
    };


    componentDidMount() {
        if (sessionStorage.getItem('appKey') == null){
            this.props.history.push('/');
        }
        const formData = new FormData();
        formData.append('appKey', sessionStorage.getItem('appKey'));
        axios.post(`http://gokalpfirat.com/callbacks/getForms.php`, formData)
            .then((response) => {
                this.setState({data: response.data});
            })


    };


    render() {
        if (this.state.data !== null) {
            return (
                <Fragment>
                    <TopNavigation handleHomepage={this.handleHomepage}/>
                <div className="shadow-lg p-3 mb-5 bg-white w-100">
                    <div className='border border-dark rounded mb-3'>
                        <p className='text-center font-weight-bold my-2'>Please select the form you want to create
                            chart</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Submission Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.state.data).map((item, i) => (
                            <FormListItem key={this.state.data[item].id} data={this.state.data[item]} handleClick={this.handleClick}/>
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
                        <p className='text-center font-weight-bold my-2'>Loading your forms!</p>
                    </div>
                </div>
                </Fragment>
            );
        }
    }
}

export default FormList;