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
    payload: { postAlldata: TypePostsData[]; id: number; url?: string };
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
      image_path?: string;
      image_path_origin?: string;
    }[];
  }
  export interface TypeKeyString {
    [key: string]: string;
  }
  export interface TypePostData extends TypePostsData {
    owner: boolean;
    is_public: boolean;
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
      image_path: string;
      url: string;
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

  export interface TypeS3Reducer {
    presignPost: string;
    isPotoDownload: boolean;
    potoBlob: string;
  }
  export interface TypeComment {
    content: string;
    id: number;
    nickname: string;
    user_id: number;
    updated_at: string;
    image_path?: string;
  }
  export interface TypeUserInfo {
    user_id: number;
    post_id: number;
    nickname: string;
    email: string;
    domain: string;
    image_path: string | null;
  }
}

export default TypeRedux;
