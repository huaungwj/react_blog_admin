import React, {
  useEffect,
  useState
} from 'react';

import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  message
} from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

import {
  getBlogEventData,
  addBlogEvent,
  deleteBlogEvent,
  updateBlogEvent
} from '@/services/BlogConfig';
import { isLogin } from '@/utils/utils';

import { blogEventType } from './data';

const { confirm } = Modal;

const BlogEvent: React.FC<{}> = () => {

  const [blogEventData, setBlogEventData] = useState<blogEventType[]>([]);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [operationStatus, setOperationStatus] = useState<string>('');
  const [typeId, setTypeId] = useState<number>(0);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: blogEventType, b: blogEventType) => a.id - b.id
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      render: (item: blogEventType) => (
        <>
          <Button type="primary" onClick={() => upDateBlogEvent(item)}>修改</Button>&nbsp;
          <Button onClick={() => delBlogEvent(item)}>删除 </Button>
        </>
      )
    }
  ]

  const newBlogEvent = () => {
    setTypeId(0);
    form.resetFields();
    setOperationStatus('添加事件');
    setAddVisible(true);
  }

  const upDateBlogEvent = (value: blogEventType) => {
    setOperationStatus('修改事件');
    setTypeId(value.id)
    form.setFieldsValue({ content: value.content });
    setAddVisible(true);
  }

  const delBlogEvent = (item: blogEventType) => {
    confirm({
      title: '确定要删除此链接?',
      icon: <ExclamationCircleOutlined />,
      content: item.content,
      onOk() {
        deleteBlogEvent(item.id).then(res => {
          message.info('删除成功')
          blogEventDataList();
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  // 获取事件列表
  const blogEventDataList = () => {
    getBlogEventData().then(res => {
      if (isLogin(res)) {
        let { data } = res;
        setBlogEventData(data)
      }
    })
  }

  useEffect(() => {
    blogEventDataList();
  }, [])

  // 新增或修改分类
  const onFinish = (values: blogEventType) => {
    if (typeId === 0) {
      addBlogEvent(values).then(res => {
        message.info('添加成功')
        setAddVisible(false)
        blogEventDataList();
      })
    } else if (typeId > 0) {
      const value = Object.assign({}, values, { id: typeId })
      updateBlogEvent(value).then(res => {
        message.info('修改成功')
        setAddVisible(false)
        blogEventDataList();
      })
    }
  }

  return (
    <PageContainer>
      <Card title="事件列表" extra={
        <div>
          <Button type="primary" onClick={newBlogEvent}>添加事件</Button>
        </div>
      }>
        <Table columns={columns} dataSource={blogEventData} />
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
              label="内容"
              name="content"
              rules={[{ required: true, message: '请填写内容' }]}
            >
              <Input placeholder="YYYY-MM-DD 内容" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
            </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </PageContainer>
  )
}

export default BlogEvent;