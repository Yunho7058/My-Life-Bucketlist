//components
import Main from './page/Main';

function App() {
  return (
    <div className="App">
      <Main></Main>
    </div>
  );
}

/*
prop에 오브젝트 형식으로{name : '윤호'} 들어옴 타입지정하기
const Good = (prop:{name:string}) =>{
  return(
    <div>
      하위 컴포넌트! 안녕 난 {prop.name}
    </div>
  )
}
let 박스:JSX.IntrinsicElements['h4'] = <div>안녕</div>
let 박스1:JSX.Element = <div>안녕2</div>
useState 타입 지정법
알아서 타입 지정 해준다 만약 저 'kim'에 문자,숫자 들어온다면
거의 그럴일은 없지만 강제로 let [song,setSong] = useState<string | number>('kim') 제네링 기법
*/

export default App;
