import axios from "axios";

export interface MypagePagingResponse {
  content: MypageItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface MypageItemResponse {
  select: string;
  id: number;
  txtName :  String | undefined;
  txtMypage :  String | number | undefined;
  txtEmail :  String | undefined;
  createdTime: number;
}
export interface MypageItemRequest {
  txtName :  String | undefined;
  txtMypage :  String | number | undefined;
  txtEmail :  String | undefined;
}

const mypageApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
  axios.get<MypageItemResponse[]>(`http://localhost:8080/mypages`),
  //axios.get<MypageItemResponse[]>(`${process.env.REACT_APP_API_BASE}/mypages`),

  fetchPaging: (page: number, size: number) =>
    axios.get<MypagePagingResponse>(
      `http://localhost:8080/mypages/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (mypageItem: MypageItemRequest) =>
    axios.post<MypageItemResponse>(
//      `${process.env.REACT_APP_API_BASE}/mypages`,
      `http://localhost:8080/mypages`,
      mypageItem
    ),

  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://localhost:8080/mypages/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, mypageItem: MypageItemRequest) =>
    axios.put<MypageItemResponse>(
      `http://localhost:8080/mypages/${id}`,
      mypageItem
    )
};

export default mypageApi;