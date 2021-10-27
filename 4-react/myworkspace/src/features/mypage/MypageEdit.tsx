import { useParams } from "react-router-dom";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
//import { MypageItem } from "./mypageSlice";
//import { modifyMypage } from "./mypageSlice";

import { requestModifyMypage } from "./mypageSaga";

const MypageEdit = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams<{ id: string }>();

  const MypageItem = useSelector((state: RootState) =>
    state.mypage.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.photo.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    console.log("--isEditcompleted 변경: ");

    //------------여기 경로 다시확인15:42
    isModifyCompleted && history.push("/mypages");
  }, [isModifyCompleted, history]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSaveClick = () => {
    if (MypageItem) {
      const item = { ...MypageItem };
      item.select = selectRef.current?.value;
      item.txtName = inputRef1.current?.value;
      // item.txtEmail = inputRef2.current?.value;
      item.txtEmail = inputRef3.current?.value;
      item.memo = memo.current?.value;

      // dispatch(requestModifyMypage(item));
      //dispatch(modifyMypage(item));
      history.push("/mypages");
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Mypage Edit ✍🏻</h2>
      <form className="mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <th>성별</th>
              <td className="text-center">
                <select
                  className="py-1 d-flex"
                  ref={selectRef}
                  defaultValue={MypageItem?.select}
                >
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
                  placeholder="이름을 수정합니다."
                  defaultValue={MypageItem?.txtName}
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
                  placeholder="전화번호를 수정합니다."
                  defaultValue={MypageItem?.txtEmail}
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
                  placeholder="이메일을 수정합니다."
                  defaultValue={MypageItem?.txtEmail}
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
                  placeholder="메모를 수정합니다."
                  defaultValue={MypageItem?.memo}
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
          className="btn btn-light border border-2 btn-sm p-2  float-start"
          onClick={() => {
            history.push("/mypages");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark btn-sm p-2  float-end"
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

export default MypageEdit;
