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
interface contactState {
  data: ContactItem[];
  isFetched: boolean;
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부

}

const initialState: contactState = {
  data: [],
  isFetched: false,
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
    },

    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(state.data.findIndex((item) => item.id === id),1);
        state.isRemoveCompleted = true;
    },

    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const modifyItem = action.payload;
      const ContactItem = state.data.find((item) => item.id === modifyItem.id);
      if (ContactItem) {
        ContactItem.select = modifyItem.select;
        ContactItem.txtName = modifyItem.txtName;
        ContactItem.txtContact = modifyItem.txtContact;
        ContactItem.txtEmail = modifyItem.txtEmail
        ContactItem.memo = modifyItem.memo;
      }
           state.isModifyCompleted = true;
    },
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = contacts;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },



  },
});

export const { addContact, removeContact, modifyContact,  initialContact,
  initialCompleted,} = contactSlice.actions;


export default contactSlice.reducer;