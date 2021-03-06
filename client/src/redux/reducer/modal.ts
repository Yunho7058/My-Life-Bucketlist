import { MODAL_CLOSE, MODAL_OPEN } from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  show: false,
  msg: '',
};

const modal = (
  state: TypeRedux.TypeModal = initialization,
  action: TypeRedux.TypedModalAction
) => {
  switch (action.type) {
    case MODAL_OPEN:
      let copy = {
        show: true,
        msg: action.payload.msg,
        id: action.payload.id,
        item: action.payload.item,
      };
      return copy;
    case MODAL_CLOSE:
      let copy_close = { msg: '', id: NaN, item: '', show: false };
      return copy_close;
    default:
      return state;
  }
};

export default modal;
