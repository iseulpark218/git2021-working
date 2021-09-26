import {useParams} from "react-router-dom";

//import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { removeContact } from "./contactSlice";


const ContactDetail = () => {
  const { id } = useParams<{ id : string } >();

  const ContactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );


  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleAddClick = () => {
        dispatch(removeContact(+id));
        history.push("/contacts");
  };

  return (
    <div style={{width:"40vw"}} className="mx-auto">
     <h2 className="text-center my-4 mb-5">Contact Detail 📃</h2>
     <form className="mx-auto">
    {ContactItem && (
    <table className="table">
<tbody>
         <tr>
          <th>성별</th>
          <td>{ContactItem.select}</td>
      </tr>
       <tr>
          <th>이름</th>
      <td>{ContactItem.txtName}</td>
      </tr>

      <tr>
          <th>전화번호</th>
     <td>{ContactItem.txtContact}</td>
      </tr>

      <tr>
            <th>이메일</th>
     <td>{ContactItem.txtEmail}</td>
        </tr>

        <tr>
            <th>메모</th>
     <td>{ContactItem.memo}</td>

        </tr>

      </tbody>
    </table>
    )}
  </form>

      <div className="mt-3">
        <button
          className="btn btn-light border border-2 btn-sm p-2 float-start"
          onClick={() => {
            history.push("/contacts");
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
              history.push(`/contacts/edit/${id}`);
            }}
       >
         <i className="bi bi-pencil-square me-1"></i>
          <b>수정</b>
        </button>
        
      </div>

</div>

  )
}

export default ContactDetail;