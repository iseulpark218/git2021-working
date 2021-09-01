import React, { useRef, useState } from "react";
import { FeedState } from "./type";
import produce from "immer";

interface ModalProp {
  item: FeedState;
  onClose: () => void;
  onSave: (editItem: FeedState) => void;
}

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
    const [feedList, setFeedList] = useState<FeedState[]>([]);
    const [newImageUrl, setNewImageUrl] = useState(null);
  
  const inputSaveRef = useRef<HTMLInputElement>(null);

// ------------------------------

// onChange={handleChangeFile}
//1 const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
//1  const {}
//1 }

  const save = () => {
    const feed: FeedState = {
      id: item.id,
      content: inputSaveRef.current?.value,
      //dataUrl : dataUrl,
      //fileType: fileType,
      createTime: item.createTime,
    };

    onSave(feed);
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
        <h5 className="modal-title">EDIT FEED</h5>
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
          accept="image/png, image/jpeg, video/mp4"
          ref={inputSaveRef}

        />
        <button
          className="btn btn-primary text-nowrap btn-sm"
          type="button" 
        >
          미리보기
        </button>
      </div>
      <div
      className="mb-3"
      style={{backgroundColor: "#efefef", width:"auto", height:"auto"}}
      ref={inputSaveRef}
      defaultValue={item.image}>
        <p>미리보기 파일자리👀</p>
        <img></img>
      </div>

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
                save();
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