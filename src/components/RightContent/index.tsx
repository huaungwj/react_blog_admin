import { Space, Avatar } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar src="http://49.233.14.172:2888/static/images/blogAvatar.jpg" />
      <span style={{ color: 'white' }}>你好，黄伟绩</span>
    </Space>
  );
};
export default GlobalHeaderRight;
