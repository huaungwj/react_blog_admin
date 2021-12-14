import React, { useEffect, useState } from 'react';
import {
  Card,
  Upload,
  Button,
  message,
  Table,
  Image,
  Modal,
  Select
} from 'antd';
// import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
  getBlogMaterial,
  deleteBlogMaterial,
} from '@/services/BlogConfig';
import { getArticleType } from '@/services/article';
import { materialType } from './data';
import { articleType } from '../../../components/BlogClassification/data';
import { ipUrl, isLogin } from '@/utils/utils';

const { Option } = Select;
const { confirm } = Modal;

const BlogMaterial: React.FC<{}> = () => {

  const [materialData, setMaterialData] = useState<materialType[]>([]);
  const [articleType, setArticleType] = useState<articleType[]>([]);
  const [typeName, setTypeName] = useState<string>('');
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);  // 当前页 默认第一页
  const [pageSize, setPageSize] = useState<number>(10);       // 每页数量 默认10
  const [total_count, setTotal_count] = useState<number>(0);  // 素材总数 默认0

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: materialType, b: materialType) => a.id - b.id
    },
    {
      title: '缩略图',
      dataIndex: 'material_link',
      key: 'material_link',
      render: ((item: string) => {
        return <Image src={item} alt="" width={100} />
      })
    },
    {
      title: '链接',
      dataIndex: 'material_link',
      key: 'material_link',
    },
    {
      title: '名称',
      dataIndex: 'material_name',
      key: 'material_name',
    },
    {
      title: '分类',
      dataIndex: 'material_type',
      key: 'material_type',
      sorter: (a: materialType, b: materialType) => a.material_type.localeCompare(b.material_type)
    },
    {
      title: '操作',
      render: (item: materialType) => <Button type="primary" onClick={() => delBlogMaterial(item)}>删除</Button>
    }
  ]

  const delBlogMaterial = (item: materialType) => {
    confirm({
      title: '确定要删除此素材?',
      icon: <ExclamationCircleOutlined />,
      content: item.material_name,
      onOk() {
        deleteBlogMaterial(item.id).then(res => {
          message.info('删除成功')
          getMaterialData();
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const props = {
    name: 'file',
    action: `${ipUrl}upLoadMaterial?typeName=${typeName}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
        setAddVisible(false); // 模态框隐藏
        getMaterialData();    // 重新获取数据
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败！`);
      }
    },
  };

  const getMaterialData = () => {
    const params = {
      currentPage,
      pageSize
    }
    getBlogMaterial(params).then(res => {
      if (res.code === 1) {
        setMaterialData(res.data);
        setTotal_count(res.total_count);
      }
    })
  }

  const changePage = (current: number) => {
    setCurrentPage(current)
  }

  useEffect(() => {
    getMaterialData();
  }, [currentPage, pageSize])

  useEffect(() => {
    getArticleType().then(res => {
      if (isLogin(res)) {
        setArticleType(res.data);
      }
    })
  }, [])

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
    <Card title="图片素材" extra={
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={() => setAddVisible(true)}
      >
        添加素材
        </Button>
    }>
      <Table
        dataSource={materialData}
        columns={columns}
        pagination={paginationProps}
      />

      <Modal
        title="添加素材"
        visible={addVisible}
        // onOk={}
        onCancel={() => setAddVisible(false)}
        footer={null}
      >
        <div>
          <div>请选择素材分类:</div>
          <Select
            style={{ width: '200px', margin: '10px 0' }}
            onChange={(e: string) => setTypeName(e)}
          >
            {
              articleType.map(item => (
                <Option
                  value={item.subTypeName}
                  key={item.Id}
                >
                  {item.typeName}
                </Option>
              ))
            }
          </Select>
          {
            typeName &&
            <div>
              <Upload
                {...props}
                withCredentials={true}
              >
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={() => setAddVisible(true)}
                >
                  选择素材
                  </Button>
              </Upload>
            </div>
          }
        </div>
      </Modal>
    </Card>
    // </PageContainer>
  )
}

export default BlogMaterial;