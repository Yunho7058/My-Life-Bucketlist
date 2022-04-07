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
    payload: {
      postAlldata: {
        title: string;
        bucketlist: {
          id: number;
          content: string;
          data: string;
          image_path: any;
        };
        id: number;
        nickname: string;
        updated_at: string;
        like_count: number;
      };
    };
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
}

export default TypeRedux;
