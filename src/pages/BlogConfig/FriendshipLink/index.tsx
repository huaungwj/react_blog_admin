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

import {
  getFrindsLinkData,
  addFrindLink,
  deleteFindLink,
  updateFrindLink
} from '@/services/BlogConfig';
import { isLogin } from '@/utils/utils';

import { friendshipLink } from './data';

const { confirm } = Modal;

const FriendshipLink: React.FC<{}> = () => {

  const [blogEventData, setBlogEventData] = useState<friendshipLink[]>([]);
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
      sorter: (a: friendshipLink, b: friendshipLink) => a.id - b.id
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '网址',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '操作',
      render: (item: friendshipLink) => (
        <>
          <Button type="primary" onClick={() => upDateFindsLink(item)}>修改</Button>&nbsp;
          <Button onClick={() => delFindsLink(item)}>删除 </Button>
        </>
      )
    }
  ]

  const getFrindsLinkDataList = () => {
    getFrindsLinkData().then(res => {
      if (isLogin(res)) {
        const { data } = res;
        setBlogEventData(data);
      }
    })
  }

  const upDateFindsLink = (value: friendshipLink) => {
    setOperationStatus('修改事件');
    setTypeId(value.id)
    form.setFieldsValue({ content: value.content, link: value.link });
    setAddVisible(true);
  }

  const delFindsLink = (item: friendshipLink) => {
    confirm({
      title: '确定要删除此链接?',
      icon: <ExclamationCircleOutlined />,
      content: item.link,
      onOk() {
        deleteFindLink(item.id).then(res => {
          message.info('删除成功')
          getFrindsLinkDataList();
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  const newFindLink = () => {
    setTypeId(0);
    form.resetFields();
    setOperationStatus('添加链接');
    setAddVisible(true);
  }

  useEffect(() => {
    getFrindsLinkDataList();
  }, [])

  // 新增或修改链接
  const onFinish = (values: friendshipLink) => {
    if (typeId === 0) {
      addFrindLink(values).then(res => {
        message.info('添加成功')
        setAddVisible(false)
        getFrindsLinkDataList();
      })
    } else if (typeId > 0) {
      const value = Object.assign({}, values, { id: typeId })
      updateFrindLink(value).then(res => {
        message.info('修改成功')
        setAddVisible(false)
        getFrindsLinkDataList();
      })
    }
  }

  return (
    <PageContainer>
      <Card title="事件列表" extra={
        <div>
          <Button type="primary" onClick={newFindLink}>添加链接</Button>
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
              <Input />
            </Form.Item>
            {/* <br /> */}
            <Form.Item
              label="网址"
              name="link"
              rules={[{ required: true, message: '请填写网址' }]}
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
    </PageContainer>
  )
}

export default FriendshipLink;