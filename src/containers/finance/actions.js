import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 待放款
export const selectPendingLoan = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPendingLoanApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 待放款-拒绝
export const updateStateLoan = subreddit => {
  return dispatch => {
    MessageBox.confirm('拒绝该用户, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.updateStateLoanApi(subreddit)
      if (data.success) {
        dispatch(selectPendingLoan())
        Message.success(data.msg)
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('已取消操作')
    })
  }
}
// 待还款
export const selectPendingRepay = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectPendingRepayApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 待还款-全款
export const updateStateComplete = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateStateCompleteApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 待还款-延期
export const updateStateDelay = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateStateDelayApi(obj)
    if (data.success) {
      dispatch(selectPendingRepay())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 已完成
export const selectOrderCompleted = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectOrderCompletedApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 已还款
export const selectBill = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectBillApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 当日到期
export const selectTheDayLoan = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectTheDayLoanApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 备注-保存
export const insertRemarks = (obj) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.insertRemarksApi(obj)
    if (data.success) {
      dispatch(selectTheDayLoan())
      dispatch(btnReceivePosts(data.msg))
    }else{
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 当日到期-分配
export const distributionsCuiShou = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.distributionsCuiShouApi(obj)
    if (data.success) {
      dispatch(btnReceivePosts(data.msg))
      dispatch(selectTheDayLoan())
    } else {
      dispatch(btnFailurePosts())
    }
  }
}
