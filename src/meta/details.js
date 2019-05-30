const text = '用户详情'
const userInfo = '用户信息'
const applyInfo = '申请信息'
const pathname = '/detail'
export const dmlist = {
  pathname: pathname,
  state: {
    name: userInfo,
    title: '会员列表',
    url: '/member/mlist'
  },
  text: text
}
export const doverdue = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '逾期列表',
    url: '/collection/overdue'
  },
  text:text
}
export const daudit = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待审核',
    url: '/borrow/audit'
  },
  text: text
}
export const dauditRefuse = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '审核拒绝',
    url: '/borrow/auditrefuse'
  },
  text: text
}
export const dcollection = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '催收列表',
    url: '/collection/collection'
  },
  text: text
}
export const dwaitFang = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待放款',
    url: '/finance/waitFang'
  },
  text: text
}
export const dwaitHuan = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '待还款',
    url: '/finance/waitHuan'
  },
  text: text
}
export const dalreadyWan = {
  pathname: pathname,
  state: {
    name: applyInfo,
    title: '已完成',
    url: '/finance/alreadyWan'
  },
  text: text
}