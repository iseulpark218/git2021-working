import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  select: string | undefined;
  txtName: string | undefined;
  txtContact: string | undefined;
  txtEmail: string | undefined;
  memo?: string | undefined;
  isEdit?: boolean;
  createdTime: number;
}

export interface ContactPage {
  data: ContactItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface contactState {
  data: ContactItem[];
  isFetched: boolean;
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState: contactState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      console.log("--in reducer function--");
      console.log(contact);
      state.data.unshift(contact);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const contactItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (contactItem) {
        contactItem.select = modifyItem.select;
        contactItem.txtName = modifyItem.txtName;
        contactItem.txtContact = modifyItem.txtContact;
        contactItem.txtEmail = modifyItem.txtEmail
        contactItem.memo = modifyItem.memo;
      }
           state.isModifyCompleted = true;
    },

    // payload값으로 state를 초기화하는 reducer 필요함
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = contacts;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedContact: (state, action: PayloadAction<ContactPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

export const { 
  addContact, 
  removeContact, 
  modifyContact,  
  initialContact,
  initialCompleted,
  initialPagedContact,
} = contactSlice.actions;


export default contactSlice.reducer;