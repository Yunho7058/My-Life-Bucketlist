import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { TypeRootReducer } from '../redux/store/store';
import { modalClose } from '../redux/action';

export const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  z-index: 000;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalBox = styled.div`
  width: 300px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  height: 200px;
  background-color: ${({ theme }) => theme.mode.background2};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const ModalText = styled.div`
  padding: 30px;
  font-size: 22px;
  text-align: center;
  letter-spacing: 1px;
  word-spacing: 1px;
  line-height: 30px;
`;
export const ModalBtnBack = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const ModalBtn = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  width: 40%;
  height: 50px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 50px;
  z-index: 991;
  cursor: pointer;
  &:hover {
    background-color: #6495ed;
  }
`;

//모달창 구현시 참고

const Modal = () => {
  const stateModal = useSelector((state: TypeRootReducer) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalClose());
  };

  return (
    <>
      {stateModal.show && (
        <ModalBack>
          <ModalBox>
            <ModalText>{stateModal.msg}</ModalText>
            <ModalBtnBack>
              <ModalBtn onClick={() => handleClose()}>확인</ModalBtn>
            </ModalBtnBack>
          </ModalBox>
        </ModalBack>
      )}
    </>
  );
};

export default Modal;
