import React, { PureComponent } from 'react';

import './style/App.css';

class Help extends PureComponent<any, any> {

    componentDidMount() {
        let stopLoading = (window as any).stopLoading;
        stopLoading && stopLoading();
    }

    render() {
        return (
            <div className='main-div'>
                <h1>Help</h1>
            </div>
        );
    }
}

export default Help;