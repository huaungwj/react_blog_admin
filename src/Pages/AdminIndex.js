import React , {useState,useEffect} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoginOutlined, // 登出
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
//工作台内容模块
import AddArticle from "../components/AddArticle";
import Test from "../components/Test";
import ArticleList from "./ArticleList";
import {withRouter} from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex (props) {
    // console.log(props)
    const [pathnameId , setPathnameId] = useState(props.location.pathname.split('addArticle/')[1])

    useEffect(() => {
        // console.log(props)
        document.title = '博客后台 ｜ 首页'
        setPathnameId(props.location.pathname.split('addArticle/')[1])
        // console.log(pathnameId)

    },[props.location.pathname])

    const [collapsed , setCollapsed] = useState(false)
    const [url , setUrl ] = useState('/index/addArticle')

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed( collapsed );
    };

    const linkTable = (e) => {
        if (e.key ==='index' ){ // 首页
            // console.log(pathnameId)
            props.history.push('/index/addArticle')
        }else if(e.key === 'test') { // 测试
            props.history.push('/index/test')
        }else if (e.key === 'articleList') { // 文章列表
            // console.log(pathnameId)
            props.history.push('/index/articleList')
        }
    }

    /*登出*/
    const exitLogin = (e) => {
        sessionStorage.removeItem('openId')
        props.history.push('/login')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >
                    xiaohai
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="index" icon={<PieChartOutlined />} onClick={linkTable}>
                       工作台
                    </Menu.Item>
                    <Menu.Item key="addArticle" icon={<DesktopOutlined />} onClick={linkTable}>
                        修改文章
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={linkTable}>
                        <Menu.Item key="index1" onClick={linkTable}>
                            添加文章
                        </Menu.Item>
                        <Menu.Item key="articleList" onClick={linkTable}>文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="test" icon={<FileOutlined />} onClick={linkTable}>
                        留言管理
                    </Menu.Item>
                    <Menu.Item key="exit" icon={<LoginOutlined />} onClick={exitLogin}>
                        登出
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <AddArticle
                                style={{display: props.location.pathname== '/index/addArticle'?'block': 'none' &&  props.location.pathname== '/index' ?'block': 'none' && props.location.pathname== '/index/addArticle/' + pathnameId?'block': 'none'}}
                                id={pathnameId}
                        />
                        <ArticleList
                            style={{display: props.location.pathname== '/index/articleList' ? 'block' : 'none'}}
                        />
                        <Test style={{display: props.location.pathname== '/index/test'?'block': 'none'}}></Test>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}> xiaohai ©2020 Created by xiaohai</Footer>
            </Layout>
        </Layout>
    )
}

export default withRouter(AdminIndex)
