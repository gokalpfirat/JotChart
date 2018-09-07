import React, { Component } from 'react';
import './App.css';
import LoginForm from './Login/LoginForm'
import LoadingScreen from 'react-loading-screen';
import lightLogo from '../assets/logo-light.png';
import Alert from 'react-s-alert';
import firebase from '../firebase';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
        };
  }

    componentDidMount () {
        // const itemsRef = firebase.database().ref('charts/gokalpfirat');
        // const item = {
        //     title: 'test',
        //     user: 'test2'
        // };
        // itemsRef.push(item);
        // itemsRef.on('value', (snapshot) => {
        //     let items = snapshot.val();
        //     for (let item in items){
        //         console.log(items[item].title);
        //     }
        //
        // });

        // fake promise
        if (sessionStorage.getItem('appKey') != null){
            this.handleLogin();
        }else {
            setTimeout(() =>
                this.setState({loading: false})
            , 1500)
        }
    }

    handleLogin = () => {
        this.props.history.push('/home');
    }

  render() {
      const { loading } = this.state;
    return (
        <LoadingScreen
            loading={loading}
            bgColor='#333333'
            spinnerColor='#fa8900'
            textColor='#ffffff'
            // logoSrc={darkLogo}
            logoSrc={lightLogo}
            text='JotCharts'
        >
            <Alert stack={{limit: 1}} />
          <div className="container centerDiv">
            <LoginForm handleLogin={this.handleLogin} />
          </div>
        </LoadingScreen>
    );
  }
}

export default App;
