import React, { Component } from 'react';
import darkLogo from '../../assets/logo-dark.png';

class TopNavigation extends Component {

    handleLogout = () => {
            sessionStorage.clear();
            this.props.handleHomepage();
    };

    render() {
        return (
            <div className='container p-2 col-12 bg-white'>
                <h2 onClick={this.props.handleHomepage} className='textShadow pointer'><span style={{color: '#fa8900'}}>Jot</span><span style={{color: '#434343'}}>Charts</span></h2>
                <img onClick={this.props.handleHomepage} src={darkLogo} alt="" className='img-fluid ml-2 mr-3 rotating pointer'/>
                <button onClick={this.handleLogout} className='ml-5 btn btn-danger pl-3 pr-3'>Logout</button>
            </div>
        );
    }
}

export default TopNavigation;
