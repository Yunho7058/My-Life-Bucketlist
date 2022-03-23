export const INCREASE_NUM = 'INCREASE_NUM';
export const DECREASE_NUM = 'DECREASE_NUM';
export const IS = 'IS';

export const increaseNum = (id: number) => {
  return {
    type: INCREASE_NUM,
    payload: {
      id,
    },
  };
};

export const deceaseNum = (id: number) => {
  return {
    type: DECREASE_NUM,
    payload: {
      id,
    },
  };
};

export const is = () => {
  return {
    type: IS,
  };
};
