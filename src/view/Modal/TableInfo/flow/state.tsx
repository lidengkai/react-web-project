import { Store } from '../interface'
import { Type } from '../config'

const initialState: Store = {
  loading: false,
  type: Type.Add,
  disabledKeys: [],
  hideKeys: [],
}

export default initialState
