import { useSelector } from 'react-redux';
import { BsPlusCircleDotted } from 'react-icons/bs';
import TypeRedux from '../../redux/reducer/typeRedux';
import { TypeRootReducer } from '../../redux/store/store';
import * as PS from '../style/PostStyledComponents';
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
}

const DetailMode = ({
  isPost,
  handleInputItem,
  handleDelete,
  handleEdit,
  handleBucketlistCreate,
  handleInputNewItem,
  newBucketlist,
  handleNewBucketlist,
}: TypeProps) => {
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );
  return (
    <PS.BucketlistBox>
      {/* 상세 보기,편집 on */}
      {statePost.bucketlist.map((el, idx) => {
        return (
          <PS.BucketlistView key={el.id}>
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
                    />
                    <PS.TextArea
                      placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                      onChange={handleInputItem('detail')}
                      maxLength={100}
                      name={el.detail}
                      id={`${el.id}`}
                      value={el.detail}
                    >
                      {el.detail}
                    </PS.TextArea>
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
              <>
                {/* 상세 보기,편집 off */}
                <div>
                  <PS.BucketlistImg />
                  {/* //이미지 경로 설정 */}
                  <PS.BucketlistContent>
                    <div className="content">
                      {idx + 1}. {el.content}
                    </div>
                    <div>{el.detail}</div>
                  </PS.BucketlistContent>
                </div>
              </>
            )}
          </PS.BucketlistView>
        );
      })}
      {/* 생성 박스 */}
      {isPost.isCreate && isPost.isEditMode && (
        <>
          <PS.BucketlistView>
            <div>
              <PS.BucketlistImg />
              <PS.BucketlistContent>
                <PS.InputBox
                  placeholder="버킷리스트를 작성해주세요"
                  value={newBucketlist.content}
                  onChange={handleInputNewItem('content')}
                />
                <PS.TextArea
                  placeholder="내용을 작성해주세요. 100이내로 작성해주세요."
                  onChange={handleInputNewItem('detail')}
                  maxLength={100}
                  value={newBucketlist.detail}
                ></PS.TextArea>
              </PS.BucketlistContent>
            </div>
            <div>
              <PS.Btn
                className="createBtn"
                onClick={() => {
                  handleNewBucketlist();
                }}
              >
                생성
              </PS.Btn>
            </div>
          </PS.BucketlistView>
        </>
      )}
      {/* 생성 버튼 */}
      {isPost.isEditMode && (
        <PS.BucketlistCreate
          onClick={() => {
            handleBucketlistCreate();
          }}
        >
          <PS.Btn className="create">
            <div>버킷리스트 추가</div>
            <BsPlusCircleDotted size={40} />
          </PS.Btn>
        </PS.BucketlistCreate>
      )}
    </PS.BucketlistBox>
  );
};

export default DetailMode;
