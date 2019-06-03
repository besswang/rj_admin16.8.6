import * as type from '../actionTypes'
import { CHILD_ROUTES } from '../../routes/childRoutes'

const recursion = (arr, result = []) => {
  arr.map((item) => {
    if (item.children && item.children.length && !item.hideChildren) {
      return recursion(item.children, result)
    } else {
      if (item.children && item.children.length && item.hideChildren) {
        result.push(item)
        return recursion(item.children, result)
      } else {
        return result.push(item)
      }
    }
  })
  return result
}
const distributeRouter = () => {
  const defaultRouter = []
  recursion(CHILD_ROUTES).map(item => {
    return defaultRouter.push(item)
  })
  return defaultRouter
}
const singleRouterFn = () => {
  const singleRouter = []
  recursion(CHILD_ROUTES).map(item => {
    if(item.single){
      return singleRouter.push(item)
    }
    return singleRouter
  })
  return singleRouter
}
const router = (state = {
    routerArr: [],
    defaultActive: '',
    routerName: [],
    defaultRouter: [],
    singleRouter: singleRouterFn()
  }, action) => {
    switch (action.type) {
      case type.SAVE_DEFAULT_ROUTER:{
        const l = distributeRouter()
        const arr = []
        const d = action.data
        function fl(x) {
          for(const i in l){
            if (x.text === l[i].name) {
              x['name'] = x.text
              x['path'] = l[i].path
              x['exact'] = true
              if (x.state1 === '0'){
                x['hideInMenu'] = true
                l[i]['hideInMenu'] = true
              }
              arr.push(x)
            }
          }
        }
        for (const i in d) {
          fl(d[i])
        }
        console.log(l)
        console.log(arr)

        // for (const i in CHILD_ROUTES) {
        //   const child = CHILD_ROUTES[i].children
        //   for (const j in child) {
        //     if(child[j.name])
        //     console.log(child[j])
        //   }
        // }
        // console.log(CHILD_ROUTES)
        return {...state,defaultRouter: action.data, routerArr:CHILD_ROUTES}
      }
      case type.MENU_ACTIVE:
        return {...state, defaultActive: action.defaultActive}
      default:
        return state
    }
  }
  export default router