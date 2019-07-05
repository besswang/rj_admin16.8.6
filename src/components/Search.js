import React, { Component } from 'react'
import { Form, Input } from 'element-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { selectSubreddit, selectSearchText,saveRealName, saveTime, registerTime, initSearch, changeClient, changeTimeType, selectAllChannel,selectChannel, allRoles, changeRole, changeAdminName, changeLoanType, changeColl, changeAllot, changePayTypeId } from '@redux/actions'
import SelectPicker from '@components/SelectPicker'
import Time from '@components/Settime'
import { MLIST_SELECT, AUDIT_SELECT, AUDIT_SELECT_LESS, CUSTOMER_SELECT, TIME_SELECT, TIME_SELECT_LESS, LOAN_TYPE, LOAN_MODE,ALLOT_TYPE } from '@meta/select'
class Search extends Component {
  static propTypes = {
    showRealName: PropTypes.bool,
    showSelectClient: PropTypes.bool,
    showSelectTime: PropTypes.bool,
    showSelectTime2: PropTypes.bool,
    showTime: PropTypes.bool,
    showBeginTime: PropTypes.bool,
    showSelect1: PropTypes.bool,
    showSelect2: PropTypes.bool,
    showSelect3: PropTypes.bool,
    showLoanType: PropTypes.bool,
    showLoanMode: PropTypes.bool,
    showAllotType: PropTypes.bool,
    typeId: PropTypes.number,
    newClient: PropTypes.number,
    selectTime: PropTypes.number,
    typeName: PropTypes.string,
    realName: PropTypes.string,
    time: PropTypes.array,
    regTime: PropTypes.array,
    children: PropTypes.object.isRequired,
    selectSubreddit: PropTypes.func.isRequired,
    selectSearchText: PropTypes.func.isRequired,
    saveRealName: PropTypes.func.isRequired,
    saveTime: PropTypes.func.isRequired,
    registerTime: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    changeClient: PropTypes.func.isRequired,
    changeTimeType: PropTypes.func.isRequired,
    channelList: PropTypes.array,
    selectAllChannel: PropTypes.func.isRequired,
    showChannel: PropTypes.bool,
    selectChannel: PropTypes.func.isRequired,
    channelName: PropTypes.string,
    roleList: PropTypes.array,
    showRole: PropTypes.bool,
    allRoles: PropTypes.func.isRequired,
    changeRole: PropTypes.func.isRequired,
    roleId:PropTypes.number,
    showAdminName: PropTypes.bool,
    changeAdminName: PropTypes.func.isRequired,
    adminName:PropTypes.string,
    changeLoanType: PropTypes.func.isRequired,
    loanType: PropTypes.number,
    showColl: PropTypes.bool,
    neiCuiId: PropTypes.number,
    changeColl: PropTypes.func.isRequired,
    collList: PropTypes.array,
    changeAllot: PropTypes.func.isRequired,
    isTheDay:PropTypes.number,
    payTypeId: PropTypes.number,
    changePayTypeId: PropTypes.func.isRequired
  }
  componentWillMount() {
    // 查询表单的初始化
    this.props.initSearch()
    if(this.props.showChannel){
      this.props.selectAllChannel()
    }
    if(this.props.showRole){
      this.props.allRoles()
    }
    if (this.props.showColl){
      this.props.allRoles(true)
    }
  }
  render() {
    const { typeId, typeName, realName, time, regTime, newClient, selectTime, showSelectClient, showSelectTime, showSelectTime2, showTime, showSelect1, showSelect2, showSelect3, showLoanType, showLoanMode, showBeginTime,showAllotType, showRealName, showChannel, channelList,channelName, roleList, showRole, roleId, showAdminName, adminName, loanType,showColl, neiCuiId, collList, isTheDay, payTypeId } = this.props
    return (
      <Form inline>
        {
          showAdminName &&
          <Form.Item>
            <Input
              value={ adminName }
              onChange={ val => this.props.changeAdminName(val) }
              placeholder="请输入账号"
              clearable="true"
            />
          </Form.Item>
        }
        {
          showRole &&
          <Form.Item>
            <SelectPicker
              value={ roleId }
              onChange={ e => this.props.changeRole(e) }
              options={ roleList }
              placeholder={ '选择角色' }
            />
          </Form.Item>
        }
        {
          showChannel &&
          <Form.Item>
            <SelectPicker
              stringValue={ channelName }
              onChange={ e => this.props.selectChannel(e) }
              options={ channelList }
              placeholder={ '选择渠道名称' }
            />
          </Form.Item>
        }

        {
          showLoanMode &&
          <Form.Item>
            <SelectPicker
              value={ payTypeId }
              onChange={ e => this.props.changePayTypeId(e) }
              options={ LOAN_MODE }
              placeholder={ '选择支付方式' }
            />
          </Form.Item>
        }
        {
          showSelect1 &&
          <Form.Item>
            <SelectPicker
              value={ typeId }
              onChange={ e => this.props.selectSubreddit(e) }
              options={ MLIST_SELECT }
            />
          </Form.Item>
        }
        {
          showSelect2 &&
          <Form.Item>
            <SelectPicker
              value={ typeId }
              onChange={ e => this.props.selectSubreddit(e) }
              options={ AUDIT_SELECT }
            />
          </Form.Item>
        }
        {
          showSelect3 &&
          <Form.Item>
            <SelectPicker
              value={ typeId }
              onChange={ e => this.props.selectSubreddit(e) }
              options={ AUDIT_SELECT_LESS }
            />
          </Form.Item>
        }
        {
          (showSelect1 || showSelect2 || showSelect3) && typeId !== 0 &&
          <Form.Item>
            <Input
              value={ typeName }
              onChange={ val => this.props.selectSearchText(val) }
              placeholder="请输入内容"
              clearable="true"
            />
          </Form.Item>
        }
        {
          showColl &&
          <Form.Item>
            <SelectPicker
              value={ neiCuiId }
              onChange={ e => this.props.changeColl(e) }
              options={ collList }
              placeholder={ '选择催收人员' }
            />
          </Form.Item>
        }
        {
          showRealName &&
          <Form.Item>
            <Input
              value={ realName }
              onChange={ val => this.props.saveRealName(val) }
              placeholder="请输入真实姓名"
              clearable="true"
            />
          </Form.Item>
        }
        {
          showLoanType &&
          <Form.Item>
            <SelectPicker
              value={ loanType }
              onChange={ e => this.props.changeLoanType(e) }
              options={ LOAN_TYPE }
              placeholder={ '选择借贷类型' }
            />
          </Form.Item>
        }
        { showSelectClient &&
          <Form.Item>
            <SelectPicker
              value={ newClient }
              onChange={ e => this.props.changeClient(e) }
              options={ CUSTOMER_SELECT }
              placeholder={ '选择客户类型' }
            />
          </Form.Item>
        }
         { showAllotType &&
          <Form.Item>
            <SelectPicker
              value={ isTheDay }
              onChange={ e => this.props.changeAllot(e) }
              options={ ALLOT_TYPE }
              placeholder={ '选择分配状态' }
            />
          </Form.Item>
        }
        {
          showSelectTime &&
          <Form.Item>
            <SelectPicker
              value={ selectTime }
              onChange={ e => this.props.changeTimeType(e) }
              options={ TIME_SELECT }
              placeholder={ '选择日期类型' }
            />
          </Form.Item>
        }
        {
          showSelectTime2 &&
          <Form.Item>
            <SelectPicker
              value={ selectTime }
              onChange={ e => this.props.changeTimeType(e) }
              options={ TIME_SELECT_LESS }
              placeholder={ '选择日期类型' }
            />
          </Form.Item>
        }
        {
          (showTime || selectTime !==0) &&
          <Form.Item>
            <Time
              value={ time }
              onChange={ val => this.props.saveTime(val) }
            />
          </Form.Item>
        }
        <Form.Item>
          <Input type="number" placeholder="请输入分控分(最小)" />
        </Form.Item>
        <Form.Item>{'~'}</Form.Item>
        <Form.Item>
          <Input type="number" placeholder="请输入分控分(最大)" />
        </Form.Item>
        {
          showBeginTime &&
          <Form.Item>
            <Time
              value={ regTime }
              onChange={ val => this.props.registerTime(val) }
            />
          </Form.Item>
        }
        <Form.Item>
          { this.props.children }
        </Form.Item>
      </Form>
    )
  }
}
const mapStateToProps = state => {
	const {
		typeId, typeName, time, regTime, newClient, selectTime, realName, channelList, channelName, roleList, roleId, adminName
	,loanType, neiCuiId, collList, isTheDay, payTypeId} = state
	return {
		typeId, typeName, time, regTime, newClient, selectTime, realName, channelList, channelName, roleList, roleId, adminName, loanType, neiCuiId, collList, isTheDay, payTypeId
	}
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectSubreddit, selectSearchText, saveRealName, saveTime, registerTime, initSearch, changeClient, changeTimeType,selectAllChannel ,selectChannel, allRoles, changeRole, changeAdminName, changeLoanType, changeColl, changeAllot, changePayTypeId }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
