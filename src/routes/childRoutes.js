import Welcome from '@containers/welcome'
// 会员管理-会员列表
import Mlist from '@containers/member/mlist/index'
// 会员管理-会员详情
import Detail from '@containers/detail/index'
// 会员管理-注册未申请
import Apply from '@containers/member/apply'
// 会员管理-正常还款未借
import Normal from '@containers/member/normal'
// 报表统计-渠道统计
import Ditch from '@containers/statistics/ditch/index'
// 报表统计-渠道统计-当天/总转化/渠道费用
import Ditchinside from '@containers/statistics/ditch/ditchinside'
// 报表统计-逾期统计
import Overdue from '@containers/statistics/overdue'
// 报表统计-放款统计
import Loan from '@containers/statistics/loan'
// 报表统计-还款统计
import Repayment from '@containers/statistics/repayment'
// 报表统计-还款统计-查看
import Repayinside from '@containers/statistics/repayinside'
// 报表统计-消耗费用
import Consume from '@containers/statistics/consume'
// 报表统计-进出账
import Turnover from '@containers/statistics/turnover'
// 报表统计-数据看版
import Look from '@containers/statistics/look'
// 借款管理-待审核
import Audit from '@containers/borrow/audit/index'
// 借款管理-待审核-详情
import Auddetail from '@containers/borrow/auddetail'
// 借款管理-审核拒绝
import Auditrefuse from '@containers/borrow/auditRefuse/index'
// 催收管理-逾期列表
import Colloverdue from '@containers/collection/overdue'
import Collection from '@containers/collection/collection'
import Self from '@containers/collection/self'
// 财务管理-待放款
import WaitFang from '@containers/finance/waitFang'
import WaitHuan from '@containers/finance/waitHuan'
import AlreadyWan from '@containers/finance/alreadyWan'
import AlreadyHuan from '@containers/finance/alreadyHuan'
import Day from '@containers/finance/day'
// 黑名单管理
import BlackUser from '@containers/black/blackUser'
import Contacts from '@containers/attestation/contacts'
import Phone from '@containers/attestation/phone'
import Bank from '@containers/attestation/bank'
import Idcard from '@containers/attestation/idcard'
import Setting from '@containers/attestation/setting'
// 系统管理
import Admin from '@containers/system/admin'
import Role from '@containers/system/role/index'
import Area from '@containers/system/area'
import Backup from '@containers/system/backup'
import Borrowlimit from '@containers/system/borrowlimit'
import Help from '@containers/system/help'
import Banner from '@containers/system/banner'
import Quota from '@containers/system/quota'
import Versions from '@containers/system/versions'
// 推广管理
import ChannelManage from '@containers/generalize/channelManage'
import Statistics from '@containers/generalize/statistics'
import ChannelMember from '@containers/generalize/channelMember'
// import Login from '@containers/user/login'
// import Home from '@containers/home'
export const CHILD_ROUTES = [
  {
    name: '首页',
    path: '/home',
    exact: true,
    hideInMenu: true,
    component: Welcome
  },
  // {
  //   name: '欢迎页',
  //   path: '/welcome',
  //   exact: true,
  //   hideInMenu: true,
  //   component: Welcome
  // },
  {
    id: 1,
    name: '会员管理',
    path: '/member',
    children: [
      {
        name: '会员列表',
        path: '/member/mlist',
        exact: true,
        component: Mlist
      }, {
        name: '注册未申请',
        path: '/member/apply',
        exact: true,
        component: Apply
      }, {
        name: '正常还款未借',
        path: '/member/normal',
        exact: true,
        component: Normal
      }
    ]
  }, {
    id: 2,
    name: '报表统计',
    path: '/statistics',
    children: [
      {
        name: '渠道统计',
        path: '/statistics/ditch',
        exact: true,
        component: Ditch
      }, {
        name: '逾期统计',
        path: '/statistics/overdue',
        exact: true,
        component: Overdue
      }, {
        name: '放款统计',
        path: '/statistics/loan',
        exact: true,
        component: Loan
      }, {
        name: '还款统计',
        path: '/statistics/repayment',
        exact: true,
        component: Repayment
      }, {
        name: '消耗费用',
        path: '/statistics/consume',
        exact: true,
        component: Consume
      }, {
        name: '进出账',
        path: '/statistics/turnover',
        exact: true,
        component: Turnover
      }, {
        name: '数据看版',
        path: '/statistics/look',
        exact: true,
        component: Look
      }, {
        // 报表统计-渠道统计-当天/总转化/渠道费用
        name: '当天/总转化/渠道费用',
        path: '/statistics/ditchinside',
        exact: true,
        hideInMenu: true,
        component: Ditchinside
      }, {
        //报表统计-还款统计-查看
        name: '查看',
        path: '/statistics/repayinside/:tabName/:id',
        exact: true,
        hideInMenu: true,
        component: Repayinside
      },
    ]
  }, {
    id: 3,
    name: '借款管理',
    path: '/borrow',
    children: [
      {
        name: '待审核',
        path: '/borrow/audit',
        exact: true,
        component: Audit
      }, {
        name: '审核拒绝',
        path: '/borrow/auditrefuse',
        exact: true,
        component: Auditrefuse
      }, {
        name: '借款详情',
        path: '/borrow/auddetail',
        exact: true,
        hideInMenu: true,
        component: Auddetail
      },
    ]
  }, {
    id: 4,
    name: '催收管理',
    path: '/collection',
    children: [
      {
        name: '逾期列表',
        path: '/collection/overdue',
        exact: true,
        component: Colloverdue
      }, {
        name: '催收列表',
        path: '/collection/collection',
        exact: true,
        component: Collection
      }, {
        name: '个人对账',
        path: '/collection/self',
        exact: true,
        component: Self
      }
    ]
  }, {
    id: 5,
    name: '财务管理',
    path: '/finance',
    children: [
      {
        name: '待放款',
        path: '/finance/waitFang',
        exact: true,
        component: WaitFang
      }, {
        name: '待还款',
        path: '/finance/waitHuan',
        exact: true,
        component: WaitHuan
      }, {
        name: '已完成',
        path: '/finance/alreadyWan',
        exact: true,
        component: AlreadyWan
      }, {
        name: '已还款',
        path: '/finance/alreadyHuan',
        exact: true,
        component: AlreadyHuan
      }, {
        name: '当日到期',
        path: '/finance/day',
        exact: true,
        component: Day
      }
    ]
  }, {
    id: 6,
    name: '黑名单管理',
    path: '/black',
    children: [
      {
        name: '黑名单用户',
        path: '/black/blackUser',
        exact: true,
        component: BlackUser
      }
    ]
  }, {
    id: 7,
    name: '认证管理',
    path: '/attestation',
    children: [{
      name: '联系人认证',
      path: '/attestation/contacts',
      exact: true,
      component: Contacts
    }, {
      name: '手机认证',
      path: '/attestation/phone',
      exact: true,
      component: Phone
    }, {
      name: '银行卡认证',
      path: '/attestation/bank',
      exact: true,
      component: Bank
    }, {
      name: '身份证认证',
      path: '/attestation/idcard',
      exact: true,
      component: Idcard
    }, {
      name: '认证参数',
      path: '/attestation/setting',
      exact: true,
      component: Setting
    }]
  }, {
    id: 8,
    name: '系统管理',
    path: '/system',
    children: [{
        name: '用户管理',
        path: '/system/admin',
        exact: true,
        component: Admin
      }, {
        name: '角色管理',
        path: '/system/role',
        exact: true,
        component: Role
      }, {
        name: '区域管理',
        path: '/system/area',
        exact: true,
        component: Area
      }, {
        name: '数据备份',
        path: '/system/backup',
        exact: true,
        component: Backup
      }, {
        name: '借款额度管理',
        path: '/system/borrowlimit',
        exact: true,
        component: Borrowlimit
      }, {
        name: '帮助中心',
        path: '/system/help',
        exact: true,
        component: Help
      }, {
        name: '轮播图管理',
        path: '/system/banner',
        exact: true,
        component: Banner
      }, {
        name: '提额管理',
        path: '/system/quota',
        exact: true,
        component: Quota
      }, {
        name: '版本管理',
        path: '/system/versions',
        exact: true,
        component: Versions
      }
    ]
  }, {
    id: 9,
    name: '推广管理',
    path: '/generalize',
    children: [{
      name: '渠道管理',
      path: '/generalize/channelManage',
      exact: true,
      component: ChannelManage
    }, {
      name: '推广统计',
      path: '/generalize/statistics',
      exact: true,
      component: Statistics
    }, {
      name: '渠道会员',
      path: '/generalize/channelMember',
      exact: true,
      component: ChannelMember
    }]
  }, {
    name: '会员详情',
    path: '/detail',
    exact: true,
    hideInMenu: true,
    component: Detail
  }
]
