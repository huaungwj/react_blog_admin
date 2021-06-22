import React , {useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
// 引入样式文件
import articleListStyle from '../static/css/AddArticle.module.css'
import servicePath from "../config/apiUrl";
import {withRouter} from 'react-router-dom'

import {
    List,
    Row,
    Col,
    message,
    Modal,
    Button,
} from 'antd'
const {confirm} = Modal

function ArticleList (props) {
    // console.log(props)
    /*数据*/
    const [ list , setList] = useState([])

    useEffect(() => {
        getArticleList()
    },[])
    /* 获取文章列表 */
    const getArticleList = async () => {
        const res = await axios({
            method: 'get',
            url: servicePath.getArticleList
        }).then(
            (res) => {
                // console.log(res)
                setList(res.data.data)
                // console.log(list)
            }
        )
    }
    // 删除文章的一条数据
    const delArticle = async (id) => {
        confirm({
            title: '确认要删除这篇博客文章吗？',
            content: '删除了会无法找回，请谨慎删除！！！',
            onOk() { // 点击删除触发
                axios({
                    method: 'get',
                    url: servicePath.deleteArticle + id,
                    withCredentials: true
                }).then(
                    (res) => {
                        message.success('文章删除成功')
                        console.log(id)
                        const newList = JSON.parse(JSON.stringify(list))
                        const result = newList.filter((item,index) => {
                            return item.id!=id
                        })
                        setList(result)
                        console.log(id,newList,list)
                    }
                )
            },
            onCancel() { // 点击取消
                message.success('文章没有任何改变')
            },
        })
    }

    /*修改文章的跳转方法*/
    const updateArticle = (id,checked) => {
        // console.log(id)
        props.history.push('/index/addArticle/' + id)
    }

    return (
        <div style={props.style}>
            <List
                header={
                    <Row className={articleListStyle.listDiv}>
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item,index) => {
                   return (
                       <List.Item>
                           <Row key={index} className={articleListStyle.listDiv} style={{width: '100%'}}>
                               <Col span={8}>
                                   {item.title}
                               </Col>
                               <Col span={4}>
                                   {item.typeName}
                               </Col>
                               <Col span={4}>
                                   {moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')}
                               </Col>
                               <Col span={4}>
                                   {item.view_count}
                               </Col>
                               <Col span={4}>
                                   <Button
                                       type="primary"
                                       style={{marginRight: '10px'}}
                                       onClick={() => {
                                           updateArticle(item.id)
                                       }}
                                   >修改</Button>
                                   <Button onClick={() => {
                                       delArticle(item.id)
                                   }}>删除</Button>
                               </Col>
                           </Row>
                       </List.Item>
                   )
                }}
            />
        </div>
    )
}

export default withRouter(ArticleList)