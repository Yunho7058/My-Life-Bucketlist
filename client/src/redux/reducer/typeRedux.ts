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
      detail?: string;
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
      id: number;
      data: TypeKeyString;
      content: string;
      detail: string;
    };
  }

  export interface TypeModal {
    show: boolean;
    msg: string;
    id?: number;
    item?: string;
  }
  export interface TypedModalAction {
    type: string;
    payload: {
      msg: string;
      id?: number;
      item?: string;
    };
  }
}

export default TypeRedux;
