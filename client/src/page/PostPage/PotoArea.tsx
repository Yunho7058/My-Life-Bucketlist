import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  isS3PotoDownload,
  postBlobType,
  postBucketlistImgUpload,
  presignPostUpload,
} from '../../redux/action';
import { TypeRootReducer } from '../../redux/store/store';
import axiosInstance from '../../utils/axios';

const PotoArea = ({
  img,
  bucketlistId,
}: {
  img: string | null;
  bucketlistId: number;
}) => {
  const stateS3Poto = useSelector((state: TypeRootReducer) => state.s3Poto);
  const [propsPoto, setPropsPoto] = useState(img);
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
      setPropsPoto(URL.createObjectURL(fileList[0]));
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
          dispatch(postBlobType(propsPoto));
        })
        .catch((err) => {
          console.log('poto err');
        });
    }
  }, [fileName]);

  //상위 컴포넌트에서 생성/수정 버튼 클릭시 실행 (formdata로 변경 후 s3전송)

  useEffect(() => {
    if (stateS3Poto.isPotoDownload) {
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
            dispatch(isS3PotoDownload());
            if (propsPoto) {
              dispatch(postBucketlistImgUpload(bucketlistId, propsPoto));
            }

            //s3에 저장을 끝냈으면 아까받은 resignedPost key를 다시 서버에 전송
            //요건 읽을수없음 (client에서 blob type으로 변경해야지 읽기 가능)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [stateS3Poto.isPotoDownload]);

  const potoInput = useRef<HTMLInputElement>(null);
  const handlePotoInput = () => {
    if (potoInput.current) {
      potoInput.current.click();
    }
  };
  const handleImgDelete = () => {
    console.log('삭제');
    setPropsPoto(null);
    dispatch(postBucketlistImgUpload(bucketlistId, null));
    dispatch(presignPostUpload(''));
  };
  return (
    <PotoBack>
      {propsPoto ? (
        <PotoZone
          alt="sample"
          src={propsPoto}
          onClick={() => handlePotoInput()}
        />
      ) : (
        <BinPotoZone onClick={() => handlePotoInput()}>
          사진을 선택해주세요.
        </BinPotoZone>
      )}
      <DeletePoto
        onClick={() => {
          handleImgDelete();
        }}
      >
        삭제
      </DeletePoto>
      <PotoInput
        type="file"
        accept="image/*"
        name="file"
        onChange={onLoadFile}
        ref={potoInput}
      ></PotoInput>
    </PotoBack>
  );
};

export default PotoArea;

export const PotoBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PotoZone = styled.img`
  width: 250px;
  height: 200px;
  padding: 0px;

  border-radius: 15px;
`;

export const BinPotoZone = styled.div`
  border: 1px solid;
  text-align: center;
  line-height: 200px;
  border-radius: 30px;
  min-width: 250px;
  height: 200px;
  background-color: grey;
`;

export const DeletePoto = styled.div`
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
`;

export const PotoInput = styled.input`
  display: none;
`;
