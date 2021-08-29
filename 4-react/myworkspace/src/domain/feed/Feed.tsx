// 내꺼-파일첨부하는거
import { useRef, useState } from "react";
import { isTemplateExpression } from "typescript";
import Alert from "../../components/base/Alert";
import produce from "immer";

import FeedEditModal from "./FeedEditModal";
import { FeedState } from "./type";


const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
}

const Feed = () => {

  const [feedList, setFeedList] = useState<FeedState[]>([
     { id: 3, dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433153042271822.jpg", content: "memo3", createTime: new Date().getTime() },
     { id: 2, dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433155487351312.jpg", content: "memo2", createTime: new Date().getTime() },
    { id: 1, dataUrl:"http://tourimage.interpark.com/BBS/Tour/FckUpload/201404/6353433155488913823.jpg", content: "memo1", createTime: new Date().getTime() },
    
  ]);


const [isEdit, setIsEdit] = useState(false);

const [isError, setIsError] = useState(false);

const formRef = useRef<HTMLFormElement>(null);
const textAreaRef = useRef<HTMLTextAreaElement>(null);
const fileRef = useRef<HTMLInputElement>(null);

const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;}


if(fileRef.current?.files?.length){
  const file = fileRef.current?.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
        post(reader.result?.toString(), file.type);
      };
    } else {
      post(undefined, undefined);
    }

}

  const post = (dataUrl: string | undefined, fileType: string | undefined) => {
  const feed : FeedState = {
    id:feedList.length >0 ? feedList[0].id +1 : 1,
    content : textAreaRef.current?.value,
    dataUrl : dataUrl,
    fileType: fileType,
    createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

   formRef.current?.reset();

  }

  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };

const editItem = useRef<FeedState>({ id: 0, content: "", createTime: 0 });

const edit = (item: FeedState) => {
    // 수정할 todo객체
    editItem.current = item;
    // 모달 팝업을 보여주기
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    console.log(editItem);
    setFeedList(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        if (item) {
          item.content = editItem.content;
        }
      })
    );

    // 모달창 닫기
    setIsEdit(false);
  };


  return (
    <div style={{width:"40vw"}}>

      <h1 className="text-center mt-4">Feed</h1>
       {isEdit && (
        <FeedEditModal
          item={editItem.current}
          onClose={() => {
            setIsEdit(false);
          }}
          onSave={(editItem) => {
            save(editItem);
          }}
        />
      )}
    
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
          className="btn btn-primary text-nowrap btn-sm"
          type="button"
          onClick={() => {
            add(null);
          }}
        >
          입력
        </button>
      </div>

    </form>

    <div id="content" className="mt-3" >

    {feedList.map((item) => (
      <div className="card my-3" key={item.id}>
        {item.fileType &&
              (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                  alt={item.content}
                />
              ) : (
                <video className="card-img-top" controls src={item.dataUrl} />
              ))}
    <div className="card-body"> {/*border로 div 임시표시*/}

<p className="card-text mt-3">
  
      <span className="me-1">{item.content}</span><br></br><br></br>

      <span
      // style={{fontSize:0.75}}
      className="fs-6 text-decoration-underline text-muted">
        {getTimeString(item.createTime)}
      </span>
    
      <a href="#!"
      className="link-secondary fs-6 float-end"
      onClick={() => {
        del(item.id);
                }}>삭제</a>
<a href="#!"
      className="link-secondary fs-6 float-end me-1"
      onClick={() => {
                  edit(item);
                }}>수정</a>

</p>

    </div>
    </div>
    
    ))}

    </div>
    </div>
  
  )
};

export default Feed;