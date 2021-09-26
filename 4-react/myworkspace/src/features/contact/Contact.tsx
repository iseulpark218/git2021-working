import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./contactSaga";

const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([],{month:'2-digit',day:'2-digit'})} ⏱${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}`;
}
// 하루 지나면 월/일 표시하게
// 하루 안지나면 시간만 표시하게

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

    <div className="d-flex justify-content-end mb-2">
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

    <table className="table table-striped mt-4 table table-hover">
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
          <td className="text-center">{item.select}</td> 
            <td 
            style={{ cursor: "pointer" }}
             onClick={()=> {
              history.push(`/contacts/detail/${item.id}`);
            }}
            >{item.txtName}</td>
             <td>{item.txtContact}</td>       
            <td>{item.txtEmail}</td>
            <td>{getTimeString(item.createTime)}</td>
        </tr>
))}
      </tbody>
    </table>  
    </div>
  );
};

export default Contact;