import {
  POST_PHOTO_BLOB,
  POST_PHOTO_PRESIGNPOST,
  POST_PHOTO_S3_DOWNLOAD,
} from '../action';
import TypeRedux from './typeRedux';

const initialization = {
  presignPost: '',
  isPhotoDownload: false,
  photoBlob: '',
};

const s3Photo = (
  state: TypeRedux.TypeS3Reducer = initialization,
  action: any
) => {
  switch (action.type) {
    case POST_PHOTO_BLOB:
      let copy_blob = action.payload;
      return { ...state, photoBlob: copy_blob };
    case POST_PHOTO_PRESIGNPOST:
      let copy = action.payload;
      return { ...state, presignPost: copy };
    case POST_PHOTO_S3_DOWNLOAD:
      return { ...state, isPhotoDownload: action.payload };
    default:
      return state;
  }
};

export default s3Photo;
