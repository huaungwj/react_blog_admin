import { request } from 'umi';

import { ipUrl } from '../utils/utils';
import { articleStateType, newType, blogEventType, friendshipLink } from './API';

// 添加分类
export async function addArticleType(params: newType) {
  return request<articleStateType>(`${ipUrl}addArticleType`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 删除分类
export async function deleteArticle(params: number) {
  return request(`${ipUrl}delArticleType/${params}`, {
    credentials: 'include'
  });
}

// 修改分类
export async function upDateType(params: newType) {
  return request<articleStateType>(`${ipUrl}upDateArticleType`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 博客事件-查询
export async function getBlogEventData() {
  return request(`${ipUrl}getBlogEvent`, {
    credentials: 'include'
  });
}

// 博客事件-添加
export async function addBlogEvent(params: blogEventType) {
  return request<articleStateType>(`${ipUrl}addBlogEvent`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 博客事件-修改
export async function updateBlogEvent(params: blogEventType) {
  return request<articleStateType>(`${ipUrl}upDateBlogEvent`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 博客事件-删除
export async function deleteBlogEvent(params: number) {
  return request(`${ipUrl}delBlogEvent/${params}`, {
    credentials: 'include'
  });
}

// 友情链接-查询
export async function getFrindsLinkData() {
  return request(`${ipUrl}getFrindsLink`, {
    credentials: 'include'
  });
}

// 友情链接-添加
export async function addFrindLink(params: friendshipLink) {
  return request<articleStateType>(`${ipUrl}addFrindLink`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 友情链接-修改
export async function updateFrindLink(params: friendshipLink) {
  return request<articleStateType>(`${ipUrl}updateFrindLink`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}

// 友情链接-删除
export async function deleteFindLink(params: number) {
  return request(`${ipUrl}deleteFindLink/${params}`, {
    credentials: 'include'
  });
}

// 素材-查询
export async function getBlogMaterial(params: { currentPage: number; pageSize: number }) {
  return request(`${ipUrl}getBlogMaterial/${params.currentPage}/${params.pageSize}`, {
    credentials: 'include'
  });
}

// 素材-删除
export async function deleteBlogMaterial(params: number) {
  return request(`${ipUrl}deleteBlogMaterial/${params}`, {
    credentials: 'include'
  });
}

// icon-查询
export async function getBlogIcon() {
  return request(`${ipUrl}getBlogIcon`, {
    credentials: 'include'
  });
}

// icon-修改
export async function updataBlogIcon(params: { id: number; icon_link: string }) {
  return request(`${ipUrl}updataBlogIcon`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}