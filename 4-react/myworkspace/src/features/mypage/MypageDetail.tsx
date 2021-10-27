import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestRemoveMypage } from "./mypageSaga";

//import { useRef } from "react";

const MypageDetail = () => {
  const { id } = useParams<{ id: string }>();

  const mypageItem = useSelector((state: RootState) =>
    state.mypage.data.find((item) => item.id === +id)
  );

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.mypage.isRemoveCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  useEffect(() => {
    isRemoveCompleted && history.push("/mypages");
  }, [isRemoveCompleted, history]);

  const handleAddClick = () => {
    dispatch(requestRemoveMypage(+id));
    history.push("/mypages");
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Mypage Detail 📃</h2>
      <form className="mx-auto">
        {mypageItem && (
          <table className="table">
            <tbody>
              <tr>
                <th>성별</th>
                <td>{mypageItem.select}</td>
              </tr>
              <tr>
                <th>이름</th>
                <td>{mypageItem.txtName}</td>
              </tr>

              <tr>
                <th>전화번호</th>
                <td>{mypageItem.txtEmail}</td>
              </tr>

              <tr>
                <th>이메일</th>
                <td>{mypageItem.txtEmail}</td>
              </tr>

              <tr>
                <th>메모</th>
                <td>{mypageItem.memo}</td>
              </tr>
            </tbody>
          </table>
        )}
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
          className="btn btn-dark btn-sm p-2 float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-trash me-1"></i>
          삭제
        </button>

        <button
          className="btn btn-warning btn-sm p-2 float-end me-1"
          onClick={() => {
            history.push(`/mypages/edit/${id}`);
          }}
        >
          <i className="bi bi-pencil-square me-1"></i>
          <b>수정</b>
        </button>
      </div>
    </div>
  );
};

export default MypageDetail;
