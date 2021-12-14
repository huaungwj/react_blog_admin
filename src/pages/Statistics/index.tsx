import React, {
  useState,
  useEffect
} from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import { getBlogCount } from '@/services/statistics';
import { blogCountType } from './data.d';

const Statistics: React.FC<{}> = () => {

  const [blogInfo, setBlogInfo] = useState<blogCountType>({
    blog_count: 0,
    view_count: 0
  })

  useEffect(() => {
    getBlogCount().then(
      res => {
        setBlogInfo(res.data[0])
      }
    )
  }, [])

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="总文章数" value={blogInfo.blog_count} />
          </Col>
          <Col span={12}>
            <Statistic title="总访问人数" value={blogInfo.view_count} />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  )
}

export default Statistics;