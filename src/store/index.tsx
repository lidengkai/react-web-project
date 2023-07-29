import { configureStore } from '@reduxjs/toolkit'

import app from '@/view/App/flow/reducer'
import componentTable from '@/view/Component/Table/flow/reducer'
// modal
import tableInfoModal from '@/view/Modal/TableInfo/flow/reducer'

export const store = configureStore({
  reducer: {
    [app.name]: app.reducer,
    [componentTable.name]: componentTable.reducer,
    // modal
    [tableInfoModal.name]: tableInfoModal.reducer,
  }
})

/** 统一初始化 */
export const resetState = () => {
  store.dispatch(app.actions.init())
  store.dispatch(componentTable.actions.init())
  // modal
  store.dispatch(tableInfoModal.actions.init())
}

export default store
export const { dispatch, getState } = store
