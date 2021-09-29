import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

const getTimeString = (unixtime: number) => {
     const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([],{month:'2-digit',day:'2-digit'})} ⏱${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}`;

};

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


const onEvent = (e : any) => {
  console.log(e.type,"", e);
};

  return (
        <div style={{width:"70vw"}} className="mx-auto">
     <h2 className="text-center my-4"><b>Contacts</b>📞</h2>
{/* 버튼    <div className="d-flex justify-content-start">*/}
   <div className="d-flex justify-content-end">
         <div>
            <button
            type="button"
            className="btn btn-primary text-nowrap btn-sm"
          >
            <i className="bi bi-person-dash-fill me-2"></i>
            삭제
          </button>
   </div>
    <div>
            <button
            type="button"
            className="btn btn-dark text-nowrap btn-sm  mx-2"
            onClick={() => {
            history.push("/contacts/create");
            }}
          >
            <i className="bi bi-person-plus-fill me-2"></i>
            추가
          </button>
          </div>
         <div className="d-flex justify-content-end">
         <select
          className="form-select form-select-sm"
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
*/}</div>
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
<td className="p-2">
  <input
  className="checkbox mt-1"
  style={{ zoom:1.3 }}
  type="checkbox"
  onChange={onEvent}
  />
</td>
{/*
          <td className="text-center">❤{item.select}</td> 
*/}
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