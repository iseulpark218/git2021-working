import axios from "axios";

export interface FeedPagingResponse {
  content: FeedItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface FeedItemResponse {
  id: number;
  content: string | undefined;
  dataUrl: string | undefined;
  fileType: string | undefined;
  username: string | undefined;
  createdTime: number | undefined;
}

export interface FeedItemRequest {
  content: string | undefined;
  dataUrl: string | undefined;
  fileType: string | undefined;
  username: string | undefined;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const feedApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    axios.get<FeedItemResponse[]>(`http://localhost:8080/feeds`),

  fetchPaging: (page: number, size: number) =>
    axios.get<FeedPagingResponse>(
      `http://localhost:8080/feeds/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (feedItem: FeedItemRequest) =>
    axios.post<FeedItemResponse>(
      `http://localhost:8080/feeds`,
      feedItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://localhost:8080/feeds/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, feedItem: FeedItemRequest) =>
    axios.put<FeedItemResponse>(
      `http://localhost:8080/feeds/${id}`,
      feedItem
    ),
};

export default feedApi;
