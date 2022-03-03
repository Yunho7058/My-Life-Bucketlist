'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
// provider 사용 시 그안에 있는 componunt는 state 공유 가능
// const store = createStore(() => {
//   return [
//     { id: 1, name: '멋진신발', quan: 2 },
//     { id: 2, name: '옷', quan: 5 },
//     { id: 3, name: 'Flex 신발', quan: 1 },
//     { id: 4, name: '양산형 후드티', quan: 17 },
//   ];
// });
// store state 관리 함수, return 문안 state 초기값
//* 위 함수들은 처음 배울때
//* 아래 함수들이 기본 틀
// let stateDefault = [
//   { id: 1, name: '멋진신발', quan: 2 },
//   { id: 2, name: '옷', quan: 5 },
//   { id: 3, name: 'Flex 신발', quan: 1 },
//   { id: 4, name: '양산형 후드티', quan: 17 },
// ];

let isModal = false;

//인자 state = stateDefault 는 ES6 신문법 state 다른 값이 안들어오면 default 값으로 stateDfault 값이 들어옴
//reducer 함수는 state를 뱉는 함수
// function reducer(state = stateDefault, action) {
//   let copy = [...state];
//   if (action.type === 'quanUp') {
//     copy[0].quan++;
//     return copy;
//   } else if (action.type === 'quanDown' && copy[0].quan > 0) {
//     copy[0].quan--;
//     return copy;
//   } else {
//     return state;
//   }
// }

function reducer(state = isModal, action) {
  if (action.type === '닫기') {
    return !state;
  } else if (action.type === '열기') {
    return !state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
