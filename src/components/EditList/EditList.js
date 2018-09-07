import React, {Component, Fragment} from 'react';
import firebase from "../../firebase";
import TopNavigation from "../Navigation/TopNavigation";
import EditListItem from "./EditListItem";

class EditList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            charts: null,
        };
    }

    handleClick = (chartId) => {
        this.props.history.push(`charts/edit/${chartId}`);
    };

    handleHomepage = () => {
        this.props.history.push('/');
    };


    componentDidMount() {
        if (sessionStorage.getItem('appKey') == null) {
            this.props.history.push('/');
        }
        const myRef = firebase.database().ref('charts/');
        myRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let charts = [];
            for (let item in items) {
                if(items[item].username === sessionStorage.getItem('username')){
                    charts.push({id: item, title: items[item].formData.title, text: items[item].options.title});
                }
            }
            this.setState({charts});
        });
    };


    render() {
        if (this.state.charts !== null) {
            return (
                <Fragment>
                    <TopNavigation handleHomepage={this.handleHomepage}/>
                    <div className="shadow-lg p-3 mb-5 bg-white w-100">
                        <div className='border border-dark rounded mb-3'>
                            <p className='text-center font-weight-bold my-2'>Please select the chart you want to edit</p>
                        </div>
                        <table className="table table-hover text-center">
                            <thead>
                            <tr>
                                <th scope="col">Chart Id</th>
                                <th scope="col">Chart Title</th>
                                <th scope="col">Form Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(this.state.charts).map((item, i) => (
                                <EditListItem key={this.state.charts[item].id} data={this.state.charts[i]} handleClick={() => {this.handleClick(this.state.charts[item].id)}}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <TopNavigation handleHomepage={this.handleHomepage}/>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded w-100">
                        <div className='border border-dark rounded text-center'>
                            <p className='text-center font-weight-bold my-2'>Loading your charts!</p>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}

export default EditList;