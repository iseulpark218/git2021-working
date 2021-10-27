import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MypageItem {
  id: number;
  select: string | undefined;
  txtName: string | undefined;
  txtMypage: string | undefined;
  txtEmail: string | undefined;
  memo?: string | undefined;
  isEdit?: boolean;
  createdTime: number;
}

export interface MypagePage {
  data: MypageItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface mypageState {
  data: MypageItem[];
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

const initialState: mypageState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
};

const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    addMypage: (state, action: PayloadAction<MypageItem>) => {
      const mypage = action.payload;
      console.log("--in reducer function--");
      console.log(mypage);
      state.data.unshift(mypage);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeMypage: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyMypage: (state, action: PayloadAction<MypageItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const mypageItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (mypageItem) {
        mypageItem.select = modifyItem.select;
        mypageItem.txtName = modifyItem.txtName;
        mypageItem.txtMypage = modifyItem.txtMypage;
        mypageItem.txtEmail = modifyItem.txtEmail
        mypageItem.memo = modifyItem.memo;
      }
           state.isModifyCompleted = true;
    },

    // payload값으로 state를 초기화하는 reducer 필요함
    initialMypage: (state, action: PayloadAction<MypageItem[]>) => {
      const mypages = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = mypages;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedMypage: (state, action: PayloadAction<MypagePage>) => {
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
  addMypage, 
  removeMypage, 
  modifyMypage,  
  initialMypage,
  initialCompleted,
  initialPagedMypage,
} = mypageSlice.actions;


export default mypageSlice.reducer;