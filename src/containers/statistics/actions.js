import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPostsDate } from '@redux/actions'

// 报表统计-逾期统计
export const overSearch = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageOverdueCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-放款统计
export const pageLoanCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageLoanCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-还款统计
export const pageRepaymentCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageRepaymentCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-消耗费用
export const pageCostCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageCostCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-进出账
export const pageInoutCount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPostsDate(getState())
    console.log(searchAll)
    const data = await api.pageInoutCountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 报表统计-数据看版
export const selectDataCheckCount = () => {
  return async (dispatch) => {
    dispatch(requestPosts())
    const data = await api.selectDataCheckCountApi()
    // if (data.success) {
    //   dispatch(receivePosts(data.data))
    // } else {
    //   dispatch(failurePosts(data))
    // }
    console.log(data)
  }
}
