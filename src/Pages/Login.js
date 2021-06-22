import React , {useState , useEffect} from 'react'
import {Card , Input , Button , Spin,notification ,message} from "antd";
import {
    UserOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons'
import loginStyle from '../static/css/Login.module.css'
import 'antd/dist/antd.css'
import servicePath from "../config/apiUrl";
import axios from 'axios'
import md5 from "md5"
//引入路由进行跳转

function Login (props) {
    // console.log(props)
    const [userName , setUserName] = useState('')
    const [password , setPassWord] = useState('')
    const [isLoading , setIsLoading] = useState(false)

    useEffect(() => {
        /*设置title*/
        document.title = '博客后台 ｜ 登陆'
    },[])

    /*方法*/
    const checkLogin = async () => {
        if (!userName) {
            notification.open({
                message: '用户名不能为空',
                description:
                    '用户名是必需的，请输入后在继续',
                onClick: () => {
                    console.log('用户名不能为空');
                },
            });
            return false
        }else if (!password) {
            notification.open({
                message: '密码不能为空',
                description:
                    '密码是必需的，请输入后在继续',
                onClick: () => {
                    console.log('密码不能为空');
                },
            });
            return false
        }
        /* 用户名 密码有了 */
        setIsLoading(true) // loading
      /*  const res = await axios.get('http://127.0.0.1:7001/admin/index')
        console.log(res)*/
        console.log(userName,password)
        const res = axios({
            method: 'POST',
            url: servicePath.checkLogin,
            data: {
                username : userName,
                password: md5(password),
            },
            withCredentials: true, // 前后 共享session
        }).then(
            /*成功*/
            res => {
                setIsLoading(false)
                if (res.data.data === '登陆成功'){
                    sessionStorage.setItem('openId' , res.data.openId)
                    console.log('123')
                    props.history.push('/index') // 编程式导航
                }else{
                    message.error('用户名密码错误')
                }
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

       /* setTimeout( () => {
            setIsLoading(false)
        },1000)*/
    }

    return (
        <div className={loginStyle.loginDiv}>
            <Spin tip='Loading...' spinning={isLoading}>
                <Card
                    title="JSPang blog System "
                    bordered={true}
                    style={{width: 400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder='Enter your userName'
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        value={userName}
                    />
                    <br/><br/>
                    <Input.Password
                        placeholder='Enter your password'
                        size='large'
                        id='password'
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => {
                            setPassWord(e.target.value)
                        }}
                    />
                    <br/><br/>
                    <Button
                        type="primary"
                        size='large'
                        block
                        onClick={checkLogin}
                    >Login in</Button>
                </Card>
            </Spin>
        </div>

    )
}

export default Login