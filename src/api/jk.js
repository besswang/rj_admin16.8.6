export default {
  'managelogin': 'api/login/managelogin', // 用户登陆
  'verifycode': 'api/login/verifycode', // 获取验证码
  'logout': 'api/logout', // 登出
  'channellogin': 'api/login/channellogin', // 渠道登陆
  // 欢迎页
  'selectQu': 'api/chart/selectQu', // 渠道统计-饼图
  'selectLoanRepayment': 'api/chart/selectLoanRepayment', // 放/还款统计-折线
  'selectTotalLogByTime': 'api/order/selectTotalLogByTime', // 查询
  // 会员管理
  'selectUserBySeach': 'api/user/selectUserBySeach', // 会员列表
  'selectIdCardByUserId': 'api/idCard/selectIdCardByUserId', // 会员详情-身份证信息
  'selectPhoneDateByUserId': 'api/phone/selectPhoneDateByUserId', //会员详情-手机认证
  'selectMobileReport': 'api/phone/selectMobileReport', // 查看手机报表
  'selectEmergencyByUserId': 'api/emergency/selectEmergencyByUserId', // 会员详情-紧急联系人
  'selectBankByUserId': 'api/bank/selectBankByUserId', // 会员详情-银行卡信息
  'selectReportMail': 'api/phone/selectReportMail', // 会员详情-通讯录
  'selectReport': 'api/phone/selectReport', // 通话记录
  'updateUserType': 'api/user/updateUserType', // 修改用户禁用状态
  'addUserBlack': 'api/user/addUserBlack', // 添加黑名单
  'removeUserBlack': 'api/user/removeUserBlack', // 移除黑名单
  'selectUserNotApply': 'api/user/selectUserNotApply', // 注册未申请
  'selectUserNoLoan': 'api/user/selectUserNoLoan', // 正常还款未借
  // 报表统计
  'pageChannelCount': 'api/reportForm/pageChannelCount', // 渠道统计
  'pageChannelTheDayCount': 'api/reportForm/pageChannelTheDayCount', // 渠道统计-当天
  'pageChannelTotalCount': 'api/reportForm/pageChannelTotalCount', // 渠道统计-总转化
  'pageChannelCost': 'api/reportForm/pageChannelCost', // 渠道统计-渠道费用
  'pageOverdueCount': 'api/reportForm/pageOverdueCount', // 逾期统计
  'pageLoanCount': 'api/reportForm/pageLoanCount', // 放款统计
  'pageRepaymentCount': 'api/reportForm/pageRepaymentCount', // 还款统计
  'pageCostCount': 'api/reportForm/pageCostCount', // 消耗费用
  'pageInoutCount': 'api/reportForm/pageInoutCount', // 进出账
  'selectDataCheckCount': 'api/reportForm/selectDataCheckCount', // 数据看版
   // 借款管理-待审核
  'selectOrderByParam': 'api/order/selectOrderByParam', // 待审核/审核拒绝列表
  'updataState': 'api/order/updataState', // 操作-通过/拒绝
  // 催收管理-逾期列表
  'selectCollectionByParam': 'api/order/selectCollectionByParam', // 催收列表
  'updateOrderCuishou': 'api/order/updateOrderCuishou', // 分配催收人员
  'selectOverdueByParam': 'api/order/selectOverdueByParam', // 逾期列表
  'selectthePersion': 'api/order/selectthePersion', // 个人对账
  // 财务管理
  'selectPendingLoan': 'api/order/selectPendingLoan', // 待放款
  'updateStateLoan': 'api/order/updateStateLoan', // 拒绝放款
  'selectPendingRepay': 'api/order/selectPendingRepay', // 待还款
  'updateStateComplete': 'api/order/updateStateComplete', // 待还款-还款-全款
  'updateStateDelay': 'api/order/updateStateDelay', // 待还款-还款-延期
  'selectOrderCompleted': 'api/order/selectOrderCompleted', // 已完成
  'selectBill': 'api/bill/selectBill', // 已还款
  'selectTheDayLoan': 'api/order/selectTheDayLoan', // 当日到期
  'insertRemarks': 'api/remarks/insertRemarks', // 备注
  'distributionsCuiShou': 'api/order/distributionsCuiShou', // 分配
  // 黑名单管理
  'selectblackphone': 'api/blackPhone/selectblackphone', // 黑名单用户
  'deleteBlackphone': 'api/blackPhone/deleteBlackphone', // 删除黑名单
  'importExcel': 'api/blackPhone/importExcel', // 导入黑明单
  // 认证管理
  'selectEmergency': 'api/emergency/selectEmergency', // 联系人认证
  'deleteEmergency': 'api/emergency/deleteEmergency', // 联系人认证删除
  'selectPhoneDate': 'api/phone/selectPhoneDate', // 手机认证
  'deletePhoneDate': 'api/phone/deletePhoneDate', // 手机认证删除
  'selectBank': 'api/bank/selectBank', // 银行卡认证
  'deleteBankByUserId': 'api/bank/deleteBankByUserId', // 银行卡认证-删除
  'selectIdCard': 'api/idCard/selectIdCard', // 身份证认证
  'deleteIdCard': 'api/idCard/deleteIdCard', // 身份证认证-删除
  'selectAuthentication': 'api/authentication/selectAuthentication', // 认证参数
  'updateStatus': 'api/authentication/updateStatus', // 认证参数-是否显示
  'updateLoanType': 'api/authentication/updateLoanType', // 借款是否必须认证
  'updateSort': 'api/authentication/updateSort', // 排序
  // 系统管理-用户管理
  'pageAdmin': 'api/admin/pageAdmin', // 列表
  'addAdmin': 'api/admin/addAdmin', // 添加用户
  'updateAdmin': 'api/admin/updateAdmin', // 编辑用户
  // 系统管理-角色管理
  'pageRole': 'api/role/pageRole', // 列表
  'deleteRole': 'api/role/deleteRole', // 删除
  'addRole': 'api/role/addRole', // 添加
  'selectRolemenus': 'api/rolemenu/selectRolemenus', // 权限设置-menu
  'updateRolemenus': 'api/rolemenu/updateRolemenus', //权限设置-提交
  // 系统管理-区域管理
  // 'selectAreas': 'api/area/selectAreas', // 列表
  'selectAreasById': 'api/area/selectAreasById', // 列表
  'updateAreaState': 'api/area/updateAreaState', // 启用/禁用
  // 系统管理-数据备份
  'pageBackup': 'api/sqlCopy/pageBackup',
  'backup': 'api/sqlCopy/backup', // 备份
  // 系统管理-借款额度管理
  'pageQuota': 'api/quota/pageQuota', //列表
  'addQuota': 'api/quota/addQuota', // 添加
  'deleteQuota': 'api/quota/deleteQuota', // 删除
  'updateQuota': 'api/quota/updateQuota', // 修改
  // 系统管理-帮助中心
  'pageGlobalconfig': 'api/globalConfig/pageGlobalconfig', //列表
  'updateGlobalConfig': 'api/globalConfig/updateGlobalConfig', // 编辑
  // 轮播图管理
  'pageRotationChart': 'api/rotationChart/pageRotationChart', // 列表
  'deleteRotationChart': 'api/rotationChart/deleteRotationChart', // 删除
  'updateRotationChart': 'api/rotationChart/updateRotationChart', // 上/下架
  // 提额管理
  'pageuserQuota': 'api/userQuota/pageuserQuota', // 列表
  'adduserquota': 'api/userQuota/adduserquota', // 添加
  'updateuserquota': 'api/userQuota/updateuserquota', // 编辑
  'deleteuserquota': 'api/userQuota/deleteuserquota', // 删除
  // 版本管理
  'pageAppversion': 'api/appversion/pageAppversion', // 列表
  'addAppversion': 'api/appversion/addAppversion', // 添加
  'updateAppversion': 'api/appversion/updateAppversion', // 编辑
  // 推广管理
  'selectChannel': 'api/channel/selectChannel', // 渠道管理
  'insertChannel': 'api/channel/insertChannel', // 渠道管理-添加
  'updateChannel': 'api/channel/updateChannel', // 渠道管理-编辑
  'prohibitChannel': 'api/channel/prohibitChannel', // 渠道管理-禁用
  'selectPromotionStatistics': 'api/order/selectPromotionStatistics', // 推广统计
  'selectChannelMember': 'api/user/selectChannelMember', // 渠道会员
  // select-渠道名称搜索
  'selectAllChannel': 'api/channel/selectAllChannel',
  'allRoles': 'api/role/allRoles',
  'selectAllAdmin': 'api/admin/selectAllAdmin', // 根据角色id查询多个用户
}