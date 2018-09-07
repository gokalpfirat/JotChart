import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import Alert from 'react-s-alert';
import darkLogo from '../../assets/logo-dark.png';

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            appKey : null
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        global.JF.login(
            () => {
                let apiKey = global.JF.getAPIKey();
                sessionStorage.setItem('appKey', apiKey);
                global.JF.getUser(function(response){
                    sessionStorage.setItem('username', response.username);
                                Alert.success('Login Successful', {
                                    position: 'bottom-right',
                                    effect: 'slide',
                                    timeout: 2500
                                });
                });
                setTimeout(this.props.handleLogin,1500);
            },
            () => {
                            Alert.error('Invalid username / password', {
                                position: 'bottom-right',
                                effect: 'slide',
                                timeout: 2500
                            });
            }
        );
        // const formData = new FormData();
        // formData.append('username', this.usernameInp.value);
        // formData.append('password', this.passwordInp.value);
        // axios.post(`http://gokalpfirat.com/callbacks/postLogin.php`, formData)
        // .then((response) => this.setState({appKey : response.data.appKey ? response.data.appKey : 'Invalid' }))
        //     .then(() => {
        //         if (this.state.appKey === 'Invalid'){
        //             Alert.error('Invalid username / password', {
        //                 position: 'bottom-right',
        //                 effect: 'slide',
        //                 timeout: 2500
        //             });
        //         } else {
        //             Alert.success('Login Successful', {
        //                 position: 'bottom-right',
        //                 effect: 'slide',
        //                 timeout: 2500
        //             });
        //             sessionStorage.setItem('appKey', this.state.appKey);
        //             sessionStorage.setItem('username', this.usernameInp.value);
        //             setTimeout(this.props.handleLogin,1500);
        //         }
        //     });
    };

    render() {
        return (
            <div className='w-50 p-3'>
            <div className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                <h2 className='textShadow mb-2'><span style={{color: '#fa8900'}}>Jot</span><span style={{color: '#434343'}}>Charts</span></h2>
                <img src={darkLogo} alt="" className='img-fluid w-25 mb-3 rotating'/>
                <button type="submit" className="btn btn-block orangeButton border border-dark" onClick={this.handleSubmit}>Login With JotForm</button>
            </div>
            </div>
        );
    }
}

export default LoginForm;