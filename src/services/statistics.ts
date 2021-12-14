import { request } from 'umi';


import { ipUrlDefault } from '../utils/utils';

// import { articleType } from './API.d';

/**
 * 文章列表
 */
export async function getBlogCount() {
  return request(`${ipUrlDefault}getBlogCountNum`, {
    credentials: 'include'
  });
};