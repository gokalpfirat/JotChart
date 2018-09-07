import React, {Component} from 'react';

class Properties extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     options: this.props.clicked,
        // };
    }

    onShowDescChange = (bool) => () => {
        this.props.onShowDescChange(bool);
    }


    render() {
        if(this.props.showValues === 'empty'){
            return (
                <div></div>
            );
        }else if((this.props.showValues === 'pie' || this.props.showValues === 'doughnut') && this.props.clicked) {
            return (
                <div className='col-3 full-height p-0 appWizard'>
                    <p className='text-center p-3 borderWizard mb-0'>Chart Settings</p>
                    <div className='appWizard p-0 borderBottom text-center'>
                        <div className='buttons selected p-2'>Options</div>
                        <div className='buttons p-2' onClick={this.props.onChangeClick}>Theme</div>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4'>
                        <p>Title</p>
                        <input type="text" className="form-control" placeholder="" value={this.props.options.title}
                               onChange={e => this.props.onNameChange(e.target.value)}/>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                        <p>Subtitle</p>
                        <input type="text" className="form-control" placeholder=""
                               value={this.props.options.subtitle}
                               onChange={e => this.props.onSubtitleChange(e.target.value)}/>
                    </div>
                    <div className={"appWizard p-2 pl-3 pr-3 pb-4 borderWizard " + (this.props.showValues === 'doughnut' ? 'd-none':'') }>
                        <p>Start Angle</p>
                        <input type="text" className="form-control" placeholder="" value={this.props.options.startAngle}
                               onChange={e => this.props.onAngleChange(e.target.value)}/>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                        <p>Show Value Names At Bottom</p>
                        <div className="btn-group btn-group-toggle text-center" data-toggle="buttons">
                            <label className={"btn btn-secondary " + (this.props.options.showInLegend ? 'active' : '')} onClick={this.onShowDescChange('true')}>
                                <input type="radio" name="options" id="option1" autoComplete="off"/> Yes
                            </label>
                            <label className={"btn btn-secondary " + (!this.props.options.showInLegend ? 'active' : '')} onClick={() => this.props.onShowDescChange('false')}>
                                <input type="radio" name="options" id="option2" autoComplete="off"/> No
                            </label>
                        </div>
                    </div>
                </div>
            );
        }else if ((this.props.showValues === 'pie' || this.props.showValues === 'doughnut') && !this.props.clicked){
            return (
                <div className='col-3 full-height p-0 appWizard'>
                    <p className='text-center p-3 borderWizard mb-0'>Chart Settings</p>
                    <div className='appWizard p-0 borderBottom text-center'>
                        <div className='buttons p-2' onClick={this.props.onChangeClick}>Options</div>
                        <div className='buttons selected p-2'>Theme</div>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                    <p>Text Size</p>
                    <input type="text" className="form-control" placeholder=""
                    value={this.props.options.indexLabelFontSize}
                    onChange={e => this.props.onSizeChange(e.target.value)}/>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                    <p>Theme</p>
                        <div className="btn-group btn-group-toggle text-center" data-toggle="buttons">
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'light1' ? 'active' : '')} onClick={() => this.props.onThemeChange('light1')}>
                                <input type="radio" name="options" id="option1" autoComplete="off"/> Light 1
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'light2' ? 'active' : '')} onClick={() => this.props.onThemeChange('light2')}>
                                <input type="radio" name="options" id="option2" autoComplete="off"/> Light 2
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'dark1' ? 'active' : '')} onClick={() => this.props.onThemeChange('dark1')}>
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Dark 1
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'dark2' ? 'active' : '')} onClick={() => this.props.onThemeChange('dark2')}>
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Dark 2
                            </label>
                        </div>
                    </div>
                </div>
            );
        } else if(this.props.showValues !== 'pie' && this.props.clicked) {
            return (
                <div className='col-3 full-height p-0 appWizard'>
                    <p className='text-center p-3 borderWizard mb-0'>Chart Settings</p>
                    <div className='appWizard p-0 borderBottom text-center'>
                        <div className='buttons selected p-2'>Options</div>
                        <div className='buttons p-2' onClick={this.props.onChangeClick}>Theme</div>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4'>
                        <p>Title</p>
                        <input type="text" className="form-control" placeholder="" value={this.props.options.title}
                               onChange={e => this.props.onNameChange(e.target.value)}/>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                        <p>Subtitle</p>
                        <input type="text" className="form-control" placeholder=""
                               value={this.props.options.subtitle}
                               onChange={e => this.props.onSubtitleChange(e.target.value)}/>
                    </div>
                </div>
            );
        }else if (this.props.showValues !== 'pie' && !this.props.clicked){
            return (
                <div className='col-3 full-height p-0 appWizard'>
                    <p className='text-center p-3 borderWizard mb-0'>Chart Settings</p>
                    <div className='appWizard p-0 borderBottom text-center'>
                        <div className='buttons p-2' onClick={this.props.onChangeClick}>Options</div>
                        <div className='buttons selected p-2'>Theme</div>
                    </div>
                    <div className='appWizard p-2 pl-3 pr-3 pb-4 borderWizard'>
                        <p>Theme</p>
                        <div className="btn-group btn-group-toggle text-center" data-toggle="buttons">
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'light1' ? 'active' : '')} onClick={() => this.props.onThemeChange('light1')}>
                                <input type="radio" name="options" id="option1" autoComplete="off"/> Light 1
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'light2' ? 'active' : '')} onClick={() => this.props.onThemeChange('light2')}>
                                <input type="radio" name="options" id="option2" autoComplete="off"/> Light 2
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'dark1' ? 'active' : '')} onClick={() => this.props.onThemeChange('dark1')}>
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Dark 1
                            </label>
                            <label className={"btn btn-secondary " + (this.props.options.theme === 'dark2' ? 'active' : '')} onClick={() => this.props.onThemeChange('dark2')}>
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Dark 2
                            </label>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Properties;