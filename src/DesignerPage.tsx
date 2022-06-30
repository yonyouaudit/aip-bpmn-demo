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
import { ReactBpmnDesigner}  from 'aip-bpmn';
import Service from './api/service';
import { IFormDefinition, IFormFieldSettingsResult } from 'aip-bpmn';

interface DesignerPageState {
  key?: string;
  bpmnXML?: string;
  formDef?: IFormDefinition;
  formSetting?: IFormFieldSettingsResult;
  taskProcessTypes?: string[];
}

/**
 * 页面模板
 *
 * @class DesignerPage
 *
 * @extends { PureComponent }
 *
 * @description A8前端页面模板
 */
class DesignerPage extends PureComponent<any, DesignerPageState> {
  state: DesignerPageState = {
    key: 'bpmnviewer',
    bpmnXML: '',
  }

  modelerRef: ReactBpmnDesigner | null = null;

  onClick = () => {
    if (this.modelerRef) {
      this.modelerRef.getBpmnXML().then((res: any) => {
        console.log(res);
        alert(res);
        let config = this.modelerRef?.getAisFormAttribute();
        console.log(config);
        alert(JSON.stringify(config));
      }).catch((err: any) => {
        alert(err);
      });
    }
  }

  componentDidMount() {
    let stopLoading = (window as any).stopLoading;
    stopLoading && stopLoading();
    Service.fetchBPMN3().then(res => {
      let bpmn = res as string;
      Service.fetchFormDef().then(_res => {
        let form = _res as IFormDefinition;
        Service.fetchFormSetting().then(__res => {
          let settings = __res as IFormFieldSettingsResult;
          Service.fetchProcessTypes().then(___res => {
            let types = ___res as string[];
            this.setState({
              bpmnXML: bpmn,
              formDef: form,
              formSetting: settings,
              taskProcessTypes: types,
            }, () => { });
          });
        });
      });
    });
  }

  render() {
    return (
      <div className='main-div'>
        <ReactBpmnDesigner
          key={this.state.key}
          bpmnXML={this.state.bpmnXML}
          taskProcessTypes={this.state.taskProcessTypes}
          formDefinition={this.state.formDef}
          formFieldSettings={this.state.formSetting}
          ref={(rel: any) => this.modelerRef = rel}
        ></ReactBpmnDesigner>
        <Button colors='primary' onClick={this.onClick}>保存流程</Button>
      </div>
    );
  }
}

export default DesignerPage;
