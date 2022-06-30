/**
 * 路由及路由插件机制支持
 */

import { NumberOptionType } from "aip-module/types";
import React, { PureComponent } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

export interface IAppRoutersProp {
    path: string;
    component: any;
}

export interface IAppRoutersProps {
    routers: IAppRoutersProp[];
}

export default class AppRouters extends PureComponent<IAppRoutersProps, any> {

    render() {
        return (<Router>
            <Switch>
                {
                    this.props.routers.map((router: IAppRoutersProp, index: NumberOptionType) => {
                        return <Route key={`router-item-${index}`} path={router.path} component={router.component}></Route>
                    })
                }
            </Switch>
        </Router>
        );
    }
}