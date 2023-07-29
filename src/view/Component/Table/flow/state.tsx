import { Store } from '../interface'

const initialState: Store = {
  loading: false,
  name: '',
  filters: {},
  field: undefined,
  order: undefined,
  current: 1,
  pageSize: 50,
  total: 0,
  dataSource: [],
  infoShow: false,
  infoData: {},
}

export default initialState
