// interface : 객체구조의 형식
/*
interface 타입명 {
  속성명 : 타입; 
  속성명 : 타입; 
}
*/

interface User {
  firstname : string;
  lastname? : string; //속성명?, optional속성 (줄수도있고 안줄수도있는.필수값이 아님)
};

function printNames(obj){
  console.log(obj.firstname + "" + obj.lastname) //obj라는 변수가 객체타입이라 .찍고 나옴
}


// 타입명[]
// number[], string[], 
function printNames(obj: User){
  for (let obj of arr) {
  console.log(obj.firstname + "" + obj.lastname) //obj라는 변수가 객체타입이라 .찍고 나옴
}
}

const user : user = {
  firstname : "John",
  //lastname:"Smith",
};


const users : User[] = [
  {firstname: "John", lastname:"Smith"},
  {firstname: "Gildong", lastname:"Hong"},
];


printName(user);
printNames(users);