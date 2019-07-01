import api from '@api/index'
import { requestPosts, receivePosts, failurePosts, shouldFetchPosts, btnRequestPosts, btnReceivePosts, btnFailurePosts } from '@redux/actions'
import { MessageBox, Message } from 'element-react'
// 数据备份列表
export const pageBackup = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageBackupApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 备份
export const backup = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.backupApi(obj)
    if (data.success) {
      Message.success(data.msg)
      dispatch(btnReceivePosts(data.msg))
    }else{
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 用户列表
export const pageAdmin = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageAdminApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}

// 用户-添加
export const addAdmin = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.addAdminApi(obj)
    if (data.success) {
      dispatch(pageAdmin())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 用户-编辑
export const updateAdmin = (obj, t) => {
  return async dispatch => {
    if (t === 'distribution' || t === 'adminState') {
      const text = t === 'distribution' ? '分配状态' : '用户状态'
			MessageBox.confirm(`修改${ text }, 是否继续?`, '提示', {
				type: 'warning'
			}).then(async () => {
        const data = await api.updateAdminApi(obj)
        if (data.success) {
          Message.success('修改成功')
          dispatch(pageAdmin())
        }else{
          Message.error(data.msg)
        }
			}).catch(() => {
        Message.info('取消操作')
			})
    }else{
      const data = await api.updateAdminApi(obj)
      if (data.success) {
        Message.success('保存成功')
        dispatch(pageAdmin())
      }else{
        Message.error(data.msg)
      }
    }
  }
}
// 借款额度管理列表
export const pageQuota = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageQuotaApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 借款额度管理-添加
export const addQuota = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.addQuotaApi(obj)
    if (data.success) {
      dispatch(pageQuota())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 借款额度管理-编辑
export const updateQuota = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateQuotaApi(obj)
    if (data.success) {
      dispatch(pageQuota())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 借款额度管理-删除
export const deleteQuota = id => {
  return dispatch => {
    MessageBox.confirm('删除该额度, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      const data = await api.deleteQuotaApi({id:id})
      if (data.success) {
        dispatch(pageQuota())
        Message.success(data.msg)
      } else {
        Message.warning(data.msg)
      }
    }).catch(() => {
      Message.info('取消删除')
    })
  }
}

// 帮助中心列表
export const pageGlobalconfig = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageGlobalconfigApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
    console.log(data)
  }
}
// 帮助中心-编辑
export const updateGlobalConfig = (obj) => {
  return async dispatch => {
    const data = await api.updateGlobalConfigApi(obj)
    if (data.success) {
      Message.success(data.msg)
      dispatch(pageGlobalconfig())
    }
  }
}

// 轮播图管理-列表
export const pageRotationChart = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageRotationChartApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 轮播图管理-删除
export const deleteRotationChart = subreddit => {
  return dispatch => {
    MessageBox.confirm('删除该图片, 是否继续?', '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(btnRequestPosts())
      const data = await api.deleteRotationChartApi(subreddit)
      if (data.success) {
        dispatch(pageRotationChart())
        dispatch(btnReceivePosts(data.msg))
      } else {
        dispatch(btnFailurePosts(data.msg))
      }
    }).catch(() => {
      Message.info('取消删除')
    })
  }
}

// 轮播图管理-上/下架
export const updateRotationChart = subreddit => {
  const t = subreddit.status === 1 ? '上架' : '下架'
  return dispatch => {
    MessageBox.confirm(`${ t }该图片, 是否继续?`, '提示', {
      type: 'warning'
    }).then(async () => {
      dispatch(requestPosts())
      const data = await api.updateRotationChartApi(subreddit)
      if (data.success) {
        dispatch(pageRotationChart())
        Message.success(`${ t }成功`)
      } else {
        dispatch(failurePosts(data))
      }
    }).catch(() => {
      Message.info('取消操作')
    })
  }
}

// 提额管理
export const pageuserQuota = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageuserQuotaApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}

// 提额额度-添加
export const adduserquota = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.adduserquotaApi(obj)
    if (data.success) {
      dispatch(pageuserQuota())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 提额额度-编辑
export const updateuserquota = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateuserquotaApi(obj)
    if (data.success) {
      dispatch(pageuserQuota())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 提额额度-删除
export const deleteuserquota = id => {
   return dispatch => {
     MessageBox.confirm('删除该额度, 是否继续?', '提示', {
       type: 'warning'
     }).then(async () => {
       dispatch(btnRequestPosts())
       const data = await api.deleteuserquotaApi({id:id})
       if (data.success) {
         dispatch(pageuserQuota())
         dispatch(btnReceivePosts(data.msg))
       } else {
         dispatch(btnFailurePosts(data.msg))
       }
     }).catch(() => {
       Message.info('已取消删除')
     })
   }
}

// 版本管理-列表
export const pageAppversion = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.pageAppversionApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}
// 版本管理-添加
export const addAppversion = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.addAppversionApi(obj)
    if (data.success) {
      dispatch(pageAppversion())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 版本管理-编辑
export const updateAppversion = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateAppversionApi(obj)
    if (data.success) {
      dispatch(pageAppversion())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 禁用区域-列表
export const selectUnAllowableArea = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.selectUnAllowableAreaApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}

// 提额规则设置-列表
export const findAllLiftingAmount = () => {
  return async (dispatch, getState) => {
    dispatch(requestPosts())
    const searchAll = shouldFetchPosts(getState())
    const data = await api.findAllLiftingAmountApi(searchAll)
    if (data.success) {
      dispatch(receivePosts(data.data))
    } else {
      dispatch(failurePosts(data))
    }
  }
}

// 提额规则设置-添加
export const addLiftingAmount = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.addLiftingAmountApi(obj)
    if (data.success) {
      dispatch(findAllLiftingAmount())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}
// 提额规则设置-修改
export const updateLiftingAmount = obj => {
  return async dispatch => {
    dispatch(btnRequestPosts())
    const data = await api.updateLiftingAmountApi(obj)
    if (data.success) {
      dispatch(findAllLiftingAmount())
      dispatch(btnReceivePosts(data.msg))
    } else {
      dispatch(btnFailurePosts(data.msg))
    }
  }
}

// 区域管理-启用/禁用
// export const updateAreaState = obj => {
//   return dispatch => {
//     MessageBox.confirm('删除该额度, 是否继续?', '提示', {
//       type: 'warning'
//     }).then(async () => {
//       const data = await api.updateAreaStateApi(obj)
//       if (data.success) {
//         dispatch(pageQuota())
//         Message.success(data.msg)
//       } else {
//         Message.warning(data.msg)
//       }
//     }).catch(() => {
//       Message.info('取消删除')
//     })
//   }
// }
