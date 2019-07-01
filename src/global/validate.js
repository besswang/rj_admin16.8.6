export default {
  money: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入额度'))
    } else {
      callback()
    }
  },
  sort: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入排序'))
    } else {
      callback()
    }
  },
  serverMoney: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入服务费'))
    } else {
      callback()
    }
  },
  continueMoney: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入延期金额'))
    } else {
      callback()
    }
  },
  dayNumber: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入申请天数'))
    } else {
      callback()
    }
  },
  moneyRate: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入借款年化利率'))
    } else {
      callback()
    }
  },
  overdueRate: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('请输入逾期利率'))
    } else {
      callback()
    }
  },
  numEmpty: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('金额不能为空'))
    } else {
      callback()
    }
  },
  dayNum: (rule, value, callback) => {
    if (value === '' || value === null) {
      callback(new Error('天数不能为空'))
    } else {
      callback()
    }
  }
}