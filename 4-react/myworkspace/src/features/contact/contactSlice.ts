import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  select: string | undefined;
  txtName: string | undefined;
  txtContact?: number | string ;
  txtEmail?: string | undefined;
  memo?: string | undefined;
  isEdit?: boolean;
  createTime: number;
}
interface contactState {
  data: ContactItem[];
  isFetched: boolean;
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
      state.data.unshift(contact);
    },

    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(state.data.findIndex((item) => item.id === id),1);
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
    },


  },
});

export const { addContact, removeContact, modifyContact } = contactSlice.actions;


export default contactSlice.reducer;