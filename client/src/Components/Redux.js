import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
// react 받아오는건 다 {} 표시
// props 사용안할때, state상태관리

function ReduxTest(props) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {/* {props.state.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.quan}</td>
              <td>
                <button
                  onClick={() => {
                    props.dispatch({ type: 'quanUp' });
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    props.dispatch({ type: 'quanDown' });
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
      <br></br>
      {props.state ? (
        <button
          onClick={() => {
            props.dispatch({ type: '열기' });
          }}
        >
          광고 다시보기
        </button>
      ) : (
        <div>
          <div>지금 회원가입시 20% 할인!!</div>
          <button
            onClick={() => {
              props.dispatch({ type: '닫기' });
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
//* dispatch 실행 하는 함수(매소드)
//* state를 사용 하는 함수(redux)
function stateGet(state) {
  return {
    state: state,
  };
}

//* state를 사용 하는 함수를 연결?(redux)
export default connect(stateGet)(ReduxTest);

//export default ReduxTest;
