import React, {
  useEffect,
  useState
} from 'react';
import {
  Table,
  Button,
  Modal,
  message,
  Card
} from 'antd';
// import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import { history } from 'umi';

import { getArticleList, deleteArticle } from '@/services/article';
import { dataType } from './data.d';
import { isLogin } from '@/utils/utils';

const { confirm } = Modal;

const ArticleList: React.FC<{}> = () => {

  const [data, setData] = useState<dataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);  // 当前页 默认第一页
  const [pageSize, setPageSize] = useState<number>(10);       // 每页数量 默认10
  const [total_count, setTotal_count] = useState<number>(0);  // 素材总数 默认0
  const column = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '30%'
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
      sorter: (a: dataType, b: dataType) => a.typeName.length - b.typeName.length
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
      sorter: (a: dataType, b: dataType) => moment(a.addTime) - moment(b.addTime)
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
      sorter: (a: dataType, b: dataType) => a.view_count - b.view_count
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: (a: dataType, b: dataType) => a.status - b.status,
      render: (status: number) => status == 0 ? '暂存' : '已发布'
    },
    {
      title: '操作',
      render: (item: dataType) => (
        <>
          <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>&nbsp;
          <Button onClick={() => { delArticle(item.id) }}>删除 </Button>
        </>
      )
    },
  ]

  //删除文章的方法
  const delArticle = (id: number) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        deleteArticle(id).then(res => {
          message.success('文章删除成功')
          getArticleListData();
        })
      },
      onCancel() {
        message.success('没有任何改变')
      },
    });
  }

  //修改文章
  const updateArticle = (id: number) => {
    history.push('/article/newArticle/' + id)
  }

  const getArticleListData = () => {
    const params = {
      currentPage,
      pageSize
    }
    // console.log(params)
    getArticleList(params).then(res => {
      if (isLogin(res)) {
        let data = res.list;
        for (let i in data) {
          data[i].key = data[i].id
        }
        setData(data);
        setTotal_count(res.total_count);
      }
    })
  }

  useEffect(() => {
    getArticleListData();
  }, [currentPage, pageSize]);

  const changePage = (current: number) => {
    setCurrentPage(current)
  }

  const paginationProps = {
    showSizeChanger: true,//设置每页显示数据条数
    showQuickJumper: false,
    showTotal: () => `共${total_count}条`,
    pageSize: pageSize,
    total: total_count,  //数据的总的条数
    onChange: (current: number) => changePage(current), //点击当前页码
    onShowSizeChange: (current: number, pageSize: number) => {//设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      setPageSize(pageSize);
    }
  }

  return (
    // <PageContainer>
    <Card title="文章列表">
      <Table
        columns={column}
        dataSource={data}
        pagination={paginationProps}
      />
    </Card>

    // {/* </PageContainer> */ }
  )
}

export default ArticleList;