namespace TypeRedux {
  export interface TypeDumy {
    id: number;
    name: string;
    quantity: number;
  }
  export interface TypeAction {
    type: string;
    payload: {
      id: number;
    };
  }
  export interface TypePosts {
    type: string;
    payload: { postAlldata: TypePostsData };
  }
  export interface TypePostsData {
    title: string;
    id: number;
    nickname: string;
    updated_at: any;
    like_count: number;
    bucketlist: {
      id: number;
      content: string;
      data: any;
      image_path: any;
    }[];
  }

  export interface TypeUserInfo {
    id: number;
    email: string;
    nickname: string;
  }
  export interface TypeUserInfoAction {
    type: string;
    payload: { userInfo: TypeUserInfo };
  }
}

export default TypeRedux;
