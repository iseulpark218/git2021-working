import feedReducer, {
  addFeed,
  initialCompleted,
  initialNextFeed,
  initialPagedFeed,
  initialFeed,
  modifyFeed,
  FeedPage,
  removeFeed,
} from "./feedSlice";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { FeedItem } from "./feedSlice";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  FeedItemRequest,
  FeedItemResponse,
  FeedPagingResponse,
} from "./feedApi";
import { AxiosResponse } from "axios";
import {
  endProgress,
  startProgress,
} from "../../components/progress/progressSlice";
import { addAlert } from "../../components/alert/alertSlice";
import { RootState } from "../../store";

/* ========= saga action Payload 타입 =============== */
export interface PageRequest {
  page: number;
  size: number;
}

/* ========= saga action을 생성하는 부분 =============== */

// feed를 추가하도록 요청하는 action
// {type:string, payload:FeedItem}
// {type:"feed/requestAddFeed", payload: {content, dataUrl...}}

// feed를 추가하도록 요청하는 action creator를 생성
// const actionCreator = createAction<Payload타입>(Action.type문자열)
// 전체 데이터 조횡에서 추가할 때
export const requestAddFeed = createAction<FeedItem>(
  `${feedReducer.name}/requestAddFeed`
);

// 숫자 페이징에서 추가할 때
export const requestAddFeedPaging = createAction<FeedItem>(
  `${feedReducer.name}/requestAddFeedPaging`
);

// 더보기 페이징에서 추가할 때
export const requestAddFeedNext = createAction<FeedItem>(
  `${feedReducer.name}/requestAddFeedNext`
);

// feed를 가져오는 action
export const requestFetchFeeds = createAction(
  `${feedReducer.name}/requestFetchFeeds`
);

// feed를 페이징으로 가져오는 action
export const requestFetchPagingFeeds = createAction<PageRequest>(
  `${feedReducer.name}/requestFetchPagingFeeds`
);

// 다음 페이지 feed를 가져오는 action
export const requestFetchNextFeeds = createAction<PageRequest>(
  `${feedReducer.name}/requestFetchNextFeeds`
);

// feed를 삭제하는 action
export const requestRemoveFeed = createAction<number>(
  `${feedReducer.name}/requestRemoveFeed`
);

// feed를 삭제하는 action(숫자페이징일때)
export const requestRemoveFeedPaging = createAction<number>(
  `${feedReducer.name}/requestRemoveFeedPaging`
);

// feed를 삭제하는 action(더보기페이징일때)
export const requestRemoveFeedNext = createAction<number>(
  `${feedReducer.name}/requestRemoveFeedNext`
);

// feed를 수정하는 action
export const requestModifyFeed = createAction<FeedItem>(
  `${feedReducer.name}/requestModifyFeed`
);

/* ========= saga action을 처리하는 부분 =============== */

