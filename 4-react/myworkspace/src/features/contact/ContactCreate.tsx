import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { addContact, ContactItem } from "./contactSlice";

const ContactCreate = () => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);
    const memo = useRef<HTMLTextAreaElement>(null);


  const contactData = useSelector((state: RootState) => state.contact.data);
    
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSaveClick = () => {

     const item: ContactItem = {
      id: contactData.length > 0 ? contactData[0].id + 1 : 1,
      select : selectRef.current?.value,
      txtName : inputRef1.current?.value,
      txtContact : inputRef2.current?.value,
      txtEmail : inputRef3.current?.value,
      memo : memo.current?.value,
      createTime: new Date().getTime(),

    };

        dispatch(addContact(item));
        history.push("/contact");

    // formRef.current?.reset(); 
  }

return (
 <div style={{width:"40vw"}} className="mx-auto">
     <h2 className="text-center my-4 mb-5">Contact Create 📃</h2>
     <form className="mx-auto">
    <table className="table" >
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
               <td> <input
        type="text"
        className="form-control"
        placeholder="이름"
          ref={inputRef1}/>
      </td>
      </tr>

      <tr>
          <th>전화번호</th>
     <td> <input
        type="tel"
        className="form-control"
        placeholder="전화번호"
          ref={inputRef2}/>
      </td>
      </tr>

      <tr>
            <th>이메일</th>
     <td> <input
        type="email"
        className="form-control"
        placeholder="이메일"
          ref={inputRef3}/>
        </td>
        </tr>

        <tr>
            <th>메모</th>
     <td> <textarea
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
            history.push("/contact");
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
)
}

export default ContactCreate;