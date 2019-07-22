import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 渠道管理
export const selectChannel = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectChannelApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 渠道管理-添加
export const insertChannel = (obj,to) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.insertChannelApi(obj)
    if (data.success) {
      dispatch(selectChannel())
      dispatch(btnReceivePosts(data.msg))
      to.push('/generalize/channelmanage')
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 渠道管理-编辑
export const updateChannel = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateChannelApi(obj)
    if (data.success) {
      dispatch(selectChannel())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 渠道管理-禁用
export const prohibitChannel = obj => {
  const t = obj.state === 0 ? '禁用' : '启用'
  return dispatch => {
    MessageBox.confirm(`${ t }该渠道会员, 是否继续?`, '提示', {
      type: 'warning'
    }).then(async () => {
      const data = await api.prohibitChannelApi(obj)
      if (data.success) {
        dispatch(selectChannel())
        Message.success(data.msg)
      }
    }).catch(() => {
      Message.info(`已取消${ t }`)
    })
  }
}

// 渠道管理-展期模式-列表
export const findDelayRate = obj => {
  return async dispatch => {
    dispatch(requestPosts())
    // const n = window.sessionStorage.getItem('channelName')
    // const data = await api.findDelayRateApi({ channelName: n })
    const data = await api.findDelayRateApi(obj)
    if (data.success) {
      dispatch(receivePosts({list:data.data}))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 系统管理-展期管理
export const findAllDelayRate = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.findAllDelayRateApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 渠道管理-展期模式-添加
export const bindingRate = (obj,type) => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.bindingRateApi(obj)
    if (data.success) {
      if(type===1){
        dispatch(findAllDelayRate())
      }else{
        dispatch(findDelayRate({ channelName: obj.channelName }))
      }
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 渠道管理-展期模式-删除
export const deleteDelayRate = (id,name) => {
  return dispatch => {
    MessageBox.confirm('删除, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.deleteDelayRateApi({id:id})
      if (data.success) {
        console.log(name)
        if(name){
          dispatch(findDelayRate({channelName:name}))
        }else{
          dispatch(findAllDelayRate())
        }
        Message({
          type: 'success',
          message: data.msg
        })
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}
