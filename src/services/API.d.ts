declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
    data: string;
    openId: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}


export interface articleType {

  /**
   * 文章类型id
   */
  type_id: string;

  /**
   * 文章标题
   */
  title: string;

  /**
   * 文章类容
   */
  article_content: string;

  /**
   * 文章简介
   */
  introduce: string;

  /**
   * 文章添加时间
   */
  addTime: string;

  /**
   * 文章阅读量
   */
  view_count?: number;

  /**
   * 文章id
   */
  id?: number;

  /**
   * 文章状态
   */
  status: number;

  /**
   * 是否置顶
   */
  top: number
};

export interface articleStateType {
  /**
   * 添加是否成功
   */
  isScuccess: boolean;
  /**
   * 分类id
   */
  insertId: number;
}

export interface articleTypes {
  /**
   * 分类名称
   */
  typeName: string;

  /**
   * 分类icon
   */
  icon: string;
}

export interface newType {

  /**
   * 分类id 修改时使用
   */
  Id?: number;

  /**
   * icon
   */
  icon: string;

  /**
   * 分类名称
   */
  typeName: string;
}

export interface blogEventType {

  /**
   * 内容
   */
  content: string;

  /**
   * id
   */
  id?: number;

  /**
   * key
   */
  key?: number;
}

export interface friendshipLink {

  /**
   * id
   */
  id: number;

  /**
   * 内容
   */
  content: string;

  /**
   * 链接
   */
  link: string;

  /**
   * key
   */
  key: number;
}