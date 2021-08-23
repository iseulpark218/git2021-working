import { useRef, useState } from "react";
import Alert from "./base/Alert";

interface FeedState {
  id : number;
  content : string | undefined;
  createTime : number;
  modifyTime?: number;
  isEdit?: boolean;
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Feed = () => {
  const [feedContent, setFeedContent] = useState<FeedState[]>([
    { id: 2, content: "11", createTime: new Date().getTime() },
    { id: 1, content: "22", createTime: new Date().getTime() },
  ]);

/*------------------------------------------------------------------------*/

  // 빈 값 여부 state
  const [isError, setIsError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const btnAddRef = useRef<HTMLButtonElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const content = useRef<HTMLDivElement>(null);

  //const contentRef = useRef<HTMLContentElement>(null);

 // 게시 버튼 event 작동
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
    if (!textAreaRef || !inputRef.current?.value) {
      setIsError(true);
      return;
    }




    const feed: FeedState = {
      id: feedContent.length > 0 ? feedContent[0].id + 1 : 1,
      content: textAreaRef.current?.value,
      createTime: new Date().getTime(),
    };

    setFeedContent([feed, ...feedContent]);

    // 입력값 초기화
    formRef.current?.reset();
    // 에러 메시지 제거
    setIsError(false);
  };

  const del = (id: number) => {
    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외하고 새로운 배열로 리턴함.
    setFeedContent(feedContent.filter((item) => item.id !== id));
  };

  const edit = (id: number, mod: boolean) => {
    // 해당 id에 해당하는 item만 edit 모드로 변경함
    // 해당 item의 속성을 변경한 후 변경된 item을 반환
    // map 함수는 새로운 배열을 반환하는 함수, 배열길이는 기존 배열 길이와 같음
    setFeedContent(
      feedContent.map((item) => {
        if (item.id === id) {
          item.isEdit = mod;
        }

        return item;
      })
    );
  };


  const save = (id: number, index: number) => {
    console.log(ulRef.current);

    // ul 밑에 있는 입력박스중에서 index번째 입력박스만 선택
    const input = ulRef.current?.querySelectorAll("input")[index];
   setFeedContent(
     feedContent.map((item) => {
        // 해당 id의 item의 값을 변경
        if (item.id === id) {
          item.content = input?.value;
          item.modifyTime = new Date().getTime();
          item.isEdit = false;
        }

        return item;
      })
    );
  };


/*------------------------------------------------------------------------*/

  return (
<>
   {/* <h1 className="text-center mt-4">FEED</h1> */}
          <form
        id="form-input" 
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          id="txt"
          //rows="5"
          className="form-control mb-1 pb-5" //w-100
          placeholder="👉🏻 Leave a post here 👈🏻"
          ></textarea>
        <div className="d-flex mt-2">
          <input
            type="file"
            className="form-control me-1 pb-1"
            accept="image/png, image/jpeg, video/mp4"
            ref={inputRef}
            onKeyPress={(e) => {
              add(e);
            }}
          // style="background-color: rgb(253, 167, 181, 0.7)"
                    />
          <button id="btn-add"
            className="btn btn-primary text-nowrap btn-sm"
            type="button"
            onClick={() => {
            add(null);
          }}>
            입력
          </button>
        </div>
      </form>
      {isError && (
        <Alert
          message={"게시글을 입력하거나, 파일을 선택 해 주세요."}
          variant={"dark"}
          onClose={() => {
            setIsError(false);
          }}
        />
      )}
    <div id="content" className="mt-3">
      
    </div>



 </>
 );
 };     
export default Feed;

 {/*   
<div id="content" className="mt-3" key={item.id}>
       {feedContent.map((item, index) => (
      {!item.isEdit && <span className="me-1">{item.content}</span>}
   
  
  );
);
};
  </div>
  */} 