import React , {useState,useEffect} from 'react'
import moment from "moment";
import servicePath from "../config/apiUrl";
import {withRouter} from 'react-router-dom'
import {Row,Col,Input,Select,Button,DatePicker ,message} from "antd";
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import addArticleStyle from '../static/css/AddArticle.module.css'
// import {} from '@ant-design/icons'
const  {Option} = Select // 解构出下拉的每一项
const {TextArea} = Input
/* 使用 路由 */


function AddArticle (props) {
    // console.log(props)

    useEffect(() => {
        gettypeInfo()
        //  有
        if (props.id){
            const getContentId = props.id
            getArticleById(getContentId)
        }
        // console.log(props.id)
    },[props.id])

    //数据
    const [articleId , setArticleId ] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle , setArticleTitle] = useState('') // 文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()  //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择文章类型') //选择的文章类别
    const [updateArticle, setUpdateArticle] = useState([]) // 需要修改的文章


    const renderer = marked.Renderer()

    //获取文章类别信息
    const gettypeInfo = async () => {
        const res = axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true // 检验cookie必须开启
        }).then(
            (res) => {
                if (res.data.data =='没有登陆'){
                    console.log('123')
                    sessionStorage.removeItem('openId')
                    props.history.push('/login/')
                }else{
                    // console.log(res)
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    /* 根据路由传过来的id获取对应的文章进行修改 */
    const getArticleById = async (id) => {
      const res =  await axios({
            method: 'get',
            url: servicePath.getArticleById + id,
            withCredentials: true,
        }).then(
            res => {
                console.log(res)
                const articleInfo = res.data.data[0]
                setUpdateArticle(articleInfo) // 保存需要修改的文章
                setArticleId(parseInt(articleInfo.id)) // 文章对应的id
                setArticleTitle(articleInfo.title) // 文章对应的title
                setArticleContent(articleInfo.content) // 文章内容
                let html = marked(articleInfo.content) // 设置marked 预览内容
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduce) // 简介
                let tmpInt = marked(articleInfo.introduce)
                setShowDate(moment(articleInfo.addTime.toString())) // 文章对应的时间
                // setSelectType(articleInfo.typeName) // 文章类别信息
            }
        )
    }

    /*设置marked*/
    marked.setOptions({
        renderer: renderer,
        gfm: true, //使用github的样式
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code){
           return hljs.highlightAuto(code).value
        }
    })

    /*输入内容的时候触发*/
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html);
    }

    /*简介内容*/
    const changeIntroduce = (e) => {
        // console.log(e.target.value)
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    /*类型选择*/
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }
 
    /*保存发布文章*/
    const saveArticle = () => {
        if (selectedType === '请选择文章类型') {
            // console.log(123)
            message.error('必须选择文章类型')
            return false
        }else if (!articleTitle){
            message.error('文章标题不能为空')
            return false
        }else if(!articleContent){
            message.error('文章的内容不能为空')
            return false
        }else if(!introducemd){
            message.error('文章简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        let dataProps = {
            type_id: selectedType,
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: showDate,
        }
        if (articleId === 0 ){
            dataProps.view_count = 0
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true,
            }).then(
                res => {
                  setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                    }else{
                        message.error('文章保存失败')
                    }
                }
            )
        }else {
            dataProps.id = articleId // 当前要修改文章的id
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true,
            }).then(
                (res) => {
                    if (res.data.isSuccess){
                        message.success('文章修改成功')
                    }else {
                        message.error('文章修改失败')
                    }
            })


        }
    }


    return (
        <div className='workContent' style={props.style}>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder='博客标题'
                                value={articleTitle}
                                size={"large"}
                                onChange={(e) => {
                                    setArticleTitle(e.target.value)
                                }}
                            ></Input>
                        </Col>
                        <Col span={4}>
                            <Select
                                defaultValue={selectedType}
                                size={"large"}
                                style={{ width: 140 }}
                                onChange={selectTypeHandler}
                                value={selectedType}
                            >
                                {typeInfo.map((item,index) => {
                                    return (
                                        <Option
                                            value={item.id.toString()}
                                            key={index}
                                        >
                                            {item.typeName}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <Row
                        style={{marginTop : '10px'}}
                        gutter={10}
                    >
                        <Col span={12}>
                            <TextArea
                                placeholder='文章内容'
                                rows={35}
                                className={addArticleStyle.markdownContent}
                                onChange={changeContent}
                                value={articleContent}
                            >
                            </TextArea>
                        </Col>
                        <Col span={12}>
                            <div
                                className={addArticleStyle.showHtml}
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Button size={'large'}>暂存文章</Button>
                            <Button
                                onClick={saveArticle}
                                style={{marginLeft: '10px'}}
                                type={'primary'}
                                size={'large'}>
                                发布文章
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{paddingTop: '10px'}}>
                            <TextArea
                                placeholder='文章简介'
                                rows={5}
                                onChange={changeIntroduce}
                                value={introducemd}
                            >

                            </TextArea>
                           <div
                               className={addArticleStyle.introduceHtml}
                               style={{marginTop: '10px'}}
                               dangerouslySetInnerHTML={{__html: introducehtml}}
                           >
                           </div>
                        </Col>
                            <Col span={12}>
                                <DatePicker
                                    placeholder='发布日期'
                                    size={'large'}
                                    style={{width: '100%',marginTop: '15px'}}
                                    onChange={(date,dateString) => {
                                        setShowDate(dateString)
                                    }}
                                    // value={showDate}
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    placeholder='发布日期'
                                    className={'dateSelect'}
                                    size={'large'}
                                    style={{width: '100%',marginTop: '15px'}}
                                />
                            </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(AddArticle)
