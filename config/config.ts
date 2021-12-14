// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  history: { type: 'hash' }, // 默认是 browser
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'xiaohai',
    locale: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      redirect: '/statistics',
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
      hideInMenu: true,
    },
    {
      path: '/statistics',
      name: 'statistics',
      icon: 'LineChartOutlined',
      access: 'statistics',
      component: './Statistics',
    },
    {
      path: '/article',
      name: 'article',
      icon: 'FileMarkdownOutlined',
      access: 'article',
      routes: [
        {
          path: '/article/articleList',
          name: 'articleList',
          icon: 'UnorderedListOutlined',
          component: './ArticleManagement/ArticleList',
        },
        {
          path: '/article/newArticle',
          name: 'newArticle',
          icon: 'FileAddOutlined',
          component: './ArticleManagement/NewArticle',
        },
        {
          path: '/article/newArticle/:id',
          name: 'newArticle',
          icon: 'smile',
          component: './ArticleManagement/NewArticle',
          hideInMenu: true,
        },
      ],
    },
    {
      path: '/blogConfig',
      name: 'blogConfig',
      icon: 'FormOutlined',
      access: 'blogConfig',
      // component: './BlogConfig',
      routes: [
        {
          path: '/blogConfig/articleCategory',
          name: 'articleCategory',
          icon: 'UnorderedListOutlined',
          component: './BlogConfig/ArticleCategory',
        },
        {
          path: '/blogConfig/blogEvent',
          name: 'blogEvent',
          icon: 'FileAddOutlined',
          component: './BlogConfig/BlogEvent',
        },
        {
          path: '/blogConfig/friendshipLink',
          name: 'friendshipLink',
          icon: 'smile',
          component: './BlogConfig/FriendshipLink',
        },
        {
          path: '/blogConfig/blogMaterial',
          name: 'blogMaterial',
          icon: 'smile',
          component: './BlogConfig/BlogMaterial',
        },
      ],
    },
    {
      path: '/messageManagement',
      name: 'messageManagement',
      icon: 'LikeOutlined',
      access: 'messageManagement',
      component: './MessageManagement',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  base: '/static/blogAdmin/index.html',
  publicPath: '/static/blogAdmin/',
});
