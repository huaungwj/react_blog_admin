import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { getArticleType } from '@/services/article';
import { blogIconType } from './data';
import { getBlogIcon, updataBlogIcon } from '@/services/BlogConfig';

const BlogIcon: React.FC<{}> = () => {
  const [blogIconData, setBlogIconData] = useState<blogIconType[]>([]);
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '链接',
    dataIndex: 'icon_link',
    key: 'icon_link',
  },
  {
    title: '操作',
    render: (item: blogIconType) => <Button type="primary" onClick={() => upDateBlogIcon(item)}>修改</Button>
  }];

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const upDateBlogIcon = (item: blogIconType) => {
    form.resetFields();
    setIconVisible(true);
  }

  const getBlogIconData = () => {
    getBlogIcon().then(res => {
      setBlogIconData(res.data);
    })
  }

  useEffect(() => {
    getBlogIconData();
  }, [])

  const onFinish = (values: { icon_link: string }) => {
    const data = {
      id: 1,
      icon_link: values.icon_link
    }
    updataBlogIcon(data).then(res => {
      if (res.isScuccess) {
        getBlogIconData();
        setIconVisible(false);
      }
    })
  }

  return (
    <Card title="icon配置" style={{ marginTop: '24px' }}>
      <Table columns={columns} dataSource={blogIconData} />
      <Modal
        visible={iconVisible}
        title="修改icon链接"
        footer={null}
        onCancel={() => setIconVisible(false)}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="链接"
            name="icon_link"
            rules={[{ required: true, message: '请填写icon链接' }]}
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

export default BlogIcon;