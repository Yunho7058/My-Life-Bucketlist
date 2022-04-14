import { useDispatch, useSelector } from 'react-redux';
import { increaseNum, deceaseNum, is } from '../redux/action/testActions';
import { TypeRootReducer } from '../redux/store/store';

function ReduxTest() {
  const state = useSelector((state: TypeRootReducer) => state.testReducer);
  // console.log(useSelector((state) => state)); {AReducer: {…}, testReducer: Array(3), isReducer: false}
  const stateIs = useSelector((state: TypeRootReducer) => state.isReducer);
  //console.log(stateIs, '수정');
  const dispatch = useDispatch();
  return (
    <>
      <div style={{ margin: '10px' }}>
        {state.map((el) => (
          <div key={el.id}>
            <div style={{ fontSize: '40px' }}>{el.name}</div>
            <div style={{ fontSize: '40px' }}>
              {el.quantity}
              <button
                style={{ margin: '1px', fontSize: '30px', width: '30px' }}
                onClick={() => {
                  dispatch(increaseNum(el.id));
                }}
              >
                +
              </button>
              <button
                style={{ margin: '1px', fontSize: '30px', width: '30px' }}
                onClick={() => {
                  dispatch(deceaseNum(el.id));
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}

        <div style={{ margin: '20px', fontSize: '40px' }}>
          {`${stateIs}`}
          <button
            onClick={() => {
              dispatch(is());
            }}
          >
            로그인 하기
          </button>
        </div>
      </div>
    </>
  );
}

export default ReduxTest;
