import { message } from 'antd';
import { history } from 'umi';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// export const ipUrl = 'http://localhost:7001/admin/';
// export const ipUrlDefault = 'http://localhost:7001/default/';

export const ipUrl = 'http://49.233.14.172:7001/admin/';
export const ipUrlDefault = 'http://49.233.14.172:7001/default/';

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const isLogin = (res: any): boolean => {
  if (res.code && res.code === -1) {
    message.warning('请先登录');
    history.push('/user/login');
    return false;
  } else {
    return true;
  }
};
