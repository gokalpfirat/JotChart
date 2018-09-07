import React, { Component } from 'react';

class QuestionListItem extends Component {
    constructor(props) {
        super(props);
        this.types = {
            'control_head' : {name : 'Header', availability: false},
            'control_fullname' : {name : 'Full Name', availability: false},
            'control_email': {name : 'Email', availability: false},
            'control_address': {name : 'Address', availability: false},
            'control_phone': {name : 'Phone', availability: false},
            'control_datetime': {name : 'Date Picker', availability: false},
            'control_time': {name : 'Time', availability: false},
            'control_textbox': {name : 'Short Text Entry', availability: false},
            'control_textarea': {name : 'Long Text Entry', availability: false},
            'control_text': {name : 'Text', availability: false},
            'control_dropdown': {name : 'Dropdown', availability: true},
            'control_yesno': {name : 'Yes/No Question', availability: true},
            'control_radio': {name : 'Single Choice', availability: true},
            'control_checkbox': {name : 'Multiple Choice', availability: true},
            'control_imagechoice': {name : 'Image Choice', availability: false},
            'control_mixed': {name : 'Multi-line Question', availability: false},
            'control_number': {name : 'Number', availability: false},
            'control_image': {name : 'Image', availability: false},
            'control_fileupload': {name : 'File Upload', availability: false},
            'control_captcha': {name : 'Captcha', availability: false},
            'control_matrix': {name : 'Input Table / Emoji Slider', availability: true},
            'control_rating': {name : 'Star Rating	', availability: true},
        };
    }

    render() {
        if (this.types[this.props.data.type]) {
            if (this.types[this.props.data.type].availability) {
                return (
                    <tr onClick={() => {this.props.handleClick(this.props.data.qid)}}>
                        <td>{this.props.data.qid}</td>
                        <td style={{fontWeight: 'bold'}}>{this.props.data.text}</td>
                        <td>{this.types[this.props.data.type].name}</td>
                        <td><i className="fas fa-check-circle" style={{color: 'green'}}></i></td>
                    </tr>
                );
            } else {
                return (
                    <tr data-tip="You can't create chart of this form question">
                        <td>{this.props.data.qid}</td>
                        <td style={{fontWeight: 'bold'}}>{this.props.data.text}</td>
                        <td>{this.types[this.props.data.type].name}</td>
                        <td><i className="fas fa-times-circle" style={{color: 'red'}}></i></td>
                    </tr>
                );
            }
        } else {
            return (
                <tr data-tip="You can't create chart of this form question">
                    <td>{this.props.data.qid}</td>
                    <td style={{fontWeight: 'bold'}}>{this.props.data.text}</td>
                    <td>{this.props.data.type}</td>
                    <td><i className="fas fa-times-circle" style={{color: 'red'}}></i></td>
                </tr>
            );
        }
    }
}

export default QuestionListItem;