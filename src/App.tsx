/****************************************************
 * Audit Information Platform FrontEnd Project
 * 展示部分
 * 2022-06
 * Sunny
 ****************************************************/

//----- Global ------
import * as React from 'react';
import DefaultPage from './DefaultPage';
import DesignerPage from './DesignerPage';
import Help from './Help';
import AppRouters, { IAppRoutersProp } from './routers';

const routers: IAppRoutersProp[] = [
    {
        path: '/designer',
        component: DesignerPage,
    },
    {
        path: '/help',
        component: Help,
    },
    {
        path: '/',
        component: DefaultPage,
    }
];

class App extends React.PureComponent<any, any> {
    render() {
        return (
            <AppRouters routers={routers} />
        );
    }
}

export default App;