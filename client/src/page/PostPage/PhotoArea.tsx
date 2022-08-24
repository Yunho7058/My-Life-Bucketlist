import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  isS3PhotoDownload,
  isSelectPhoto,
  postBlobType,
  postBucketlistImgUpload,
  presignPostUpload,
} from '../../redux/action';
import { TypeRootReducer } from '../../redux/store/store';
import axiosInstance from '../../utils/axios';

const PhotoArea = ({
  img,
  bucketlistId,
}: {
  img: string | null;
  bucketlistId: number;
}) => {
  const stateS3Photo = useSelector((state: TypeRootReducer) => state.s3Photo);
  const [propsPhoto, setPropsPhoto] = useState(img);
  const [file, setFile] = useState<FileList | undefined>();
  const [fileName, setFileName] = useState('');
  const [presignedPost, setPresignedPost] = useState<TypePresignedPost>();
  interface TypePresignedPost {
    url: string;
    fields: {
      Policy: string;
      'X-Amz-Algorithm': string;
      'X-Amz-Credential': string;
      'X-Amz-Date': string;
      'X-Amz-Security-Token': string;
      'X-Amz-Signature': string;
      bucket: string;
      key: string;
    };
  }
  const dispatch = useDispatch();
  //사진 선택 시
  const onLoadFile = (e: { target: HTMLInputElement }) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const fileList = e.target.files;
      setFile(fileList);
      setPropsPhoto(URL.createObjectURL(fileList[0]));
      setFileName(fileList[0].name);
    }
  };
  //사진 선택 후 파일 이름 state 변경시 server로부터 s3 접근 key 받아오기
  useEffect(() => {
    if (fileName) {
      axiosInstance
        .get(`/bucketlist/presigned-post?file_name=${fileName}`)
        .then((res) => {
          setPresignedPost(res.data);
          dispatch(presignPostUpload(res.data.fields.key));
          dispatch(postBlobType(propsPhoto));
        })
        .catch((err) => {
          console.log('photo err');
        });
    }
  }, [fileName]);

  //상위 컴포넌트에서 생성/수정 버튼 클릭시 실행 (formdata로 변경 후 s3전송)

  useEffect(() => {
    if (stateS3Photo.isPhotoDownload && stateS3Photo.presignPost) {
      const formData = new FormData();
      if (presignedPost && file) {
        Object.entries(presignedPost.fields).forEach((entry) => {
          const [key, value] = entry;
          formData.append(key, value);
        });
        formData.append('file', file[0]);
        axios
          .post(presignedPost.url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            dispatch(isS3PhotoDownload(false));
            if (propsPhoto) {
              dispatch(postBucketlistImgUpload(bucketlistId, propsPhoto));
            }

            //s3에 저장을 끝냈으면 아까받은 resignedPost key를 다시 서버에 전송
            //요건 읽을수없음 (client에서 blob type으로 변경해야지 읽기 가능)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [stateS3Photo.isPhotoDownload]);

  const photoInput = useRef<HTMLInputElement>(null);
  const handlePhotoInput = () => {
    if (photoInput.current) {
      photoInput.current.click();
    }
  };
  const handleImgDelete = () => {
    setPropsPhoto(null);
    dispatch(presignPostUpload(''));
    dispatch(isSelectPhoto());
  };
  return (
    <PhotoBack>
      {propsPhoto ? (
        <PhotoZone
          alt="sample"
          src={propsPhoto}
          onClick={() => handlePhotoInput()}
        />
      ) : (
        <BinPhotoZone onClick={() => handlePhotoInput()}>
          사진을 선택해주세요.
        </BinPhotoZone>
      )}
      <DeletePhoto
        onClick={() => {
          handleImgDelete();
        }}
      >
        삭제
      </DeletePhoto>
      <PhotoInput
        type="file"
        accept="image/*"
        name="file"
        onChange={onLoadFile}
        ref={photoInput}
      ></PhotoInput>
    </PhotoBack>
  );
};

export default PhotoArea;

export const PhotoBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PhotoZone = styled.img`
  width: 100%;
  height: 150px;
  padding: 0px;
  border-radius: 15px;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 150px;
  }
`;

export const BinPhotoZone = styled.div`
  border: 1px solid;
  text-align: center;
  line-height: 150px;
  border-radius: 30px;
  min-width: 200px;
  height: 150px;
  background-color: grey;
  @media screen and (max-width: 600px) {
    min-width: 100%;
    border-radius: 10px;
    height: 150px;
    line-height: 150px;
    font-size: 15px;
  }
`;

export const DeletePhoto = styled.div`
  width: 150px;
  height: 30px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: 10px;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    background-color: #c77171;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 20px;
    font-size: 10px;
    border-radius: 10px;
    margin-top: 5px;
    line-height: 20px;
  }
`;

export const PhotoInput = styled.input`
  display: none;
`;
