import * as type from '../actionTypes'
import { Notification } from 'element-react'
//初始化列表数据 详情-报告
const initReport ={
  userInfo:{},
  lastTime:'',
  gaugeEchart:[]
}
const reportDate = (state = initReport, action) => {
  switch (action.type) {
    case type.REPORT_REQUEST_POSTS:
      return {...state,
        userInfo:{},
        lastTime:'',
        gaugeEchart:[], loading: true
      }
    case type.REPORT_RECEIVE_POSTS: {
      let color = ''
      const v = parseInt(action.data.body.score_detail.score)
      if(v>=0 && v<=30){
        color = '#13ce66'
      }else if(v>30 && v<=50){
        color = '#50bfff'
      }else if(v>55 && v<=80){
        color = '#50bfff'
      }else if(v>80 && v<=100){
        color = '#50bfff'
      }
      console.log(v)
      console.log(color)
      return {...state,
        userInfo:action.data.body.id_detail,
        lastTime:action.data.body.last_modified_time,
        gaugeEchart: [{value:action.data.body.score_detail.score,name:action.data.body.score_detail.risk_evaluation,color:color}],
        loading: false
      }
    }
    case type.REPORT_FAILURE_POSTS: {
      Notification.warning(action.posts.msg)
      return {...state, loading: false}
    }
    default:
      return state
  }
}
export default reportDate
