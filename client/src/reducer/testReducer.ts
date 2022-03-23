import { INCREASE_NUM, DECREASE_NUM } from '../action/testActions';

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
}

const dumy: TypeRedux.TypeDumy[] = [
  {
    id: 0,
    name: '초콜렛',
    quantity: 3,
  },
  {
    id: 1,
    name: '사탕',
    quantity: 7,
  },
  {
    id: 2,
    name: '핫도그',
    quantity: 37,
  },
];

//action은 actions 폴더에서 type지정 후 type지정 하기
const testReducer = (
  state = dumy,
  action: TypeRedux.TypeAction
): TypeRedux.TypeDumy[] => {
  switch (action.type) {
    case INCREASE_NUM:
      let copy1 = [...dumy];
      copy1[action.payload.id].quantity++;
      return copy1;
    case DECREASE_NUM:
      let copy2 = [...dumy];
      if (copy2[action.payload.id].quantity > 0) {
        copy2[action.payload.id].quantity--;
      }
      return copy2;
    default:
      return state;
  }
};

export default testReducer;

//! 함수 설정은 한 파일에 하나 export default를 해줘야함
