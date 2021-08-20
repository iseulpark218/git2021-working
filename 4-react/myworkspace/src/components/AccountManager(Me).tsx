// 계좌관리

// 버튼: 입금버튼, 출금버튼
// 버튼 클릭시에 입금 금액 또는 출금 금액을 입력 받을 수 있음.

// 목록: 입금, 출금액 목록을 ul > li로 표시한다.
// 입금 금액은 <li> 입금: 금액 (녹색)</li> 으로 표시
// 출금 금액은 <li> 출금: -금액 (빨간색)</li> 으로 표시

// 잔액: 잔액을 입금, 출금 버튼 우측에 표시한다.

import { useState } from "react";

/*
const ListItem = ({ key, num }: { key: number; num: number }) => {
  const color = num < 0 ? "red" : "green";
  return (
    <li key={key} style={{ color: color }}>
      {num}
    </li>
  );
};
*/


const AccountManager = () => {
  const [result, setResult] = useState(0);
  const accountManager = () => {
    const btn_in = prompt("입금 금액을 입력하시오.");
    const btn_out = prompt("출금 금액을 입력하시오.");
    const sum = prompt("연산자, (+, -, *, /)");
    //console.log(`${in}${sum}${in}`);
    setResult(eval(`${btn_in}${sum}${btn_out}`));
   };
  return(
    <div>
      <h2>AccountManager</h2>
      <button
        onClick={() => {
          accountManager();
        }}
      >
        입금
      </button>
            <button
        onClick={() => {
          accountManager();
        }}
      >
        출금
      </button>
      <div>{numbers}</div>
      <ul>
        {
          numbers.map(
            (num, index) => (
              <ListItem key={index} num={num} />
            )

          )
        }
      </ul>
    </div>
  );
};

export default AccountManager;

