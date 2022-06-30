/****************************************************
 * Audit Information Platform FrontEnd Project
 * 展示部分
 * 2022-06
 * Sunny
 ****************************************************/

//----- Global ------
import * as React from 'react';
import { PureComponent } from 'react';

import { Button } from 'tinper-bee';

import 'tinper-bee/assets/tinper-bee.css';

import './style/App.css';
import { ReactBpmnViewer } from 'aip-bpmn';
import Service from './api/service';

/**
 * 页面模板
 *
 * @class DefaultPage
 *
 * @extends { PureComponent }
 *
 * @description A8前端页面模板
 */
class DefaultPage extends PureComponent<any, any> {
    state = {
        key: 'bpmnviewer',
        xml: '',
    }

    _props: any = {};

    importRemoteXML: boolean = true;

    viewerRef: ReactBpmnViewer | null = null;

    onClick = () => {
        if (this.importRemoteXML) {
            Service.fetchBPMN().then(res => {
                this._props.currentStep = 'sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26';
                this._props.diagramXML = res;
                this.setState({
                    key: this.state.key + `${Math.random()}`,
                }, () => { });
            });
            this.importRemoteXML = false;
        } else {
            Service.fetchBPMN2().then(res => {
                delete (this._props.url);
                this._props.currentStep = '_6-463';
                this._props.diagramXML = res;
                this.setState({
                    key: this.state.key + `${Math.random()}`,
                }, () => { });
            });
            this.importRemoteXML = true;
        }
    }

    onDownloadClick = () => {
        if (this.viewerRef) {
            this.viewerRef.saveSVG();
        }
    }

    toDesigner = () => {
        window.location.href = '/bpmn#/designer';
    }

    textChange = (e: any) => {
        let value = e.target.value;
        delete (this._props.currentStep);
        this._props.diagramXML = value;
        this.setState({
            xml: value,
            key: this.state.key + `${Math.random()}`,
        }, () => { });
    }

    componentDidMount() {
        let stopLoading = (window as any).stopLoading;
        stopLoading && stopLoading();
        this.onClick();
    }

    render() {
        return (
            <div className='main-div'>
                <ReactBpmnViewer
                    key={this.state.key}
                    showLicense={false}
                    {...this._props}
                    ref={(el: any) => this.viewerRef = el}
                ></ReactBpmnViewer>
                <Button onClick={this.onClick}>切换BPMN定义</Button>&nbsp;&nbsp;<Button onClick={this.onDownloadClick}>下载流程图</Button>&nbsp;&nbsp;<Button onClick={this.toDesigner}>进入设计器</Button>

                {/* textarea */}
                <textarea title='导入bpmn定义' className='bpmn-text' onChange={this.textChange} value={this._props.xml}></textarea>
            </div>
        );
    }
}

export default DefaultPage;
