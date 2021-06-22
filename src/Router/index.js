import Login from "../Pages/Login";
import AdminIndex from "../Pages/AdminIndex";
import TimeOut from "../Pages/404";
import {withRouter} from 'react-router-dom'

const RouterProps = (props) => {
    var props = props
}
withRouter(RouterProps)

const RouterConfig = [
    {
        path: '/login',
        component: Login,
        auth: false,
    },
    {
        path: '/index',
        component: AdminIndex,
        auth: true
    },
    {
        path: '/index/addArticle',
        component: AdminIndex,
        auth: true
    },
    {
        path: '/index/test',
        component: AdminIndex,
        auth: true
    },
    {
        path: '/index/articleList',
        component: AdminIndex,
        auth: true
    },
    {
        path: '/index/articleList/:id',
        component: AdminIndex,
        auth: true
    },

    {
        path: '/404',
        component: TimeOut,
        auth: false
    },

    {
        path: '/index/404',
        component: TimeOut,
        auth: false
    },

]

export default RouterConfig