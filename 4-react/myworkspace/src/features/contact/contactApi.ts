import axios from "axios";

export interface ContactItemResponse {
  select: string;
  id: number;
  txtName :  String | undefined;
  txtContact :  String | number | undefined;
  txtEmail :  String | undefined;
  createdTime: number;
}
export interface ContactItemRequest {
  txtName :  String | undefined;
  txtContact :  String | number | undefined;
  txtEmail :  String | undefined;
}

const contactApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
  axios.get<ContactItemResponse[]>(`http://localhost:8080/contacts`),
  //axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
//      `${process.env.REACT_APP_API_BASE}/contacts`,
      `http://localhost:8080/contacts`,
      contactItem
    ),

  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://localhost:8080/contacts/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `http://localhost:8080/contacts/${id}`,
      contactItem
    )
};

export default contactApi;