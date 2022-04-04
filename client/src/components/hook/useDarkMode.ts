import { useEffect, useState } from 'react';

/*
참고 블로그 : https://egg-programmer.tistory.com/272
custom hook
React의 함수형 컴포넌트에서는 컴포넌트 로직을 재사용 가능한 함수 인 custom hook을 직접 만들어 사용할 수 있습니다.
함수명에 use 키워드를 붙이면 React가 자동으로 hook으로 인식하여 사용할 수 있습니다.
useDarkMode
useDarkMode의 역할은 현재 테마와 테마를 변경하고 localStorage에 저장해 주는 함수를 반환해 주어 바로 쓸 수 있게 하는 것입니다.

두 개의 반환하는 값을 배열로 하기 위해 아래와 같이 타입을 선언합니다.

export const useDarkMode = (): [string, () => void] => {};
Copy to clipboard
useState를 활용해 theme의 초기값을 light로 설정합니다. useState에서 theme는 테마 값을 저장합니다.

useState에서 setTheme를 통해 테마를 바꿔 줄 수 있습니다.

토글을 클릭할 때마다 테마가 변경되어야 하므로 현재 테마에 따라서 반대로 테마를 바꿔 주는 분기 처리를 진행합니다.

const [theme, setTheme] = useState("light");
const toggleTheme = () => {
  if (theme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
Copy to clipboard
테마를 변경하면서 사용자가 지정한 테마로 유지시키기 위해 로컬 스토리지에 테마도 바뀔 수 있도록 지정해야 합니다.
window.localStorage 키워드를 통해 로컬스토리지에 접근할 수 있습니다.
setItem으로 key, value 값을 아래와 같이 지정하여 toggleTheme의 분기문 안에 넣습니다.
window.localStorage.setItem("theme", "light");
Copy to clipboard
여기서 초기값을 localStorage에 저장된 값으로 바꿔 주면 새로고침하거나 창을 닫게 되도 사용자가 지정한 테마 모드로 저장할 수 있습니다.
const localTheme = window.localStorage.getItem("theme");
const initialState = localTheme ? localTheme : "light";
const [theme, setTheme] = useState(initialState);
Copy to clipboard
4. custom hook을 사용하여 토글 버튼 생성
토글 컴포넌트 생성
아래와 같이 라이트/다크 모드가 변경되는 토글 버튼을 생성합니다.
Wrapper에 현재 테마 모드를 넣어 스타일이 그에 맞게 보이도록 하고, 클릭 이벤트를 걸어 클릭하면 테마가 바뀌도록 합니다.
*/

export const useDarkMode = (): [string, () => void] => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, toggleTheme];
};
