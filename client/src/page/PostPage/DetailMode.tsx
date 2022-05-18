import { useSelector } from 'react-redux';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import TypeRedux from '../../redux/reducer/typeRedux';
import { useRef, useState } from 'react';
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
  paginationStart: number;
  paginationEnd: number;
  onLoadFile: (e: { target: HTMLInputElement }) => void;
  handleImgDelete: (id: number) => void;
  bucketlistSelect: number;
  handleBucketlistSelect: (id: number) => void;
  newImgUrl: string;
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
  paginationStart,
  paginationEnd,
  onLoadFile,
  handleImgDelete,
  bucketlistSelect,
  handleBucketlistSelect,
  newImgUrl,
}: TypeProps) => {
  const statePost: TypeRedux.TypePostData = useSelector(
    (state: TypeRootReducer) => state.postReducer
  );

  const potoInput = useRef<HTMLInputElement>(null);
  const handlePotoInput = () => {
    if (potoInput.current) {
      potoInput.current.click();
    }
  };

  return (
    <PS.BucketlistBox>
      {/*편집 on */}

      {statePost.bucketlist.length ? (
        statePost.bucketlist
          .slice(paginationStart, paginationEnd)
          .map((el, idx) => {
            return (
              <PS.BucketlistView key={el.id}>
                {statePost.owner && (
                  <AiFillEdit
                    size={30}
                    onClick={() => handleBucketlistSelect(el.id)}
                  ></AiFillEdit>
                )}
                {bucketlistSelect === el.id ? (
                  <>
                    <div>
                      {el.image_path ? (
                        <PS.PostPoto
                          alt="sample"
                          src={el.image_path}
                          onClick={() => handlePotoInput()}
                        />
                      ) : (
                        <PS.BucketlistImg onClick={() => handlePotoInput()}>
                          사진을 선택해주세요.
                        </PS.BucketlistImg>
                      )}

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
                          defaultValue={el.detail}
                        ></PS.TextArea>
                      </PS.BucketlistContent>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <PS.ImgUploadBack>
                        <PS.Btn
                          className="imgDelete"
                          onClick={() => handleImgDelete(el.id)}
                        >
                          사진 삭제하기
                        </PS.Btn>
                        <PS.ImgInput
                          type="file"
                          accept="image/*"
                          name="file"
                          id={`${el.id}`}
                          onChange={onLoadFile}
                          ref={potoInput}
                        />
                      </PS.ImgUploadBack>
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
                    {/* 편집 off */}
                    <div>
                      {el.image_path ? (
                        <PS.PostPoto
                          alt="sample"
                          src={el.image_path}
                          style={{ margin: 'auto' }}
                        />
                      ) : (
                        <PS.BucketlistImg>
                          사진을 선택해주세요.
                        </PS.BucketlistImg>
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
                  </>
                )}
              </PS.BucketlistView>
            );
          })
      ) : statePost.owner ? (
        <PS.BucketlistView>
          <div>
            {newImgUrl ? (
              <PS.PostPoto
                alt="sample"
                src={newImgUrl}
                onClick={() => handlePotoInput()}
              />
            ) : (
              <PS.BucketlistImg onClick={() => handlePotoInput()}>
                사진을 선택해주세요.
              </PS.BucketlistImg>
            )}

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
          <div
            style={{
              display: 'flex',
              width: '80%',
              justifyContent: 'flex-start',
            }}
          >
            <PS.ImgUploadBack>
              <PS.Btn className="imgDelete" onClick={() => handleImgDelete(0)}>
                사진 삭제하기
              </PS.Btn>
              <PS.ImgInput
                type="file"
                accept="image/*"
                name="file"
                id="new"
                onChange={onLoadFile}
                ref={potoInput}
              />
            </PS.ImgUploadBack>
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
      ) : (
        <div>수정</div>
      )}
      {/* 생성 박스 */}
      {isPost.isCreate && (
        <>
          <PS.BucketlistView>
            <div>
              {newImgUrl ? (
                <PS.PostPoto
                  alt="sample"
                  src={newImgUrl}
                  onClick={() => handlePotoInput()}
                />
              ) : (
                <PS.BucketlistImg onClick={() => handlePotoInput()}>
                  사진을 선택해주세요.
                </PS.BucketlistImg>
              )}

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
            <div
              style={{
                display: 'flex',
                width: '80%',
                justifyContent: 'flex-start',
              }}
            >
              <PS.ImgUploadBack>
                <PS.Btn
                  className="imgDelete"
                  onClick={() => handleImgDelete(0)}
                >
                  사진 삭제하기
                </PS.Btn>
                <PS.ImgInput
                  type="file"
                  accept="image/*"
                  name="file"
                  id="new"
                  onChange={onLoadFile}
                  ref={potoInput}
                />
              </PS.ImgUploadBack>
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
      {statePost.owner && (
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
