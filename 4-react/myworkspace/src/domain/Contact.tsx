import { useRef, useState } from "react";
import produce from "immer";
import { isTemplateTail } from "typescript";

interface ContactState {
  id: number;
  txtName: string | undefined;
  txtContact?: number | string ;
  txtEmail?: string | undefined;
  isEdit?: boolean;
}

const Contact = () => {
  const [ContactTable, setContactTable] = useState<ContactState[]>([
    {id:1, txtName:"ex)박이슬",txtContact:"010-3191-6946",txtEmail:"angela@gmail.com"}
  ]);

const inputRef = useRef<HTMLInputElement>(null);
const inputRef1 = useRef<HTMLInputElement>(null);
const inputRef2 = useRef<HTMLInputElement>(null);
const inputRef3 = useRef<HTMLInputElement>(null);
const formRef = useRef<HTMLFormElement>(null);
const tableRef = useRef<HTMLTableElement>(null);

const add = () => {
     const contact: ContactState = {
      id: ContactTable.length > 0 ? ContactTable[0].id + 1 : 1,
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
}
  
  const save = (id:number, index?:number) => {
    const input = tableRef.current?.querySelectorAll("input")[0];
//    const inputRef1 = tableRef.current?.querySelectorAll("input")[0];

     setContactTable(
       ContactTable.map((item) => {
         if (item.id === id) {
          item.txtName = inputRef1.current?.value;
          item.txtContact = inputRef2.current?.value;
          item.txtEmail = inputRef3.current?.value;
          item.isEdit = false;
         }

         return item;
       })
     );

     {/*immer사용
         setContactTable(
       produce((state) => {
         const item = state.find((item) => item.id === id);
         if (item) {
          item.txtName = inputRef1.current?.value;
          item.txtContact = inputRef2.current?.value;
          item.txtEmail = inputRef3.current?.value;
          item.isEdit = false;
         }
       })
     )
    
    */}

    };


  return (
        <div style={{width:"70vw"}} className="mx-auto">
     <h2 className="text-center my-4">연락처 관리😃 (inline수정 작업중)</h2>
     <form
      id="form-input"
      className="form-control d-flex border border-0 mx-auto"
      ref={formRef}>
      <input
        type="text"
        className="me-1"
        placeholder="이름"
        //style={{width: '140px'}}
          ref={inputRef1}/>
      <input
        type="tel"
        className="me-1"
        placeholder="전화번호"
        //style={{width: '140px'}}
          ref={inputRef2}/>
      <input
        type="email"
        className="me-2"
        placeholder="이메일"
        //style={{width: '140px'}}
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

    <table className="table table-striped mt-4" ref={tableRef} >
      <thead className="display-flex;">
        <tr>
          <th>#</th>
          <th>이름</th>
          <th>전화번호</th>
          <th>이메일</th>
          <th>수정/저장</th>
          <th>삭제/취소</th>
        </tr>
      </thead>

      <tbody className="tbody">
{ContactTable.map((item, index) => (
 <tr key={item.id} className="display-flex">
          <td className="text-center">👨🏻‍💼</td>
           {!item.isEdit && (<td>{item.txtName}</td>)}
            {item.isEdit && (<td>
              <input type="text" defaultValue={item.txtName} /></td>)}
          {!item.isEdit && (<td>{item.txtContact}</td>)}
            {item.isEdit && (<td>
              <input type="text" defaultValue={item.txtContact} /></td>)}       
          {!item.isEdit && (<td>{item.txtEmail}</td>)}
            {item.isEdit && (<td>
              <input type="text" defaultValue={item.txtEmail} /></td>)}          
          
          {!item.isEdit && (<td className="text-center">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  edit(item.id, true);
                }}>수정</button>
          </td>)}
          {!item.isEdit && (<td className="text-center">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  del(item.id, index);
                }}>삭제</button>
          </td>)}
          {item.isEdit && (<td className="text-center">
            <button className="p-1"
          style={{margin: 'auto'}}
          onClick={() => {
                  save(item.id, index);
                }}>저장</button>
          </td>)}
          {item.isEdit && (<td className="text-center">
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

export default Contact;