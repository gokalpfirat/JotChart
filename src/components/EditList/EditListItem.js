import React, { Component } from 'react';

class EditListItem extends Component {
    render() {
            return (
                <tr onClick={this.props.handleClick}>
                    <td>{this.props.data.id}</td>
                    <td style={{fontWeight: 'bold'}}>{this.props.data.text}</td>
                    <td>{this.props.data.title}</td>
                </tr>
            );
        }
}

export default EditListItem;
