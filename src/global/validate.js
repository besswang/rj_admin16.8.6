export default {
  money: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入额度'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效的额度'))
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
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入服务费'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效金额'))
    }else {
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
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('请输入申请天数'))
    } else if(!r.test(value)){
      callback(new Error('请输入有效数字'))
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
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入逾期利率'))
    } else if(!reg.test(value)){
      callback(new Error('请输入有效的数字'))
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
  fen: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('分数不能为空'))
    } else if(!r.test(value)){
      callback(new Error('请输入有效分数'))
    } else {
      callback()
    }
  },
  dayNum: (rule, value, callback) => {
    const r = new RegExp('^[0-9]*$')
    if (value === '' || value === null) {
      callback(new Error('天数不能为空'))
    } else if(!r.test(value)){
      callback(new Error('请输入有效天数'))
    } else {
      callback()
    }
  },
  lilv: (rule, value, callback) => { // 利率
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入利率'))
    }else if(!reg.test(value)){
      callback(new Error('请输入有效利率'))
    } else {
      callback()
    }
  },
  feilv: (rule, value, callback) => { // 费率
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入费率'))
    }else if(!reg.test(value)){
      callback(new Error('请输入有效费率'))
    } else {
      callback()
    }
  },
  moneyType: (rule, value, callback) => {
    const reg = new RegExp('^[0-9]+(.[0-9]{2})?$')
    if (value === '' || value === null) {
      callback(new Error('请输入金额'))
    }else if(!reg.test(value)){
      callback(new Error('请输入有效金额'))
    } else {
      callback()
    }
  }
}