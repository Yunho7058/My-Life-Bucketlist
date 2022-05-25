import {
  POST_POTO_BLOB,
  POST_POTO_PRESIGNPOST,
  POST_POTO_S3_DOWNLOAD,
} from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  presignPost: '',
  isPotoDownload: false,
  potoBlob: '',
};

const s3Poto = (
  state: TypeRedux.TypeS3Reducer = initialization,
  action: any
) => {
  switch (action.type) {
    case POST_POTO_BLOB:
      let copy_blob = action.payload;
      return { ...state, potoBlob: copy_blob };
    case POST_POTO_PRESIGNPOST:
      let copy = action.payload;
      return { ...state, presignPost: copy };
    case POST_POTO_S3_DOWNLOAD:
      return { ...state, isPotoDownload: !state.isPotoDownload };
    default:
      return state;
  }
};

export default s3Poto;
