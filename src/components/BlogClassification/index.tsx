import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';

import { getArticleType } from '@/services/article';
import { articleType, newType } from './data';
import { addArticleType, deleteArticle, upDateType } from '@/services/BlogConfig';
import { isLogin } from '@/utils/utils';

const { confirm } = Modal;

const BlogClassification: React.FC<{}> = () => {

  const [articleType, setArticleType] = useState<articleType[]>([]);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [typeId, setTypeId] = useState<number>(0);
  const [operationStatus, setOperationStatus] = useState<string>('')
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const newArticleType = () => {
    setOperationStatus('添加分类')
    form.resetFields();
    setTypeId(0);
    setAddVisible(true);
  }

  const column = [
    {
      title: '序号',
      dataIndex: 'Id',
      key: 'Id',
      sorter: (a: articleType, b: articleType) => a.Id - b.Id
    },
    {
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '名称',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '附属名称',
      dataIndex: 'subTypeName',
      key: 'subTypeName',
    },
    {
      title: '操作',
      render: (item: articleType) => (
        <>
          {/* <Button type="primary" >上调</Button>&nbsp; */}
          {/* <Button type="primary" >下调</Button>&nbsp; */}
          <Button type="primary" onClick={() => upDateArticleType(item)}>修改</Button>&nbsp;
          <Button onClick={() => delArticleType(item)}>删除 </Button>
        </>
      )
    }
  ]

  // 新增或修改分类
  const onFinish = (values: newType) => {
    if (typeId === 0) {
      addArticleType(values).then(res => {
        message.info('添加成功')
        setAddVisible(false)
        getArticleType().then(res => {
          setArticleType(res.data);
        })
      })
    } else if (typeId > 0) {
      const value = Object.assign({}, values, { id: typeId })
      upDateType(value).then(res => {
        message.info('修改成功')
        setAddVisible(false)
        getArticleType().then(res => {
          setArticleType(res.data);
        })
      })
    }
  }

  // 删除分类
  const delArticleType = (item: articleType) => {

    confirm({
      title: '确定要删除此类型?',
      icon: <ExclamationCircleOutlined />,
      content: item.typeName,
      onOk() {
        deleteArticle(item.Id).then(res => {
          message.info('删除成功')
          getArticleType().then(res => {
            setArticleType(res.data);
          })
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 修改分类
  const upDateArticleType = (item: articleType) => {
    setOperationStatus('修改分类')
    form.setFieldsValue({ icon: item.icon, typeName: item.typeName, subTypeName: item.subTypeName })
    setTypeId(item.Id)
    setAddVisible(true);
  }

  useEffect(() => {
    getArticleType().then(res => {
      if (isLogin(res)) {
        setArticleType(res.data);
      }
    })
  }, [])

  return (
    <Card title="文章分类" extra={
      <div>
        <Button type="primary" onClick={newArticleType}>添加分类</Button>
      </div>
    }>
      <br />
      <Table
        columns={column}
        dataSource={articleType}
      />
      <Modal
        title={operationStatus}
        visible={addVisible}
        // onOk={}
        onCancel={() => setAddVisible(false)}
        footer={null}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="icon"
            name="icon"
            rules={[{ required: true, message: '请填写icon' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="typeName"
            rules={[{ required: true, message: '请填写分类名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="附属名称"
            name="subTypeName"
            rules={[{ required: true, message: '请填写分类附属名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default BlogClassification;