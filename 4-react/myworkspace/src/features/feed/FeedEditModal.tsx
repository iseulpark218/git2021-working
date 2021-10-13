import { FeedState } from "./type";
//import produce from "immer";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestModifyFeed } from "./feedSaga";
import { FeedItem } from "./feedSlice";


interface ModalProp {
  item: FeedState;
  onClose: () => void;
  onSave: (editItem: FeedState) => void;
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
    const { id } = useParams<{ id: string }>();
    const feedItem = useSelector((state: RootState) =>
    state.feed.data.find((item) => item.id === +id)
  );
  const isModifyCompleted = useSelector(
    (state: RootState) => state.feed.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  
  const inputSaveRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

//    const [feedList, setFeedList] = useState<FeedState[]>([]);
    const [newImageUrl, setNewImageUrl] = useState<string | undefined>(feedItem?.dataUrl);
//    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
//    const [imgFile, setImgFile] = useState(null);	//파일	

  useEffect(() => {
    isModifyCompleted && history.push("/feeds");
  }, [isModifyCompleted, history]);

// ------------------------------

const handleChangeFile = () => {
      console.log("change");
    if (fileRef.current?.files?.length) {
      const File = fileRef.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setNewImageUrl(reader.result?.toString());
      };

      reader.readAsDataURL(File);
    }
/*
  const reader = new FileReader();
const base64 = reader.result;
if(base64){
  setImgBase64(base64.toString());
}
*/
}

  const saveClick = () => {
      // 파일이 있을 때 처리
    if (fileRef.current?.files?.length) {
      const File = fileRef.current.files[0];
      const reader = new FileReader();
      
  reader.onload = () => {
        if (feedItem) {
          // 기존 데이터 카피
          const item = { ...feedItem };
          // 변경할 속성만 대입
        //  item.content = inputSaveRef.current ? inputSaveRef.current.value : "";
          item.content = inputSaveRef.current?.value;
          item.dataUrl = reader.result ? reader.result.toString() : "";
          item.fileType = File.type;
          item.username = File.name;

          // reducer로 state 수정 및 목록으로 이동
          saveItem(item);
        }
      };

      reader.readAsDataURL(File);
    }
    // 파일이 없을 때 처리
    else {
      if (feedItem) {
        // 기존 데이터 카피
        const item = { ...feedItem };
        // 변경할 속성만 대입
      //  item.content = inputSaveRef.current ? inputSaveRef.current.value : "";
       item.content = inputSaveRef.current?.value;

        // reducer로 state 수정 및 목록으로 이동
        saveItem(item);
      }
    }

    const feed: FeedState = {
      id: item.id,
      content: inputSaveRef.current?.value,
      //dataUrl : dataUrl,
      //fileType: fileType,
      createdTime: new Date().getTime(),
    };

    onSave(feed);
  };

    const saveItem = (item: FeedItem) => {
    // dispatch(modifyFeed(item));
    dispatch(requestModifyFeed(item)); // saga action으로 대체
    // history.push("/feeds");
  };

  return(
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {onClose();}}>
        
    <div className="modal d-block">
  <div className="modal-dialog">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h5>EDIT FEED</h5>
      <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {onClose();}}
            ></button>
      </div>

      <div className="modal-body">
         <div className="d-flex mb-2">
                   <input
          type="file"
          className="form-control me-1 pb-1"
          accept="image/*" /*"image/png, image/jpeg, video/mp4"*/
          ref={fileRef}
          onChange={() => {
                    handleChangeFile();
                  }}
                  />
                  </div>
                  <div className="d-flex mb-2">
        <img src={newImageUrl} alt={feedItem?.content} />
{/*
        <button
          className="btn btn-primary text-nowrap btn-sm"
          type="button"
          onClick={() => console.log(2)}
        >
          미리보기
        </button>
        */}
      </div>
{/*}
      <div>
          {item.fileType && (item.fileType?.includes("image") ? (
                <img
                  src={item.dataUrl}
                  className="card-img-top mb-3"
                  //alt={item.content}
                /> ): (
                <video className="card-img-top" controls src={item.dataUrl} />
              ))}
      </div>
                */}
{/*
      <div
      className="mb-3"
      style={{backgroundColor: "#efefef", width:"auto", height:"auto"}}
      ref={inputSaveRef}
      defaultValue={item.image}>
        <p>미리보기 파일자리👀</p>
        <img></img>
      </div>
*/}
        <div className="d-flex">
        <input
          type="text"
          className="w-100"
          ref={inputSaveRef}
          defaultValue={item.content}
          placeholder="수정 내용을 입력하고 저장을 누르세요 😉"
            />

        </div>
      </div>
      <div className="modal-footer">

        <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
              }}
            >닫기</button>
        <button type="button"
              className="btn btn-primary"
              onClick={() => {
                saveClick();
              }}
            >저장</button>
      </div>
    </div>
  </div>
 </div>  
</div>  

  );
};



export default FeedEditModal;