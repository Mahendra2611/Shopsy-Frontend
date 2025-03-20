import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
  name: "notification",
  initialState : {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    setNotifications:(state,action)=>{
        state.notifications = action.payload
    },
    markAllAsRead: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAllAsRead,setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
