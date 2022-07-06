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
import { ReactBpmnDesigner, IFormDefinition, IFormFieldSettingsResult } from 'aip-bpmn';
import Service from './api/service';

import 'tinper-bee/assets/tinper-bee.css';
import './style/App.css';

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

  renderHelpNode = (): React.ReactNode => {
    return (
      <div style={{ paddingLeft: 5, }}>
        <h5>流程设计器</h5>
        <p style={{ color: '#5a5858', }}>
          流程设计器是A8流程引擎的一个功能，可以用来设计流程，并且可以保存到后端数据库中。<br />
          <br />
          不同类型节点的属性设置不尽相同，请参考<a href='https://www.a8.com/cn/help/help_detail.html?help_id=5' target='_blank'>帮助文档</a>。
          <br />
          每个节点都有“任务处理Java类(全路径)”属性，设置后端处理的Java类，以便对表单数据进行处理（该设置尽量在研发人员协助下完成设置）。
        </p>
      </div>
    );
  }

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
          helpNode={this.renderHelpNode()}
          ref={(rel: any) => this.modelerRef = rel}
        ></ReactBpmnDesigner>
        <Button colors='primary' onClick={this.onClick}>保存流程</Button>
      </div>
    );
  }
}

export default DesignerPage;
