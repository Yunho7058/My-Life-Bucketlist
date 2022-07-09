import { BsPlusCircleDotted } from 'react-icons/bs';
import * as PS from '../style/PostStyledComponents';
import { useSelector } from 'react-redux';
import { TypeRootReducer } from '../../redux/store/store';
import TypeRedux from '../../redux/reducer/typeRedux';
import { useState } from 'react';

interface TypeProps {
  isPost: { isEditMode: boolean; isSimple: boolean; isCreate: boolean };
  handleInputItem: (
    key: string
  ) => (e: { target: HTMLInputElement | HTMLTextAreaElement }) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  handleBucketlistCreate: () => void;
  handleInputNewItem: (
    key: string
  ) => (e: { target: HTMLInputElement | HTMLTextAreaElement }) => void;
  newBucketlist: {
    content: string;
    detail: string;
    image_path: string;
  };
  handleNewBucketlist: () => void;
  paginationStart: number;
  paginationEnd: number;
  // onLoadFile: (e: { target: HTMLInputElement }) => void;
  // handleImgDelete: (id: number) => void;
}

const SimpleMode = ({
  isPost,
  handleInputItem,
  handleDelete,
  handleEdit,
  handleBucketlistCreate,
  handleInputNewItem,
  newBucketlist,
  handleNewBucketlist,
  paginationStart,
  paginationEnd,
}: // onLoadFile,
// handleImgDelete,
TypeProps) => {
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );
  const [eventPost, setEnevtPost] = useState<number[]>([]);
  const handleIsSimple = (id: number) => {
    if (eventPost.includes(id)) {
      setEnevtPost(
        eventPost.filter((el) => {
          return el !== id;
        })
      );
    } else {
      setEnevtPost([...eventPost, id]);
    }
  };
  return (
    <PS.BucketlistBox>
      {statePost.bucketlist
        .slice(paginationStart, paginationEnd)
        .map((el, idx) => {
          return eventPost.includes(el.id) ? (
            <PS.BucketlistView
              key={el.id}
              onClick={() => {
                handleIsSimple(el.id);
              }}
            >
              {/*상세보기*/}
              <div>
                {el.image_path ? (
                  <PS.PostPoto
                    alt="sample"
                    src={el.image_path}
                    style={{ margin: 'auto' }}
                  />
                ) : (
                  <PS.BucketlistImg>사진을 선택해주세요.</PS.BucketlistImg>
                )}
                <PS.BucketlistContent>
                  <div className="content">
                    {paginationStart >= 0 && paginationStart < 21
                      ? (paginationStart += 1)
                      : paginationStart++}
                    . {el.content}
                  </div>
                  <div>{el.detail}</div>
                </PS.BucketlistContent>
              </div>
            </PS.BucketlistView>
          ) : (
            <PS.BucketlistContent
              onClick={() => {
                handleIsSimple(el.id);
              }}
              key={el.id}
              className="simple"
            >
              <div className="content">
                {paginationStart >= 0 && paginationStart < 21
                  ? (paginationStart += 1)
                  : paginationStart++}
                . {el.content}
              </div>
            </PS.BucketlistContent>
          );
        })}
    </PS.BucketlistBox>
  );
};

export default SimpleMode;
