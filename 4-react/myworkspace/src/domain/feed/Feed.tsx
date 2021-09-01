import { useRef, useState } from "react";
import { isTemplateExpression } from "typescript";
import produce from "immer";

import { FeedState } from "./type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import FeedEditModal from "./FeedEditModal";
import style from "./Feed.module.scss";

const getTimeString = (unixtime : number) => {
   const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
}

const Feed = () => {

  const profile = useSelector((state: RootState) => state.profile);
  const [feedList, setFeedList] = useState<FeedState[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {

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
    username: profile.username,
    image: profile.image,
    createTime: new Date().getTime(),
    };

    setFeedList([feed, ...feedList]);

   formRef.current?.reset();

  }

  const del = (id: number) => {
    setFeedList(feedList.filter((item) => item.id !== id));
  };

const editItem = useRef<FeedState>({
  id: 0, 
  content: "", 
  username: profile.username,
  image: profile.image,
  createTime: 0 });

const edit = (item: FeedState) => {
    editItem.current = item;
    setIsEdit(true);
  };

  const save = (editItem: FeedState) => {
    setFeedList(
      produce((state) => {
        const item = state.find((item) => item.id === editItem.id);
        if (item) {
          item.content = editItem.content;
        }
      })
    );

    setIsEdit(false);
  };


  return (
    <div style={{width:"40vw"}} className="mx-auto">

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
      <div className="d-flex card-header p-1">
        <img
          src={item.image}
          className={`${style.thumb} m-2`}
          ></img>
        <span className="mt-2">{item.username}</span>
      </div>
              {item.fileType && (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top"
                  alt={item.content}
                /> ): (
                <video className="card-img-top" controls src={item.dataUrl} />
              ))}
    <div className="card-body">

<p className="card-text mt-3">
  
      <span className="me-1">{item.content}</span><br></br><br></br>
      <span
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