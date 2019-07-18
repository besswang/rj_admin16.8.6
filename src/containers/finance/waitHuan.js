// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Form, Input, Tabs, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectPendingRepay, updateStateComplete, updateStateDelay, findAllDelayRate, updateStateReduction } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
import SelectPicker from '@components/SelectPicker'
import { REPAYMENT_TYPE } from '@meta/select'
import DetailBtn from '@components/DetailBtn'
import { dwaitHuan } from '@meta/details'
import api from '@api/index'
import SelectDay from '@components/SelectDay'
import validate from '@global/validate'
class WaitHuan extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		btnLoading: PropTypes.bool.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectPendingRepay: PropTypes.func.isRequired,
		updateStateComplete: PropTypes.func.isRequired,
		updateStateDelay: PropTypes.func.isRequired,
		findAllDelayRate: PropTypes.func.isRequired,
		updateStateReduction: PropTypes.func.isRequired,
		dayList: PropTypes.arrayOf(
			PropTypes.object.isRequired
		)
  }
	constructor(props) {
		super(props)
		this.state = {
			listObj:{},
			channelName:'',
			delayNumber: null, // 延期天数
			reMoney: null, // 延期金额
			delayRate:null, // 费率
			surplusMoney: null, // 剩余应还金额
			activeName: '1',
			orderNumber:'', // 订单号
			realRepaymentMoney: null, // 应还金额
			applyMoney: null, // 借款金额
			serviceMoney: null, // 服务费
			orderId: null,
			loanDate: '', // 放款时间
			repaymentDate: '', // 约定还款日
			dialogVisible: false,
			form: {
				repaymentType: 3, // 还款方式（3:线下支付宝，4：线下微信）
				repaymentMoney:null, // 还款金额
				payNumber: null, // 支付单号
				dayValue: null,
				principalReductionMoney:null, // 本金减免
				rateReductionMoney: null, // 利息减免
				overdueReductionMoney: null, // 逾期减免
				serviceReductionMoney: null, // 服务费减免
			},
			rules: {
				principalReductionMoney: [{required: true, validator: validate.numEmpty}],
				rateReductionMoney: [{required: true, validator: validate.numEmpty}],
				overdueReductionMoney: [{required: true, validator: validate.numEmpty}],
				serviceReductionMoney: [{required: true, validator: validate.numEmpty}],
				dayValue: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择延期天数'))
						} else {
							callback()
						}
					}
				}],
				repaymentType: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择还款方式'))
						} else {
							callback()
						}
					}
				}],
				repaymentMoney: [{required: true, validator: validate.numEmpty}],
				payNumber: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入支付单号'))
						} else {
							callback()
						}
					}
				}]
			},
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '渠道名称',
					prop: 'channelName'
				}, {
					label: '新老客户',
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						const data = filter.loanTerm(row.loanTerm)
						return data
					}
				}, {
					label: '真实姓名',
					prop: 'realName'
				}, {
					label: '米融分',
					prop: 'riskNum'
				}, {
					label: '手机号码',
					prop: 'phone'
				}, {
					label: '身份证号',
					prop: 'idcardNumber'
				}, {
					label: '申请金额',
					prop: 'applyMoney'
				}, {
					label: '申请期限',
					prop: 'applyTerm'
				}, {
					label: '服务费',
					prop: 'serviceMoney'
				}, {
					label: '放款金额',
					prop: 'loanMoney'
				}, {
					label: '应还金额',
					prop: 'repaymentMoney'
				}, {
					label: '约定还款日',
					prop: 'finalDate'
				}, {
					label: '借款次数',
					prop: 'loanTerm'
				}, {
					label: '申请时间',
					prop: 'upt',
					width: 120,
					render: row => {
						const date = timeDate.time(row.upt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '审核客服',
					prop: 'examineCustomerName'
				}, {
					label: '审核时间',
					prop: 'examineDate',
					width:120,
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '打款状态',
					prop: 'payStatus',
					render: row => {
						const data = filter.payStatus(row.payStatus)
						return data
					}
				}, {
					label: '申请单号',
					prop: 'orderNumber'
				}, {
					label: '银行名称',
					prop: 'bankName'
				}, {
					label: '银行卡号',
					prop: 'bankNumber'
				}, {
					label: '操作',
					fixed: 'right',
					width:180,
					render: row => {
							return (
								<div className="flex flex-direction_row">
									<Button className="margin_right10" type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>
										{'还款'}
									</Button>
									<DetailBtn linkTo={ dwaitHuan } row={ row } />
								</div>
							)
					}
      }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		window.sessionStorage.removeItem('locationState')
		window.sessionStorage.removeItem('detailList')
  }
  componentDidMount() {
		this.props.selectPendingRepay()
		const sess = {
			name: '申请信息',
			title: '待还款',
			url: '/finance/waitHuan'
		}
		window.sessionStorage.setItem('locationState', JSON.stringify(sess))
		// this.props.findAllDelayRate()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectPendingRepay()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectPendingRepay()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectPendingRepay()
	}
	onChange(key, value) {
		console.log(key)
		console.log(value)
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
		if (key === 'dayValue'){
			const day = this.props.dayList.filter(item => item.id === value)
			this.setState({
				delayRate: day[0].delayRate,
				reMoney: day[0].delayRate * this.state.applyMoney,
				delayNumber: day[0].dayNum
			})
		}
	}
	openDialog = obj => {
		this.setState({
			listObj: obj,
			channelName: obj.channelName,
			dialogVisible: true,
			orderId: obj.id,
			orderNumber: obj.orderNumber, // 订单号
			realRepaymentMoney: obj.realRepaymentMoney, // 应还金额
			applyMoney: obj.applyMoney, // 借款金额
			reMoney: obj.applyMoney, // 延期金额
			serviceMoney: obj.serviceMoney, // 服务费
			loanDate: obj.loanDate, // 放款时间
			repaymentDate: obj.repaymentDate, // 约定还款日
		})
		this.tabClick('1')
		this.form.resetFields()
		this.findRepaymentMoney(obj.id)
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const obj = {}
				const { activeName, form, orderId } = this.state
				for(const a in form){
					if (form[a]){
						obj[a] = form[a]
					}
				}
				const adminObj = JSON.parse(window.sessionStorage.getItem('adminInfo'))
				const { delayNumber, delayRate, reMoney } = this.state
				const data = Object.assign({}, obj, {orderId:orderId},{adminName:adminObj.adminName})
				if(activeName === '1'){ // 还款
					this.props.updateStateComplete(data)
				} else if (activeName === '2') { // 延期
					const trans = Object.assign({},data,{delayNumber:delayNumber},{delayRate:delayRate},{reMoney:reMoney})
					this.props.updateStateDelay(trans)
				} else { // 减免
					this.props.updateStateReduction(data)
				}
				this.setState({
					dialogVisible: false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	tabClick = v => {
		this.setState({
			activeName: v
		})
		this.form.resetFields()
		if(v === '2'){
			this.props.findAllDelayRate(this.state.channelName)
		}
	}
	findRepaymentMoney = async (id) => {
		const res = await api.findRepaymentMoneyApi({id:id})
		if(res.success){
			this.setState({
				surplusMoney: res.data
			})
		}else{
			Message.error(res.msg)
		}
	}
	valiNum = num => {
		if(num<0){
			Message.warning('金额不能为负数')
		}
	}
	render() {
		const { list, btnLoading, dayList } = this.props
		const { columns, dialogVisible, form, rules, orderNumber, realRepaymentMoney, applyMoney, serviceMoney, loanDate, repaymentDate, activeName, surplusMoney, reMoney, listObj } = this.state
		return (
			<div>
				<Search showSelect2 showLoanType showSelectClient showSelectTime>
					<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
						data={ list.data }
						border
						stripe
					/>
				</Loading>
        <MyPagination
          total={ list.total }
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
				<Dialog
					title="线下还款"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Tabs activeName={ activeName } onTabClick={ (tab) => this.tabClick(tab.props.name) }>
							<Tabs.Pane label="还款" name="1"></Tabs.Pane>
							<Tabs.Pane label="延期" name="2"></Tabs.Pane>
							{/* <Tabs.Pane label="部分还款" name="3"></Tabs.Pane> */}
							<Tabs.Pane label="减免" name="3"></Tabs.Pane>
						</Tabs>
						{
							(activeName === '1' || activeName === '2') &&
							<ul className="flex flex-direction_column margin-bottom15">
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'订单号:'}{ orderNumber }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'应还金额:'}{ realRepaymentMoney }</p>
									<p>{'借款金额:'}{ applyMoney }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'服务费:'}{ serviceMoney }</p>

									<p>{'借款期限:'}{ timeDate.time(loanDate, 'yyyy-MM-dd hh:mm:ss') }{'-'}{ repaymentDate }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									{/* 剩余应还=剩余应还-还款金额 */}
									<p className="red">{'剩余应还:'}{ surplusMoney-form.repaymentMoney }
										{this.valiNum(surplusMoney-form.repaymentMoney)}
									</p>
									{/* 延期天数中的百分比 * 借款金额 = 延期金额 */}
									{
										activeName === '2' &&
										<p>{'延期金额:'}{ reMoney }</p>
									}
								</li>
							</ul>
						}
						{
							(activeName === '3') &&
							<ul className="flex flex-direction_column margin-bottom15">
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p>{'应还金额:'}{ realRepaymentMoney }</p>
								</li>
								<li className="flex flex-direction_row justify-content_flex-justify ptb5">
									<p className="red">{'剩余应还:'}{ surplusMoney-form.repaymentMoney }
										{this.valiNum(surplusMoney-form.repaymentMoney)}
									</p>
									{/* （应还-本金减免-利息-逾期-服务费=本金结算） */}
									<p>{'本金结算:'}{ surplusMoney-form.principalReductionMoney-form.rateReductionMoney-form.overdueReductionMoney-form.serviceReductionMoney }</p>
									{this.valiNum(surplusMoney-form.principalReductionMoney-form.rateReductionMoney-form.overdueReductionMoney-form.serviceReductionMoney)}
								</li>
							</ul>
						}
						<Form labelWidth="110" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="还款方式" prop="repaymentType">
								<SelectPicker
									value={ form.repaymentType }
									clearable={ 1 }
									onChange={ this.onChange.bind(this, 'repaymentType') }
									options={ REPAYMENT_TYPE }
									placeholder={ '选择还款方式' }
								/>
							</Form.Item>
							{
								activeName === '1' &&
								<Form.Item label="还款金额" prop="repaymentMoney">
									<Input type="number" value={ form.repaymentMoney } onChange={ this.onChange.bind(this, 'repaymentMoney') } />
								</Form.Item>
							}
							{
								activeName === '2' &&
								<Form.Item label="延期天数" prop="dayValue">
									<SelectDay value={ form.dayValue } options={ dayList } onChange={ this.onChange.bind(this, 'dayValue') }/>
								</Form.Item>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免本金" prop="principalReductionMoney">
										<Input type="number" value={ form.principalReductionMoney } onChange={ this.onChange.bind(this, 'principalReductionMoney') } />
									</Form.Item>
									<Form.Item label="本金">
											<p>{ listObj.repaymentPrincipal-form.principalReductionMoney }</p>
											{this.valiNum(listObj.realRepaymentMoney-form.principalReductionMoney)}
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免利息" prop="rateReductionMoney">
										<Input type="number" value={ form.rateReductionMoney } onChange={ this.onChange.bind(this, 'rateReductionMoney') } />
									</Form.Item>
									<Form.Item label="利息">
											<p>{ listObj.rateMoney-form.rateReductionMoney }</p>
											{this.valiNum(listObj.rateMoney-form.rateReductionMoney)}
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免逾期" prop="overdueReductionMoney">
										<Input type="number" value={ form.overdueReductionMoney } onChange={ this.onChange.bind(this, 'overdueReductionMoney') } />
									</Form.Item>
									<Form.Item label="逾期">
											<p>{ listObj.overdueRealMoney-form.overdueReductionMoney }</p>
											{this.valiNum(listObj.overdueRealMoney-form.overdueReductionMoney)}
									</Form.Item>
								</div>
							}
							{
								(activeName === '3') && listObj.deductionMethod===false &&
								<div className="flex flex-direction_row justify-content_flex-justify">
									<Form.Item label="减免服务费" prop="serviceReductionMoney">
										<Input type="number" value={ form.serviceReductionMoney } onChange={ this.onChange.bind(this, 'serviceReductionMoney') } />
									</Form.Item>
									<Form.Item label="服务费">
											<p>{ listObj.serviceMoney-form.serviceReductionMoney }</p>
											{this.valiNum(listObj.serviceMoney-form.serviceReductionMoney)}
									</Form.Item>
								</div>
							}
							<Form.Item label="单号" prop="payNumber">
								<Input type="number" value={ form.payNumber } onChange={ this.onChange.bind(this, 'payNumber') } />
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list, btnLoading, dayList } = state
	return { list, btnLoading, dayList }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectPendingRepay, updateStateComplete, updateStateDelay,findAllDelayRate, updateStateReduction }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitHuan)
