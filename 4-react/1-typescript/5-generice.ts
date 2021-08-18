// generic : 제너릭, 제네릭, 쥐네릭
// 타입 매개변수
function identity<Type>(arg: Type): Type{
  return arg;
}

// 다양한 타입에 따라서 실행 처리를 다르게 하기 위함
// 예) number면 숫자를 덧셈함
// 예) string이면 문자열을 구분자로 결합함



let output1 = identity<string>{"Typescript"};
let output2 = identity<string>(1);
