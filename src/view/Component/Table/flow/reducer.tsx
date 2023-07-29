import { createSlice } from '@reduxjs/toolkit'
import initialState from './state'
import { Store } from '../interface'

export const slice = createSlice({
  name: 'componentTable',
  initialState,
  reducers: {
    init: () => {
      return initialState
    },
    commit: (state, action: { payload: Partial<Store> }) => {
      Object.assign(state, action.payload)
    }
  }
})

export default slice
