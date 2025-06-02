import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth-slice'
import noticeSlice  from './slice/notice-slice'
import  newslatterSlice  from './slice/newslatter-slice'
import  bannerSlice  from './slice/banner-slice'
import  categorySlice  from './slice/category-slice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    notice:noticeSlice,
    newslatter:newslatterSlice,
    banner:bannerSlice,
    category:categorySlice
  },
})