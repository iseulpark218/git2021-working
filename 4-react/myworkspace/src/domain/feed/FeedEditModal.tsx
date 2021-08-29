import React, { useRef, useState } from "react";
import { FeedState } from "./type";
import produce from "immer";


interface ModalProp {
  item: FeedState;
  onClose: () => void; // 콜백함수
  onSave: (editItem: FeedState) => void; // 콜백함수
}


// onChange={handleChangeFile}
//1 const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
//1  const {}
//1 }

const FeedEditModal = ({ item, onClose, onSave }: ModalProp) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const feed: FeedState = {
      id: item.id,
      content: fileRef.current?.value, // 수정된 입력값
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

      {/*
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
      */}

      <div className="modal-body">
         <div className="d-flex mb-2">
        <input
          type="file"
          className="form-control me-1 pb-1"
          accept="image/png, image/jpeg, video/mp4"
          ref={fileRef}

        />
        <button
          className="btn btn-primary text-nowrap btn-sm"
          type="button"
          /*
          onClick={() => {
            add();
          }}
        */
        >
          입력
        </button>
</div>


        <input
          type="text"
/*defaultValue={item.content}*/
          className="w-100"
          ref={fileRef}
          defaultValue={item.content}
        // placeholder="수정 내용을 입력하세요 😉"
            />
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