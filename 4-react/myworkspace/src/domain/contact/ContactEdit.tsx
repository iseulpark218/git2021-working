import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../store";
import { modifyContact } from "./contactSlice";

const ContactEdit = () => {

    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);
    const memo = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams<{ id : string } >();

  const ContactItem = useSelector((state: RootState) => state.contact.data.find((item) => item.id === +id));

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSaveClick = () => {

if (ContactItem){
     const item = {...ContactItem}
     item.select = selectRef.current?.value;      
     item.txtName = inputRef1.current?.value;
        item.txtContact = inputRef2.current?.value;
        item.txtEmail = inputRef3.current?.value;
        item.memo = memo.current?.value;
       
        dispatch(modifyContact(item));
        history.push("/contact");
  }
  };
 

  return (
    <div style={{width:"40vw"}} className="mx-auto">
     <h2 className="text-center my-4 mb-5">Contact Edit ✍🏻</h2>
     <form className="mx-auto">

    <table className="table">
<tbody>
<tr>
          <th>성별</th>
          <td className="text-center">
          <select
          className="py-1 d-flex"
          ref={selectRef}
          defaultValue={ContactItem?.select}
           >
            <option value="👨🏻‍💼">👨🏻‍💼</option>
            <option value="👩🏻‍💼">👩🏻‍💼</option>
          </select>
          </td>
</tr>


         <tr>
          <th>이름</th>
               <td> <input
        type="text"
        className="form-control"
        placeholder="이름을 수정합니다."
        defaultValue={ContactItem?.txtName}
          ref={inputRef1}/>
      </td>
      </tr>

      <tr>
          <th>전화번호</th>
     <td> <input
        type="tel"
        className="form-control"
        placeholder="전화번호를 수정합니다."
        defaultValue={ContactItem?.txtContact}
          ref={inputRef2}/>
      </td>
      </tr>

      <tr>
            <th>이메일</th>
     <td> <input
        type="email"
        className="form-control"
        placeholder="이메일을 수정합니다."
        defaultValue={ContactItem?.txtEmail}
          ref={inputRef3}/>
        </td>
        </tr>

        <tr>
            <th>메모</th>
     <td> <textarea
        className="form-control"
        placeholder="메모를 수정합니다."
        defaultValue={ContactItem?.memo}
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
            history.push("/contact");
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

  )
}


export default ContactEdit;