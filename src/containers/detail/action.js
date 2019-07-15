import api from '@api/index'
import * as type from '@redux/actionTypes'
import { requestPosts, receivePosts, failurePosts, saveIdCardInfo, shouldFetchPosts } from '@redux/actions'
import { Message } from 'element-react'

const saveMobile = data => ({
  type: type.SAVE_MOBILE_DATA,
  data
})
// 查看手机报表
export const selectMobileReport = obj => {
  return async dispatch => {
    const data = await api.selectMobileReportApi(obj)
    if(data.success){
      dispatch(saveMobile(data.data))
    }
  }
}

// 身份证信息
export const selectIdCardByUserId = id => {
  return async dispatch => {
    const data = await api.selectIdCardByUserIdApi(id)
    if (data.success) {
      if(data.data){
        dispatch(saveIdCardInfo(data.data))
      }else{
        Message.info('无数据')
      }
    }
  }
}

// 手机认证
export const selectPhoneDateByUserId = id => {
  return async dispatch => {
    console.log('123')
    const data = await api.selectPhoneDateByUserIdApi(id)
    if (data.success) {
      console.log(data)
      if (data.data){
        dispatch(saveIdCardInfo(data.data))
      }else{
        Message.info('无数据')
      }
    }
  }
}

// 紧急联系人
export const emergency = id => {
  return async dispatch => {
    const data = await api.selectEmergencyByUserIdApi(id)
    if (data.success) {
      if (data.data) {
        dispatch(saveIdCardInfo(data.data))
      } else {
        Message.info('无数据')
      }
    }
  }
}
// 银行卡信息
export const bankInfo = id => {
  return async dispatch => {
    dispatch(requestPosts())
    const data = await api.selectBankByUserIdApi(id)
    if (data.success) {
      dispatch(receivePosts({list:data.data}))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 通讯录
export const selectReportMail = posts => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({},searchAll,posts)
    const data = await api.selectReportMailApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 通话记录
export const selectReport = posts => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const trans = Object.assign({}, searchAll, posts)
    const data = await api.selectReportApi(trans)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
