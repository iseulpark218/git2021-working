import { useRef, useState } from "react";
import { isTemplateExpression } from "typescript";
import Alert from "./base/Alert";

interface FeedState {
  id : number,
  content? : string | undefined;
  dataUrl? : string | undefined;
  createTime : number;
}


const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
}

const Feed = () => {

  const [feedList, setFeedList] = useState<FeedState[]>([
   { id: 3, dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433153042271822.jpg", content: "content3", createTime: new Date().getTime() },
    { id: 2,dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433155487351312.jpg", content: "content2", createTime: new Date().getTime() },
    { id: 1,dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433155488913823.jpg", content: "content1", createTime: new Date().getTime() },
  ]);


const [isError, setIsError] = useState(false);

const formRef = useRef<HTMLFormElement>(null);
const textAreaRef = useRef<HTMLTextAreaElement>(null);
const fileRef = useRef<HTMLInputElement>(null);


//(재점검) add에 e:React 넣고, 게시 Alert 추가


const add = () => {

if(fileRef.current?.files?.length){
  const file = fileRef.current?.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
const DataUrl = reader.result;

  };
}

  const feed : FeedState = {
    id:feedList.length >0 ? feedList[0].id +1 : 1,
    content : textAreaRef.current?.value,
    dataUrl : fileRef.current?.value,
    createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

    //(검토중) textarea or 파일선택 시, 게시Alert나오게 수정하기..
   formRef.current?.reset();

   //(검토중) 에러 메시지 제거
    setIsError(false);
  }

 const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };


  return (<>
      <h1 className="text-center mt-4">Feed</h1>
    <form className="d-flex flex-column mt-5"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}>

      <textarea
        className="form-control mb-1"
        placeholder="👉🏻 Leave a post here 👈🏻"
        ref={textAreaRef}      
      ></textarea>

      <div className="d-flex mt-1" > 
        <input
          type="file"
          className="form-control me-1 pb-1"
          accept="image/png, image/jpeg, video/mp4"
          ref={fileRef} 
        />
        <button
          className="btn btn-dark text-nowrap btn-sm"
          type="button"
          onClick={() => {
            add();
          }}
        >
          입력
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

    <div id="content" className="mt-3" >

{/*하나의 feed Div*/}
    {feedList.map((item, index) => (
      <div className="card my-3" key={item.id}>
        <img className="card-img-top" src={item.dataUrl}/>

{/*text,시간,삭제버튼을 감싼 feed Div*/}

    <div className="card-body border border-4"> {/*border로 div 임시표시*/}

<p className="card-text mt-3">
  
      <span className="me-1">{item.content}</span><br></br><br></br>

 {/*시간표시map*/}
      <span
      // style={{fontSize:0.75}}
      className="fs-6 text-decoration-underline text-muted">
        {getTimeString(item.createTime)}
      </span>
    
      <a href="#"
      className="link-secondary fs-6 float-end remove"
      onClick={() => {
                  del(item.id);
                }}>삭제</a>
</p>

    </div>
    </div>
    
    ))}

    </div>

  </>
  )
};

export default Feed;