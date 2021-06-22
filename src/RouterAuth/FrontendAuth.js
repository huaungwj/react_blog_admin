import React from 'react'
import {Route,Redirect} from 'react-router-dom'
/*路由配置文件*/
import RouterConfig from "../Router";
import {message} from "antd";
// import UpdateArticle from "../Pages/UpdateArticle";
import AdminIndex from "../Pages/AdminIndex";

class FrontendAuth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const pathname = this.props.location.pathname
        const targetRouter = RouterConfig.find(item => { // 取出当前的路由地址
            return item.path === pathname
        })
        const isLogin = JSON.parse(sessionStorage.getItem('openId'))

        if (pathname === '/') {
            return <Redirect to='login'></Redirect>
        }


        if (isLogin){
            if (pathname==='/login'){
                return <Redirect to="/index/addArticle"></Redirect>;
            }else {
                return (
                    <Route path={pathname} component={ AdminIndex} />
                );
            }
        }else{
            if (targetRouter.auth){
                message.error('请先登陆')
                return <Redirect to="/login" />;
            }else {
                return (
                    <Route path={pathname} component={targetRouter.component} />
                );
            }
        }
    }
}

export default FrontendAuth