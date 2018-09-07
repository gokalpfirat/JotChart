import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className='col-2 full-height sidebar p-0'>
                <p className='header text-center p-3 mb-0'>Chart Types</p>
                <ul className='list-group'>
                    <li className={"list-item p-2 text-center "+ (this.props.type === 'pie' ? ' selected' : '')} onClick={() => this.props.handleClick('pie')}>Pie Chart</li>
                    <li className={"list-item p-2 text-center "+ (this.props.type === 'doughnut' ? ' selected' : '')} onClick={() => this.props.handleClick('doughnut')}>Doughnut Chart</li>
                    <li className={"list-item p-2 text-center "+ (this.props.type === 'column' ? ' selected' : '')} onClick={() => this.props.handleClick('column')}>Column Chart</li>
                    <li className={"list-item p-2 text-center "+ (this.props.type === 'bar' ? ' selected' : '')} onClick={() => this.props.handleClick('bar')}>Bar Chart</li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;