import { request } from 'umi';

import { ipUrl } from '../utils/utils';

import { articleType } from './API.d';

/**
 * 文章列表
 */
export async function getArticleList(params: { currentPage: number; pageSize: number }) {
  // return request(`${ipUrl}getArticleList/${params.currentPage}/${params.pageSize}`);
  return request(`${ipUrl}getArticleList/${params.currentPage}/${params.pageSize}`, {
    credentials: 'include'
  });
};

/**
 * 文章类型
 */
export async function getArticleType() {
  return request(`${ipUrl}getTypeInfo`, {
    credentials: 'include'
  });
};

/**
 * 删除文章
 */
export async function deleteArticle(params: number) {
  return request(`${ipUrl}delArticle/${params}`, {
    credentials: 'include'
  });
};

/**
 * 添加文章
 */
export async function addArticle(params: articleType) {
  return request(`${ipUrl}addArticle`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

export async function updateArticle(params: articleType) {
  return request(`${ipUrl}updateArticle`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

export async function getArticleById(params: string) {
  return request(`${ipUrl}getArticleById/${params}`, {
    credentials: 'include'
  });
}