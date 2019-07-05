import React, { Component } from 'react'
import { Breadcrumb, Tabs, Button, Table, Loading, Dialog } from 'element-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initSearch } from '@redux/actions'
import { selectIdCardByUserId, selectPhoneDateByUserId, emergency, bankInfo, selectReportMail, selectReport, selectMobileReport } from './action'
import Detailtable from '@components/detailTable'
import { BANK, ADDRESS, CALL_LOG } from '@meta/columns'
import '@styles/detail.less'
import timeDate from '@global/timeDate'
import filter from '@global/filter'
window.onbeforeunload = function(){

}
class Detail extends Component{
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    listInfo: PropTypes.object,
    list: PropTypes.object,
    idCardInfo: PropTypes.object,
    selectIdCardByUserId: PropTypes.func.isRequired,
    selectPhoneDateByUserId: PropTypes.func.isRequired,
    emergency:PropTypes.func.isRequired,
    bankInfo: PropTypes.func.isRequired,
    selectReportMail:PropTypes.func.isRequired,
    selectReport: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    selectMobileReport: PropTypes.func.isRequired,
    mobileData: PropTypes.object
  }
  constructor(props) {
      super(props)
      this.state = {
        dialogVisible: false,
        dialogImageUrl:'',
        name: '',
        title:'',
        linkUrl:'',
        listInfo: {},
        activeName: '1'
      }
  }
	componentWillMount() {
    this.props.initSearch()
    if (this.props.location.state !== undefined) {
      this.setState({
        name: this.props.location.state.name,
        title: this.props.location.state.title,
        linkUrl: this.props.location.state.url,
        listInfo:this.props.listInfo,
        activeName: '1',
        userId: null
      })
    } else {
      const s = JSON.parse(window.sessionStorage.getItem('locationState'))
      const r = JSON.parse(window.sessionStorage.getItem('detailList'))
      this.setState({
        name: s.name,
        title: s.title,
        linkUrl: s.url,
        listInfo:r,
        activeName: window.sessionStorage.getItem('activeName')
      })
    }
	}
	componentDidMount() {
    console.log(this.state.activeName)
    this.tabChange(this.state.activeName)
  }
  tabChange = (e) => {
    window.sessionStorage.setItem('activeName',e)
    this.setState({
      userId: this.state.listInfo.userId ? this.state.listInfo.userId : this.state.listInfo.id
    })
    // const userId = this.state.listInfo.userId ? this.state.listInfo.userId : this.state.listInfo.id
    const { userId } = this.state
    switch (e) {
      case '2':{ // 身份证信息
        return this.props.selectIdCardByUserId({userId: userId})
      }
      case '3':{ // 手机认证
        this.props.selectMobileReport({userId: userId})
        return this.props.selectPhoneDateByUserId({userId: userId})
      }
      case '4':{ // 紧急联系人
        return this.props.emergency({userId: userId})
      }
      case '5':{ // 银行卡信息
        return this.props.bankInfo({userId: userId})
      }
      case '6': // 通讯录
        this.props.initSearch()
        this.props.selectReportMail({userId:userId})
        break
      case '7': // 通话记录
        this.props.initSearch()
        this.props.selectReport({userId:userId})
        break
      default:
        return ''
    }
  }
  text = obj => {
    if(obj){
      const t = JSON.parse(obj)
      return t.living_attack === '0' ? '未检测到活体攻击' : '存在活体攻击风险'
    }
  }
  goReport = () => {
    const { mobileData } = this.props
    const url = `https://tenant.51datakey.com/carrier/mxreport_data?data=${ mobileData.reportData }&contact=${ mobileData.relativesPhone }:${ mobileData.relativesName }:${ mobileData.relatives },${ mobileData.sociologyPhone }:${ mobileData.sociologyName }:${ mobileData.sociology }`
    console.log(url)
    const a = document.createElement('a')
    a.setAttribute('target', 'view_window')
    a.setAttribute('href', url)
    a.click()
    console.log(url)
  }
  openDialog = url => {
		this.setState({
			dialogVisible: true,
			dialogImageUrl: url
		})
	}
	render(){
    const { idCardInfo, list } = this.props
    const { name, title, linkUrl, listInfo, activeName, userId, dialogVisible, dialogImageUrl } = this.state
		return(
			<div>
				<Breadcrumb separator="/" className="margin-bottom15">
					<Breadcrumb.Item>
						<Link to={ linkUrl }>{ title }</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{'用户详情'}</Breadcrumb.Item>
				</Breadcrumb>
        <Tabs activeName={ activeName } onTabClick={ tab => this.tabChange(tab.props.name) }>
          {
              name === '申请信息' &&
              <Tabs.Pane label={ name } name="1">
                <ul className="flex flex-direction_column info-ul">
                  <li className="flex flex-direction_row info-li">
                    <p>{'真实姓名：'}{ listInfo.realName }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'手机号码：'}{ listInfo.phone }</p>
                    <p>{'借款金额：'}{ listInfo.applyMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'申请期限：'}{ listInfo.applyTerm }</p>
                    <p>{'申请时间：'}{ listInfo.gmt }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'审核状态：'}{ filter.auditType(listInfo.state) }</p>
                    <p>{'贷款利率：'}{ timeDate.time(listInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'息费：'}</p>
                    <p>{'服务费：'}{ listInfo.serviceMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'到期应还：'}{ listInfo.repaymentMoney }</p>
                    <p>{'应放金额：'}{ listInfo.loanMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'实际还款：'}{ listInfo.realRepaymentMoney }</p>
                    <p>{'逾期费用：'}{ listInfo.overdueMoney }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'约定还款时间：'}{ listInfo.repaymentDate }</p>
                    <p>{'还款时间：'}{ listInfo.finalDate }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'优惠券：'}</p>
                    <p>{'打款单号：'}{ listInfo.loanNumber }</p>
                  </li>
                  <li className="flex flex-direction_row info-li">
                    <p>{'打款方式：'}{ filter.loanMode(listInfo.loanMode) }</p>
                    <p>{'打款账号：'}{ listInfo.accountNumber }</p>
                  </li>
                </ul>
              </Tabs.Pane>
          }
          {
            name === '用户信息' &&
            <Tabs.Pane label={ name } name="1">
              <ul className="flex flex-direction_column info-ul">
                <li className="flex flex-direction_row info-li">
                  <p>{'真实姓名：'}{ listInfo.realName }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'注册手机：'}{ listInfo.phone }</p>
                  <p>{'会员状态：'}{ listInfo.type === 0? '禁用':'启用' }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'最后登陆时间：'}{ timeDate.time(listInfo.upt, 'yyyy-MM-dd hh:mm:ss') }</p>
                  <p>{'登陆IP地址：'}{ listInfo.loginIp }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'注册时间：'}{ timeDate.time(listInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'家庭住址：'}</p>
                  <p>{'月收入：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'单位名称：'}</p>
                  <p>{'单位电话：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'单位地址：'}</p>
                  <p>{'职业：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'QQ：'}</p>
                  <p>{'微信：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'昵称：'}</p>
                  <p>{'性别：'}</p>
                </li>
                <li className="flex flex-direction_row info-li">
                  <p>{'借款次数：'}{ listInfo.loanNum }</p>
                  <p>{'登陆次数：'}</p>
                </li>
              </ul>
            </Tabs.Pane>
          }
          <Tabs.Pane label="身份证信息" name="2">
            <ul className="flex flex-direction_column info-ul">
              <li className="flex flex-direction_row info-li">
                <p>{'身份证信息'}</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <div className="photo">
                  <img src = { `data:image/jpeg;base64,${ idCardInfo.idcardFrontPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.idcardFrontPhoto }`) } />
                  <p>{'身份证正面'}</p>
                </div>
                <div className="photo">
                  <img src={ `data:image/jpeg;base64,${ idCardInfo.idcardBackPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.idcardBackPhoto }`) } />
                  <p>{'身份证反面'}</p>
                </div>
                <div className="photo">
                  <img src={ `data:image/jpeg;base64,${ idCardInfo.livingPhoto }` } alt="" onClick={ this.openDialog.bind(this,`data:image/jpeg;base64,${ idCardInfo.livingPhoto }`) } />
                  <p>{'人脸照片'}</p>
                </div>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'姓名：'}{ idCardInfo.realName }</p>
                <p>{'性别：'}{ idCardInfo.gender }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'身份证号：'}{ idCardInfo.idNumber}</p>
                <p>{'家庭住址：'}{ idCardInfo.address }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'签发机关：'}{ idCardInfo.issuingAuthority }</p>
                <p>{'有效期：'}{ idCardInfo.validityPeriod }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'实名认证结果：'}{ filter.verifyStatus(idCardInfo.verifyStatus) }</p>
                <p>{'风险标签：'}{ this.text(idCardInfo.riskTag) }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证日期：'}{ timeDate.time(idCardInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
                <p>{'商户唯一订单号：'}{ idCardInfo.partnerOrderId }</p>
              </li>
            </ul>
          </Tabs.Pane>
          <Tabs.Pane label="手机认证" name="3">
            <ul className="flex flex-direction_column info-ul">
              <li className="flex flex-direction_row info-li">
                <p>{'真实姓名：'}{ listInfo.realName }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证手机号：'}{ listInfo.phone }</p>
                <p>{'认证时间：'}{ timeDate.time(listInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证状态：'}{ filter.personalType(listInfo.mobileType) }</p>
              </li>
            </ul>
            <div className="flex flex-direction_row justify-content_flex-end">
              <Button size="small" type="primary" className="margin_top15" onClick={ this.goReport.bind(this) }>{'查看手机报表'}</Button>
            </div>
          </Tabs.Pane>
          <Tabs.Pane label="紧急联系人" name="4">
            <ul className="flex flex-direction_column info-ul">
              <li className="flex flex-direction_row info-li">
                <p>{'真实姓名：'}{ listInfo.realName }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'亲属姓名：'}{ idCardInfo.relativesName }</p>
                <p>{'亲属关系：'}{ idCardInfo.relatives }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'亲属电话：'}{ idCardInfo.relativesPhone }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'社会姓名：'}{ idCardInfo.sociologyName }</p>
                <p>{'社会关系：'}{ idCardInfo.sociology }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'社会电话：'}{ idCardInfo.sociologyPhone }</p>
              </li>
              <li className="flex flex-direction_row info-li">
                <p>{'认证状态：'}{ filter.personalType(idCardInfo.personalType) }</p>
                <p>{'认证时间：'}{ timeDate.time(idCardInfo.gmt, 'yyyy-MM-dd hh:mm:ss') }</p>
              </li>
            </ul>
          </Tabs.Pane>
          <Tabs.Pane label="银行卡信息" name="5">
            <Loading loading={ list.loading }>
              <Table
                style={ { width: '100%' } }
                columns={ BANK }
                data={ list.data }
                border
                stripe
              />
            </Loading>
          </Tabs.Pane>
          <Tabs.Pane label="通讯录" name="6">
            <Detailtable columns={ ADDRESS } num={ 1 } userId={ userId } />
          </Tabs.Pane>
          <Tabs.Pane label="通话记录" name="7">
            <Detailtable columns={ CALL_LOG } num={ 2 } userId={ userId }/>
          </Tabs.Pane>
        </Tabs>
        <Dialog
				visible={ dialogVisible }
				onCancel={ () => this.setState({ dialogVisible: false }) }
        >
					<img width="100%" src={ dialogImageUrl } alt="" />
        </Dialog>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { listInfo, idCardInfo, list, mobileData } = state
	return { listInfo, idCardInfo, list, mobileData }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectIdCardByUserId, selectPhoneDateByUserId, emergency, bankInfo, initSearch, selectReportMail, selectReport, selectMobileReport }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)
