let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin' , //登陆检测
    getTypeInfo: ipUrl + 'getTypeInfo', //获取文章分类
    addArticle: ipUrl + 'addArticle', // 添加文章
    updateArticle: ipUrl + 'updateArticle', // 更新文章
    getArticleList: ipUrl + 'getArticleList', // 获取文章列表
    deleteArticle: ipUrl + 'deleteArticle/', // 删除文章
    getArticleById: ipUrl + 'getArticleById/', // 根据id获取文章详情
}

export default servicePath