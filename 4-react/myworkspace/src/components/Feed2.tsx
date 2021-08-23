import { useRef, useState } from "react";
import { isTemplateExpression } from "typescript";
import Alert from "./base/Alert";

interface FeedState {
  id : number,
  content : string | undefined;
  createTime : number;
  modifyTime?: number;
  isEdit?: boolean;
}


const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
}

const Feed = () => {

  const [feedList, setFeedList] = useState<FeedState[]>([
  { id: 1, content: "content2", createTime: new Date().getTime() },
]);


const [isError, setIsError] = useState(false);



const formRef = useRef<HTMLFormElement>(null);
const textAreaRef = useRef<HTMLTextAreaElement>(null);

//(재점검) add에 e:React 넣고, 게시 Alert 추가
const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {

    if (e) {
      if (e.code !== "Enter") return;
    }

 {/*
    if (!fileRef.current?.files?.length) {
      const file = fileRef.current?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        post(reader.result?.toString(),file.type);
      }
       return;
    }
*/}

    if (!textAreaRef.current?.value) {
      setIsError(true);
      return;
    }
// 여기까지 추가함.. 



  const feed : FeedState = {
    id:feedList.length >0 ? feedList[0].id +1 : 1,
    content : textAreaRef.current?.value,
      createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

    // (재점검!!!!!!!!!!!) 입력값 초기화
    // 그리고!!! textarea or 파일선택 시, 게시Alert나오게.. 
   formRef.current?.reset();
    // (재점검) 에러 메시지 제거
    setIsError(false);

  }



  return (<>
      <h1 className="text-center mt-4">Feed</h1>
    <form className="d-flex flex-column mt-5"
        //ref={formRef}
        onSubmit={(e) => e.preventDefault()}>

      <textarea
        className="form-control mb-1 row"
        placeholder="👉🏻 Leave a post here 👈🏻"
        ref={textAreaRef}      
      ></textarea>

      <div className="d-flex mt-1"> {/* key={item.id}*/}
        <input
          type="file"
          className="form-control me-1 pb-1"
          accept="image/png, image/jpeg, video/mp4"
        />
        <button
          className="btn btn-dark text-nowrap btn-sm"
          type="button"
          onClick={() => {
            add(null);
          }}
        >
          게시
        </button>
      </div>

    </form>
{/*Alert*/}
      {isError && (
        <Alert
          message={"게시글을 입력하거나, 파일을 선택 해 주세요."}
          variant={"dark"}
          onClose={() => {
            setIsError(false);
          }}
        />
      )}



{/*feed전체Div*/}
    <div id="content" className="mt-3">

{/*하나의 feed Div*/}
      <div className="card my-3">
        <img className="card-img-top" src="./penguin.png" />

{/*text,시간,삭제버튼을 감싼 feed Div*/}
    <div className="card-body">

    {feedList.map((item) => (
      <p className="card-text mt-3">
      <span className="me-1">{item.content}</span>
</p>

))}

    {feedList.map((item) => (
      <span
      style={{fontSize:0.75}}
      className="align-bottom; fw-bold fs-6 text-decoration-underline">
        {getTimeString(item.modifyTime ? item.modifyTime : item.createTime)}
      </span> // 2021.08.23 오후 01:20 - yyyy.MM.dd.tt.hh.mm
     ))}

      <a href="#" className="link-secondary fs-6 float-end remove">삭제</a>
    </div>

    </div>
    </div>



  </>
  )
};

export default Feed ;