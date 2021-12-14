import React from 'react';
// import { PageContainer } from '@ant-design/pro-layout';

import BlogClassification from '@/components/BlogClassification';
import BlogIcon from '@/components/BlogIcon';

const BlogConfig: React.FC<{}> = () => {

  return (
    <>
      <BlogClassification />
      <BlogIcon />
    </>
  )
}

export default BlogConfig;