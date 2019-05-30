import api from '@api/index'
import { FALSE } from '@meta/state'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts } from '@redux/actions'
// 会员管理-会员列表
export const handelSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, {state: FALSE})
    const data = await api.selectOrderByParamApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
