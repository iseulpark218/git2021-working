import { useRef, useState } from "react";
import produce from "immer";
import { isTemplateTail } from "typescript";

interface ContactState {
  id: number;
  select: string | undefined;
  txtName: string | undefined;
  txtContact?: number | string ;
  txtEmail?: string | undefined;
  isEdit?: boolean;
}

const ContactInlineEdit = () => {
  const [ContactTable, setContactTable] = useState<ContactState[]>([
    //{id:1, txtName:"ex)박이슬",txtContact:"010-3191-6946",txtEmail:"angela@gmail.com"}
  ]);

const inputRef = useRef<HTMLInputElement>(null);
const inputRef1 = useRef<HTMLInputElement>(null);
const inputRef2 = useRef<HTMLInputElement>(null);
const inputRef3 = useRef<HTMLInputElement>(null);
const formRef = useRef<HTMLFormElement>(null);
const tableRef = useRef<HTMLTableElement>(null);
const selectRef = useRef<HTMLSelectElement>(null);

const add = () => {
     const contact: ContactState = {
      id: ContactTable.length > 0 ? ContactTable[0].id + 1 : 1,
      select : selectRef.current?.value,
      txtName : inputRef1.current?.value,
      txtContact : inputRef2.current?.value,
      txtEmail : inputRef3.current?.value,
    };

    setContactTable([contact, ...ContactTable]);

    formRef.current?.reset(); 
  }

  const del = (id:number, index?:number ) => {

    setContactTable(ContactTable.filter((item) => item.id !== id));
}

  const edit = (id:number, mod:boolean ) => {
setContactTable(
       ContactTable.map((item) => {
         if (item.id === id) {
           item.isEdit = mod;
         }
         return item;
       })
     );
// 수정하고나서 추가 시 내용나오게... 수정은 되는데...
// 여기에 한줄 써주면 될거같은데..하..몇일째냐..
}
  
  const save = (id:number, index?:number) => {
    const input = tableRef.current?.querySelectorAll("input")[0];

     setContactTable(
       ContactTable.map((item) => {
         if (item.id === id) {
          item.select = selectRef.current?.value;
          item.txtName = inputRef1.current?.value;
          item.txtContact = inputRef2.current?.value;
          item.txtEmail = inputRef3.current?.value;
          item.isEdit = false;
         }

         return item;
       })
     );
    };


  return (
        <div style={{width:"70vw"}} className="mx-auto">
     <h2 className="text-center mx-5 my-4">연락처 관리😋</h2>
     
     <form
      id="form-input"
      className="form-control d-flex border border-0 mx-auto"
      ref={formRef}>
      <select className="me-2" ref={selectRef}>
        <option value="👨🏻‍💼">👨🏻‍💼</option>
        <option value="👩🏻‍💼">👩🏻‍💼</option>
      </select>
      
      <input
        type="text"
        className="form-control me-1"
        placeholder="이름"
          ref={inputRef1}/>
      <input
        type="tel"
        className="form-control me-1"
        placeholder="전화번호"
          ref={inputRef2}/>
      <input
        type="email"
        className="form-control me-2"
        placeholder="이메일"
          ref={inputRef3}/>
      <button
        type="button"
        className="btn btn-primary text-nowrap btn-sm"
        onClick={() => {
            add();
          }}
      >추가
      </button>
    </form>

    <table className="table table-striped table-hover mt-4" ref={tableRef} >
      <thead className="display-flex;">
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">이름</th>
          <th className="text-center">전화번호</th>
          <th className="text-center">이메일</th>
          <th className="text-center">수정/저장</th>
          <th className="text-center">삭제/취소</th>
        </tr>
      </thead>

      <tbody className="tbody">
{ContactTable.map((item, index) => (
 <tr key={item.id} className="display-flex">
          {!item.isEdit && (<td className="text-center">{item.select}</td>)}
          {item.isEdit && (
          <td className="text-center">
          <select className="me-2" ref={selectRef}>
            <option value="👨🏻‍💼">👨🏻‍💼</option>
            <option value="👩🏻‍💼">👩🏻‍💼</option>
          </select>
          </td> )}          
           {!item.isEdit && (<td className="text-center">{item.txtName}</td>)}
            {item.isEdit && (<td className="text-center">
              <input type="text" defaultValue={item.txtName} ref={inputRef1}/></td>)}
          {!item.isEdit && (<td className="text-center">{item.txtContact}</td>)}
            {item.isEdit && (<td className="text-center">
              <input type="text" defaultValue={item.txtContact} ref={inputRef2}/></td>)}       
          {!item.isEdit && (<td className="text-center">{item.txtEmail}</td>)}
            {item.isEdit && (<td className="text-center">
              <input type="text" defaultValue={item.txtEmail} ref={inputRef3}/></td>)}          
          
          {!item.isEdit && (<td className="text-center mx-1">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  edit(item.id, true);
                }}>수정</button>
          </td>)}
          {!item.isEdit && (<td className="text-center mx-5">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  del(item.id, index);
                }}>삭제</button>
          </td>)}
          {item.isEdit && (<td className="text-center mx-5">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  save(item.id, index);
                }}>저장</button>
          </td>)}
          {item.isEdit && (<td className="text-center mx-5">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  edit(item.id, false);
                }}>취소</button>
          </td>)}
        </tr>
))}
      </tbody>
    </table>  
    </div>
  );
};

export default ContactInlineEdit;