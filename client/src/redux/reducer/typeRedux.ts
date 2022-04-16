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
  export interface TypeKeyString {
    [key: string]: string;
  }
  export interface TypePostData extends TypePostsData {
    owner: boolean;
    bookmark: boolean;
    like: boolean;
  }

  export interface TypePost {
    type: string;
    payload: {
      postEachData: TypePostData;
      content: TypeKeyString;
      id: number;
    };
  }

  export interface TypeModal {
    show: boolean;
    msg: string;
    commentId?: number;
  }
  export interface TypedModalAction {
    type: string;
    payload: {
      msg: string;
      commentId?: number;
    };
  }
}

export default TypeRedux;
