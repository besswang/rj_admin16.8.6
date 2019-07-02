import * as type from '@redux/actionTypes'
const initTab = {
  tabs: [{name:'欢迎页',url:'/welcome'}],
  tabIndex: 2,
  tabActive: '欢迎页'
}
const tabObj = (state = initTab, action) => {
  switch (action.type) {
    case type.TAB_ADD:{
      // const brr = []
      let arr = initTab.tabs
      arr.push(action.data)
      const obj = {}
      arr = arr.reduce((cur, next) => {
        (obj[next.name] ? '' : obj[next.name] = true) && cur.push(next)
        return cur
      }, []) //设置cur默认类型为数组，并且初始值为空的数组
      return {...state, tabs:arr,tabActive:action.data.name}
    }
    case type.TAB_REMOVE:{
      // console.log(initTab.tabs)
      // initTab.tabs.splice(action.data, 1)
      // return {...state,tabs:initTab.tabs}

      // console.log(action.arr)
      // action.arr.splice(action.index, 1)
      // console.log(action.arr)

       return {...state,tabs:action.arr}
    }
    default:
      return state
  }
}
export default tabObj