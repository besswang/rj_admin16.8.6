// api文件存放接口文件夹,测试线
import Fetch from '../fetch/index'
// easy mock 模拟数据
// import Fetch from '../fetch/easyMock'
// yapi mock 模拟数据
// import Fetch from '../fetch/yapiMock'
import jk from './jk'
export default {
  manageloginApi: params => Fetch(jk.managelogin, {method: 'post', body: params}),
  verifycodeApi: params => Fetch(jk.verifycode, {method: 'get', data: params}),
  logoutApi: () => Fetch(jk.logout, {method: 'get'}),
  selectQuApi: () => Fetch(jk.selectQu, {method: 'get'}),
  channelloginApi: params => Fetch(jk.channellogin, {method: 'post', body: params}),
  selectLoanRepaymentApi: params => Fetch(jk.selectLoanRepayment, {method: 'get', data: params}),
  selectTotalLogByTimeApi: params => Fetch(jk.selectTotalLogByTime, {method: 'get', data: params}),
  selectUserBySeachApi: params => Fetch(jk.selectUserBySeach, {method: 'post', body: params}),
  updateUserTypeApi: params => Fetch(jk.updateUserType, {method: 'get', data: params}),
  addUserBlackApi: params => Fetch(jk.addUserBlack, {method:'post', body: params}),
  removeUserBlackApi: params => Fetch(jk.removeUserBlack, {method: 'delete', data: params}),
  selectOrderByParamApi: params => Fetch(jk.selectOrderByParam, {method: 'post', body: params}),
  updataStateApi: params => Fetch(jk.updataState, {method: 'get', data: params}),
  selectUserNotApplyApi: params => Fetch(jk.selectUserNotApply, {method: 'post', body: params}),
  selectUserNoLoanApi: params => Fetch(jk.selectUserNoLoan, {method: 'post', body: params}),
  pageChannelCountApi: params => Fetch(jk.pageChannelCount, {method: 'post', body: params}),
  pageOverdueCountApi: params => Fetch(jk.pageOverdueCount, {method: 'post', body: params}),
  selectIdCardByUserIdApi: params => Fetch(jk.selectIdCardByUserId, {method: 'get', data: params}),
  selectPhoneDateByUserIdApi: params => Fetch(jk.selectPhoneDateByUserId, {method: 'get', data: params}), // 详情-手机认证
  selectEmergencyByUserIdApi: params => Fetch(jk.selectEmergencyByUserId, {method: 'get', data: params} ),
  selectBankByUserIdApi: params => Fetch(jk.selectBankByUserId, {method: 'get', data: params}),
  selectReportMailApi: params => Fetch(jk.selectReportMail, {method: 'get', data: params}),
  pageLoanCountApi: params => Fetch(jk.pageLoanCount, {method: 'post', body: params}),
  pageRepaymentCountApi: params => Fetch(jk.pageRepaymentCount, {method: 'post', body: params}),
  pageCostCountApi: params => Fetch(jk.pageCostCount, {method: 'post', body: params}),
  pageInoutCountApi: params => Fetch(jk.pageInoutCount, {method: 'post', body: params}),
  selectDataCheckCountApi: () => Fetch(jk.selectDataCheckCount, {method: 'get'}),
  selectOverdueByParamApi: params => Fetch(jk.selectOverdueByParam, {method: 'post', body: params}),
  selectCollectionByParamApi: params => Fetch(jk.selectCollectionByParam, {method: 'post', body: params}),
  selectthePersionApi: params => Fetch(jk.selectthePersion, {method: 'post', body: params}),
  selectPendingLoanApi: params => Fetch(jk.selectPendingLoan, {method: 'post', body: params}),
  updateStateLoanApi: params => Fetch(jk.updateStateLoan, {method: 'put', body: params}),
  selectPendingRepayApi: params => Fetch(jk.selectPendingRepay, {method: 'post', body: params}),
  selectOrderCompletedApi: params => Fetch(jk.selectOrderCompleted, {method: 'post', body: params}),
  selectBillApi: params => Fetch(jk.selectBill, {method: 'post', body: params}),
  selectTheDayLoanApi: params => Fetch(jk.selectTheDayLoan, {method: 'post', body: params}),
  selectblackphoneApi: params => Fetch(jk.selectblackphone, {method: 'post', body: params}),
  deleteBlackphoneApi: params => Fetch(jk.deleteBlackphone, {method: 'delete', data: params}),
  selectEmergencyApi: params => Fetch(jk.selectEmergency, {method: 'post', body: params}),
  deleteEmergencyApi: params => Fetch(jk.deleteEmergency, {method: 'get', data: params}),
  selectPhoneDateApi: params => Fetch(jk.selectPhoneDate, {method: 'post', body: params}),
  deletePhoneDateApi: params => Fetch(jk.deletePhoneDate, {method: 'get', data: params}),
  selectBankApi: params => Fetch(jk.selectBank, {method: 'post', body: params}),
  deleteBankByUserIdApi: params => Fetch(jk.deleteBankByUserId, {method: 'get', data: params}),
  selectIdCardApi: params => Fetch(jk.selectIdCard, {method: 'post', body: params}),
  deleteIdCardApi: params => Fetch(jk.deleteIdCard, {method: 'get', data: params}),
  insertRemarksApi: params => Fetch(jk.insertRemarks, {method: 'post', body: params}),
  selectAuthenticationApi: params => Fetch(jk.selectAuthentication, {method: 'post', body: params}),
  updateStatusApi: params => Fetch(jk.updateStatus, {method: 'get', data: params}),
  updateLoanTypeApi: params => Fetch(jk.updateLoanType, {method: 'get', data: params}),
  updateSortApi: params => Fetch(jk.updateSort, {method: 'get', data: params}),
  pageQuotaApi: params => Fetch(jk.pageQuota, {method: 'post', body: params}),
  pageRoleApi: params => Fetch(jk.pageRole, {method: 'post', body: params}),
  deleteRoleApi: params => Fetch(jk.deleteRole, {method: 'delete', data: params}),
  addRoleApi: params => Fetch(jk.addRole, {method: 'post', body: params}),
  selectRolemenusApi: params => Fetch(jk.selectRolemenus, {method: 'get', data: params}),
  updateRolemenusApi: params => Fetch(jk.updateRolemenus, {method: 'post', body: params}),
  selectPromotionStatisticsApi: params => Fetch(jk.selectPromotionStatistics, {method: 'post', body: params}),
  selectAllChannelApi: params => Fetch(jk.selectAllChannel, {method: 'post', body: params}),
  selectChannelMemberApi: params => Fetch(jk.selectChannelMember, {method: 'post', body: params}),
  selectChannelApi: params => Fetch(jk.selectChannel, {method: 'post', body: params}),
  insertChannelApi: params => Fetch(jk.insertChannel, {method: 'post', body: params}),
  updateChannelApi: params => Fetch(jk.updateChannel, {method: 'put', body: params}),
  prohibitChannelApi: params => Fetch(jk.prohibitChannel, {method: 'put', body: params}),
  pageAdminApi: params => Fetch(jk.pageAdmin, {method: 'post', body: params}),
  allRolesApi: params => Fetch(jk.allRoles, {method: 'post', body: params}),
  addAdminApi: params => Fetch(jk.addAdmin, {method: 'post', body: params}),
  updateAdminApi: params => Fetch(jk.updateAdmin, {method: 'post', body: params}),
  pageBackupApi: params => Fetch(jk.pageBackup, {method: 'post', body: params}),
  backupApi: params => Fetch(jk.backup, {method: 'post', body: params}),
  pageGlobalconfigApi: params => Fetch(jk.pageGlobalconfig, {method: 'post', body: params}),
  deleteQuotaApi: params => Fetch(jk.deleteQuota, {method: 'delete', data: params}),
  addQuotaApi: params => Fetch(jk.addQuota, {method: 'post', body: params}),
  updateQuotaApi: params => Fetch(jk.updateQuota, {method: 'post', body: params}),
  updateGlobalConfigApi: params => Fetch(jk.updateGlobalConfig, {method: 'post', body: params}),
  pageRotationChartApi: params => Fetch(jk.pageRotationChart, {method: 'post', body: params}),
  deleteRotationChartApi: params => Fetch(jk.deleteRotationChart, {method: 'delete', data: params}),
  updateRotationChartApi: params => Fetch(jk.updateRotationChart, {method: 'post', body: params}),
  pageuserQuotaApi: params => Fetch(jk.pageuserQuota, {method: 'post', body: params}),
  selectReportApi: params => Fetch(jk.selectReport, {method: 'get', data: params}),
  pageChannelTheDayCountApi: params => Fetch(jk.pageChannelTheDayCount, {method: 'post', body: params}),
  pageChannelTotalCountApi: params => Fetch(jk.pageChannelTotalCount, {method: 'post', body: params}),
  pageChannelCostApi: params => Fetch(jk.pageChannelCost, {method: 'post', body: params}),
  updateStateCompleteApi: params => Fetch(jk.updateStateComplete, {method: 'put', body: params}),
  updateStateDelayApi: params => Fetch(jk.updateStateDelay, {method: 'put', body: params}),
  selectMobileReportApi: params => Fetch(jk.selectMobileReport, {method: 'get', data: params}),
  adduserquotaApi: params => Fetch(jk.adduserquota, {method: 'get', data: params}),
  updateuserquotaApi: params => Fetch(jk.updateuserquota, {method: 'put', body: params}),
  deleteuserquotaApi: params => Fetch(jk.deleteuserquota, {method: 'delete', data: params}),
  pageAppversionApi: params => Fetch(jk.pageAppversion, {method: 'post', body: params}),
  addAppversionApi: params => Fetch(jk.addAppversion, {method: 'post', body: params}),
  updateAppversionApi: params => Fetch(jk.updateAppversion, {method: 'put', body: params}),
  selectAllAdminApi: params => Fetch(jk.selectAllAdmin, {method: 'get', data: params}),
  updateOrderCuishouApi: params => Fetch(jk.updateOrderCuishou, {method: 'put', body: params}),
  importExcelApi: params => Fetch(jk.importExcel, {method: 'post', body: params, headers:{
    'Content-Type': 'multipart/form-data'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }}),
  distributionsCuiShouApi: params => Fetch(jk.distributionsCuiShou, {method: 'put', body: params}),
  selectAreasByIdApi: params => Fetch(jk.selectAreasById, {method: 'get', data: params}),
  updateAreaStateApi: params => Fetch(jk.updateAreaState, {method: 'post', body: params}),
  toLoanApi: params => Fetch(jk.toLoan, {method: 'get', data: params}),
  toLoanBankApi: params => Fetch(jk.toLoanBank, {method: 'put', body: params}),
  selectUnAllowableAreaApi: params => Fetch(jk.selectUnAllowableArea, {method: 'post', body:params}),
  updateNextApplyTimeApi: params => Fetch(jk.updateNextApplyTime, {method: 'get', data: params}),
  findAllLiftingAmountApi: params => Fetch(jk.findAllLiftingAmount, {method: 'post', body:params}),
  findMinAndCappingMoneyApi: params => Fetch(jk.findMinAndCappingMoney, {method: 'get', data: params}),
  addLiftingAmountApi: params => Fetch(jk.addLiftingAmount, {method: 'post', body:params}),
  updateLiftingAmountApi: params => Fetch(jk.updateLiftingAmount, {method: 'post', body:params}),
  updateMinAndCappingMoneyApi: params => Fetch(jk.updateMinAndCappingMoney, {method: 'get', data: params}),
  findDelayRateApi: params => Fetch(jk.findDelayRate, {method: 'get', data:params}),
  bindingRateApi: params => Fetch(jk.bindingRate, {method: 'post', body:params}),
  deleteDelayRateApi: params => Fetch(jk.deleteDelayRate, {method: 'delete', data: params}),
  findRepaymentMoneyApi: params => Fetch(jk.findRepaymentMoney, {method: 'get', data:params}),
  findAllDelayRateApi: params => Fetch(jk.findAllDelayRate, {method: 'post', body:params}),
  updateStateReductionApi: params => Fetch(jk.updateStateReduction, {method: 'put', body: params}),
  addRechargeApi: params => Fetch(jk.addRecharge, {method: 'post', body:params}),
  pageRechargeApi: params => Fetch(jk.pageRecharge, {method: 'post', body:params}),
  selectGlobalValueApi: () => Fetch(jk.selectGlobalValue, {method: 'post'}),
  selectAdminLoginByNameApi: params => Fetch(jk.selectAdminLoginByName, {method: 'get', data:params}),
  insertRotationChartApi: params => Fetch(jk.insertRotationChart, {method: 'get', data:params}),
  selectTextConfigApi: () => Fetch(jk.selectTextConfig, {method: 'get'}),
  selectSeniorConfigApi: () => Fetch(jk.selectSeniorConfig, {method: 'get'}),
  updateGlobalConfigsApi: params => Fetch(jk.updateGlobalConfigs, {method: 'put', body: params})
}

