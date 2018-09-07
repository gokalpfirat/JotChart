import React, { Component } from 'react';
import darkLogo from '../../assets/logo-dark.png';
import {CopyToClipboard} from "react-copy-to-clipboard";

class Topbar extends Component {
    render() {
        if(this.props.chartKey === null) {
            return (
                <div className='row'>
                    <div className='container col-12 topbar bg-white shadow-lg'>
                        <h2 className='textShadow pointer' onClick={this.props.handleTopClick}><span
                            style={{color: '#fa8900'}}>Jot</span><span style={{color: '#434343'}}>Charts</span></h2>
                        <img src={darkLogo} alt="" className='img-fluid ml-2 mr-3 rotating pointer'
                             onClick={this.props.handleTopClick}/>
                        <button className='btn btn-dark ml-5' onClick={this.props.handleShare}>Share Chart Public
                        </button>
                        <input ref={(input) => {
                            this.passwordInput = input
                        }} type="text" className='ml-5 w-30 text-center' placeholder='Share link will appear at here'
                               readOnly
                               value={this.props.chartKey !== null ? 'http://gokalpfirat.com/app/charts/' + this.props.chartKey : ''}/>
                        <CopyToClipboard text={'http://gokalpfirat.com/app/charts/' + this.props.chartKey}>
                            <button disabled={this.props.chartKey === null}><i className="fa fa-clipboard"
                                                                               aria-hidden="true"></i></button>
                        </CopyToClipboard>
                    </div>
                </div>
            );
        } else {
            return (
            <div className='row'>
                <div className='container col-12 topbar bg-white shadow-lg'>
                    <h2 className='textShadow pointer' onClick={this.props.handleTopClick}><span
                        style={{color: '#fa8900'}}>Jot</span><span style={{color: '#434343'}}>Charts</span></h2>
                    <img src={darkLogo} alt="" className='img-fluid ml-2 mr-3 rotating pointer'
                         onClick={this.props.handleTopClick}/>
                    <button className='btn btn-success ml-3' onClick={() => {this.props.handleSave(this.props.chartKey)}}>Save</button>
                    <input ref={(input) => {
                        this.passwordInput = input
                    }} type="text" className='ml-3 w-30 text-center' placeholder='Share link will appear at here'
                           readOnly
                           value={this.props.chartKey !== null ? 'http://gokalpfirat.com/app/charts/' + this.props.chartKey : ''}/>
                    <CopyToClipboard text={'http://gokalpfirat.com/app/charts/' + this.props.chartKey}>
                        <button disabled={this.props.chartKey === null}><i className="fa fa-clipboard" aria-hidden="true"></i></button>
                    </CopyToClipboard>
                </div>
            </div>
            );
        }
    }
}

export default Topbar;