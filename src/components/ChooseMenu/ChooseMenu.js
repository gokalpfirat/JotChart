import React, {Component, Fragment} from 'react';
import pieChart from '../../assets/pie-chart.png';
import chartPage from '../../assets/presentation.png';
import './ChooseMenu.css';
import TopNavigation from "../Navigation/TopNavigation";

class ChooseMenu extends Component {

    handleClickForms = () => {
        this.props.history.push(`/forms`);
    };

    handleClickEdit = () => {
        this.props.history.push(`/charts`);
    };

    handleHomepage = () => {
        this.props.history.push('/');
    };


    render() {
        return (
            <div className='mb-5'>
            <TopNavigation handleHomepage={this.handleHomepage}/>
            <div className='container mt-5'>
            <div className='shadow-lg bg-white rounded w-75 mt-5'>
                <div className='row m-0'>
                    <div className='col border-right rounded text-center pt-5 pb-5 item' onClick={this.handleClickForms}>
                        <img src={pieChart} alt="" className='img-fluid w-50 mb-5'/>
                        <h4>Create A New Chart</h4>
                    </div>
                    <div className='col text-center rounded pt-5 pb-5 item' onClick={this.handleClickEdit}>
                        <img src={chartPage} alt="" className='img-fluid w-50 mb-5'/>
                        <h4>Edit An Existing Chart</h4>
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default ChooseMenu;