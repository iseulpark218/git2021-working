import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

const getTimeString = (unixtime: number) => {
     const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([],{month:'2-digit',day:'2-digit'})} ⏱ ${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}`;

};

/*
const getTimeString = (unixtime: number) => {
  // 1초: 1000
  // 1분: 60 * 1000
  // 1시간: 60 * 60 * 1000
  // 1일: 24 * 60 * 60 * 1000
  const day = 24 * 60 * 60 * 1000;

  // Locale: timezone, currency 등
  // js에서는 브라우저의 정보를 이용함
  const dateTime = new Date(unixtime);

  // 현재시간보다 24시간 이전이면 날짜를 보여주고
  // 현재시간보다 24시간 미만이면 시간을 보여줌
  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
}
-------------------------------------------------
const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([],{month:'2-digit',day:'2-digit'})} ⏱${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}`;
}
// 하루 지나면 월/일 표시하게
// 하루 안지나면 시간만 표시하게
*/

const Contact = () => {

  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
   // console.log(dispatch);
    if (!contact.isFetched) {
      dispatch(requestFetchContacts());
   }
  }, [dispatch, contact.isFetched]);

  return (
        <div style={{width:"70vw"}} className="mx-auto">
     <h2 className="text-center my-4"><b>Contacts</b>📞</h2>
    <div className="d-flex justify-content-end">
              <button
            type="button"
            className="btn btn-dark text-nowrap btn-sm p-2"
            onClick={() => {
            history.push("/contacts/create");
            }}
          >
            <i className="bi bi-person-plus-fill me-2"></i>
            추가
          </button>
    </div>
          {/* 버튼 */}
      <div className="d-flex justify-content-end mb-2">
         <select
          className="form-select form-select-sm mt-3"
          style={{ width: "60px" }}
          >
            <option>3</option>
            <option>5</option>
            <option>10</option>
        </select>
{/*
        <select
          className="form-select form-select-sm me-2"
          style={{ width: "60px" }}
          onChange={(e) => {
            handlePageSizeChanged(e);
          }}
        >
          {[2, 3, 6].map((size) => (
            <option value={size} selected={photo.pageSize === size}>
              {size}
            </option>
          ))}
        </select>
*/}
   </div>
    <table className="table table-striped table table-hover">
      <thead className="display-flex;">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Telephone</th>
          <th>Email</th>
          <th>Date Created</th>
        </tr>
      </thead>

      <tbody className="tbody">
{contact.data.map((item, index) => (
 <tr className="display-flex">
          <td className="text-center">❤{item.select}</td> 
            <td 
            style={{ cursor: "pointer" }}
             onClick={()=> {
              history.push(`/contacts/detail/${item.id}`);
            }}
            >{item.txtName}</td>
             <td>{item.txtContact}</td>       
            <td>{item.txtEmail}</td>
            <td>{getTimeString(item.createdTime)}</td>
        </tr>
))}
      </tbody>
    </table>
          {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
          <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
 {/*
        <Pagination
          blockSize={2} // 고정값
          totalPages={photo.totalPages}
          currentPage={photo.page}
          onPageChanged={handlePageChanged}
         />
*/}
      </div>
    </div>
  );
};

export default Contact;