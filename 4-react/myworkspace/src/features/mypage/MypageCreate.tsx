import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { MypageItem } from "./mypageSlice";
//import { addMypage } from "./mypageSlice";

import { requestAddMypage } from "./mypageSaga";

const MypageCreate = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  //    const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  const mypageData = useSelector((state: RootState) => state.mypage.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.mypage.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    // true이면 화면이동

    //------------여기 경로 다시확인15:42
    isAddCompleted && history.push("/mypages");
  }, [isAddCompleted, history, dispatch]);

  const handleSaveClick = () => {
    const item: MypageItem = {
      id: mypageData.length > 0 ? mypageData[0].id + 1 : 1,
      select: selectRef.current?.value,
      txtName: inputRef1.current?.value,
      txtMypage: inputRef2.current?.value,
      txtEmail: inputRef3.current?.value,
      memo: memo.current?.value,
      createdTime: new Date().getTime(),
    };
    dispatch(requestAddMypage(item));
    // dispatch(addMypage(item));
    history.push("/mypages");

    /* 윗줄 추가하고 잠깐 임시로
// ----- 기존 redux action -----
dispatch(addMypage(item));
        history.push("/mypages");
*/
    // formRef.current?.reset();
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Mypage Create 📃</h2>
      <form className="mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <th>성별</th>
              <td>
                <select className="py-1" ref={selectRef}>
                  <option value="👨🏻‍💼">👨🏻‍💼</option>
                  <option value="👩🏻‍💼">👩🏻‍💼</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="이름"
                  ref={inputRef1}
                />
              </td>
            </tr>

            <tr>
              <th>전화번호</th>
              <td>
                {" "}
                <input
                  type="tel"
                  className="form-control"
                  placeholder="전화번호"
                  ref={inputRef2}
                />
              </td>
            </tr>

            <tr>
              <th>이메일</th>
              <td>
                {" "}
                <input
                  type="email"
                  className="form-control"
                  placeholder="이메일"
                  ref={inputRef3}
                />
              </td>
            </tr>

            <tr>
              <th>메모</th>
              <td>
                {" "}
                <textarea
                  className="form-control"
                  placeholder="메모"
                  style={{ height: "40vh" }}
                  ref={memo}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="mt-3">
        <button
          className="btn btn-light border border-2 btn-sm p-2 float-start"
          onClick={() => {
            history.push("/mypages");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark float-end btn-sm p-2"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-save me-1"></i>
          저장
        </button>
      </div>
    </div>
  );
};

export default MypageCreate;