// 서버에 POST로 데이터를 보내 추가하고, redux state를 변경
function* addDataPaging(action: PayloadAction<FeedItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const feedItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const feedItemRequest: FeedItemRequest = {
      content: feedItemPayload.content,
      // content: "", // 임시로 에러 유발(400)
      dataUrl: feedItemPayload.dataUrl,
      fileType: feedItemPayload.fileType,
      username: feedItemPayload.username,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // spinner 보여주기
    yield put(startProgress());
    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(feedItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<FeedItemResponse> = yield call(
      api.add,
      feedItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // **2021-09-28- 페이징 처리 추가 로직
    // 추가하기전에 현재 페이지의 가장 마지막 데이터를 삭제
    // redux state 조회하기
    const feedData: FeedItem[] = yield select(
      (state: RootState) => state.feed.data
    );
    // 현재 데이터가 있으면
    if (feedData.length > 0) {
      // 가장 마지막 요소의 id값을 가져오고 삭제함
      const deleteId = feedData[feedData.length - 1].id;
      yield put(removeFeed(deleteId));
    }

    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const feedItem: FeedItem = {
      id: result.data.id,
      content: result.data.content,
      dataUrl: result.data.dataUrl,
      fileType: result.data.fileType,
      username: result.data.username,
      createdTime: result.data.createdTime,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addFeed(feedItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* addDataNext(action: PayloadAction<FeedItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const feedItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const feedItemRequest: FeedItemRequest = {
      content: feedItemPayload.content,
      // content: "", // 임시로 에러 유발(400)
      dataUrl: feedItemPayload.dataUrl,
      fileType: feedItemPayload.fileType,
      username: feedItemPayload.username,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // spinner 보여주기
    yield put(startProgress());
    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(feedItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<FeedItemResponse> = yield call(
      api.add,
      feedItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const feedItem: FeedItem = {
      id: result.data.id,
      content: result.data.content,
      dataUrl: result.data.dataUrl,
      fileType: result.data.fileType,
      username: result.data.username,
      createdTime: result.data.createdTime,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addFeed(feedItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");

  // spinner 보여주기
  yield put(startProgress());

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<FeedItemResponse[]> = yield call(api.fetch);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 응답데이터배열을 액션페이로드배열로 변환
  // FeedItemResponse[] => FeedItem[]
  const feeds = result.data.map(
    (item) =>
      ({
        id: item.id,
        content: item.content,
        dataUrl: item.dataUrl,
        fileType: item.fileType,
        username: item.username,
        createdTime: item.createdTime,
      } as FeedItem)
  );

  // state 초기화 reducer 실행
  yield put(initialFeed(feeds));
}

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("feed_page_size", size.toString());

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<FeedPagingResponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // 받아온 페이지 데이터를 Payload 변수로 변환
    const feedPage: FeedPage = {
      // 응답데이터배열을 액션페이로드배열로 변환
      // FeedItemResponse[] => FeedItem[]
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            content: item.content,
            dataUrl: item.dataUrl,
            fileType: item.fileType,
            username: item.username,
            createdTime: item.createdTime,
          } as FeedItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialPagedFeed(feedPage));
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<FeedPagingResponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // 받아온 페이지 데이터를 Payload 변수로 변환
    const feedPage: FeedPage = {
      // 응답데이터배열을 액션페이로드배열로 변환
      // FeedItemResponse[] => FeedItem[]
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            content: item.content,
            dataUrl: item.dataUrl,
            fileType: item.fileType,
            username: item.username,
            createdTime: item.createdTime,
          } as FeedItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextFeed(feedPage));
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  // id값
  const id = action.payload;

  // spinner 보여주기
  yield put(startProgress());

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeFeed(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());

  // 현재 페이지 데이터를 다시 가져옴
  // 현재 페이지와 사이즈 값을 읽어옴
  const page: number = yield select((state: RootState) => state.feed.page);
  const size: number = yield select((state: RootState) => state.feed.pageSize);

  yield put(requestFetchPagingFeeds({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;

  // spinner 보여주기
  yield put(startProgress());

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeFeed(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

function* modifyData(action: PayloadAction<FeedItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const feedItemPayload = action.payload;

  // rest api로 보낼 요청객체
  const feedItemRequest: FeedItemRequest = {
    content: feedItemPayload.content,
    dataUrl: feedItemPayload.dataUrl,
    fileType: feedItemPayload.fileType,
    username: feedItemPayload.username,
  };

  // spinner 보여주기
  yield put(startProgress());

  const result: AxiosResponse<FeedItemResponse> = yield call(
    api.modify,
    feedItemPayload.id,
    feedItemRequest
  );

  // spinner 사라지게 하기
  yield put(endProgress());

  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const feedItem: FeedItem = {
    id: result.data.id,
    content: result.data.content,
    dataUrl: result.data.dataUrl,
    fileType: result.data.fileType,
    username: result.data.username,
    createdTime: result.data.createdTime,
  };

  // state 변경
  yield put(modifyFeed(feedItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

/* ========= saga action을 감지(take)하는 부분 =============== */
// feed redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성
export default function* feedSaga() {
  // takeEvery(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션은 모두 처리함
  yield takeEvery(requestAddFeed, addDataNext);
  yield takeEvery(requestAddFeedPaging, addDataPaging);
  yield takeEvery(requestAddFeedNext, addDataNext);

  // takeLatest(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션중에서 가장 마지막 액션만 처리, 이전 액션은 취소
  yield takeLatest(requestFetchFeeds, fetchData);
  yield takeLatest(requestFetchPagingFeeds, fetchPagingData);
  yield takeLatest(requestFetchNextFeeds, fetchNextData);

  // 삭제처리
  yield takeEvery(requestRemoveFeed, removeDataNext);
  yield takeEvery(requestRemoveFeedPaging, removeDataPaging);
  yield takeEvery(requestRemoveFeedNext, removeDataNext);

  // 수정처리
  yield takeEvery(requestModifyFeed, modifyData);
}
