import React, { Component } from 'react';

class FormListItem extends Component {
    render() {
        if (parseInt(this.props.data.count) === 0) {
            return (
                <tr data-tip="You can't create charts of empty forms" className='disabled'>
                    <td>{this.props.data.id}</td>
                    <td style={{fontWeight: 'bold'}}>{this.props.data.title}</td>
                    <td>{this.props.data.created_at}</td>
                    <td>{this.props.data.count}</td>
                </tr>
            );
        } else {
            return (
                <tr onClick={() => {this.props.handleClick(this.props.data.id)}}>
                    <td>{this.props.data.id}</td>
                    <td style={{fontWeight: 'bold'}}>{this.props.data.title}</td>
                    <td>{this.props.data.created_at}</td>
                    <td>{this.props.data.count}</td>
                </tr>
            );
        }
        }
}

export default FormListItem;
