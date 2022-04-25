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
}: TypeProps) => {
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
              {/*선택 상세보기,편집 on */}
              {isPost.isEditMode ? (
                <>
                  <div>
                    <PS.BucketlistImg />
                    <PS.BucketlistContent>
                      <PS.InputBox
                        id={`${el.id}`}
                        placeholder="버킷리스트를 작성해주세요"
                        defaultValue={el.content}
                        onChange={handleInputItem('content')}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                      <PS.TextArea
                        placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                        maxLength={100}
                        name={el.detail}
                        value={el.detail}
                        onChange={() => handleInputItem('detail')}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      ></PS.TextArea>
                    </PS.BucketlistContent>
                  </div>
                  <div>
                    <PS.Btn
                      className="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(el.id);
                      }}
                    >
                      삭제
                    </PS.Btn>
                    <PS.Btn
                      className="modify"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(el.id);
                      }}
                    >
                      저장
                    </PS.Btn>
                  </div>
                </>
              ) : (
                <div>
                  <PS.BucketlistImg />
                  {/* //이미지 경로 설정 */}
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
              )}
            </PS.BucketlistView>
          ) : (
            <PS.BucketlistContent
              onClick={() => {
                handleIsSimple(el.id);
              }}
              key={el.id}
              className="simple"
            >
              {/*편집 on */}

              {isPost.isEditMode ? (
                <div className="content">
                  <PS.InputBox
                    id={`${el.id}`}
                    className="simple"
                    placeholder="버킷리스트를 작성해주세요"
                    defaultValue={el.content}
                    onChange={handleInputItem('content')}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></PS.InputBox>
                  <div>
                    <PS.Btn
                      className="delete Simple"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(el.id);
                      }}
                    >
                      삭제
                    </PS.Btn>
                    <PS.Btn
                      className="modify Simple"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(el.id);
                      }}
                    >
                      저장
                    </PS.Btn>
                  </div>
                </div>
              ) : (
                <div className="content">
                  {paginationStart >= 0 && paginationStart < 21
                    ? (paginationStart += 1)
                    : paginationStart++}
                  . {el.content}
                </div>
              )}
            </PS.BucketlistContent>
          );
        })}
      {isPost.isCreate && isPost.isEditMode && (
        <PS.BucketlistContent className="simple">
          {/* 생성 박스 */}
          <div className="content">
            <PS.InputBox
              className="simple"
              placeholder="버킷리스트를 작성해주세요"
              value={newBucketlist.content}
              onChange={handleInputNewItem('content')}
              onClick={(e) => {
                e.stopPropagation();
              }}
            ></PS.InputBox>
            <div>
              <PS.Btn
                className="simpleCreate"
                onClick={() => {
                  handleNewBucketlist();
                }}
              >
                생성
              </PS.Btn>
            </div>
          </div>
        </PS.BucketlistContent>
      )}
      {/* 생성 버튼 */}
      {isPost.isEditMode && (
        <PS.BucketlistCreate
          onClick={() => {
            handleBucketlistCreate();
          }}
        >
          <PS.Btn className="create createSimple">
            <BsPlusCircleDotted size={30} />
          </PS.Btn>
        </PS.BucketlistCreate>
      )}
    </PS.BucketlistBox>
  );
};

export default SimpleMode;
