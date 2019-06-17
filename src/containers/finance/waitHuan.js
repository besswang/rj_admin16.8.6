// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Form, Input, Tabs } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectPendingRepay, updateStateComplete, updateStateDelay } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
import SelectPicker from '@components/SelectPicker'
import { REPAYMENT_TYPE } from '@meta/select'
import DetailBtn from '@components/DetailBtn'
import { dwaitHuan } from '@meta/details'
class WaitHuan extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		btnLoading: PropTypes.bool.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectPendingRepay: PropTypes.func.isRequired,
		updateStateComplete: PropTypes.func.isRequired,
		updateStateDelay: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
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
				reductionMoney: null, // 减免金额
				payNumber: null, // 支付单号
				delayNumber: null, // 延期天数
				reMoney: null // 延期金额
			},
			rules: {
				delayNumber: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入延期天数'))
						} else {
							callback()
						}
					}
				}],
				reMoney: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入延期金额'))
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
				repaymentMoney: [{
						required:true,
						validator: (rule, value, callback) => {
							if (value === '' || value === null) {
								callback(new Error('请输入还款金额'))
							} else {
								callback()
							}
						}
					}
				],
				reductionMoney: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入减免金额'))
						} else {
							callback()
						}
					}
				}],
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
					label: '风控分数',
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
					label: '待放金额',
					prop: 'loanMoney'
				}, {
					label: '借款次数',
					prop: 'loanTerm'
				}, {
					label: '申请时间',
					prop: 'nextApplyTime',
					width: 120,
					render: row => {
						const date = timeDate.time(row.nextApplyTime, 'yyyy-MM-dd hh:mm:ss')
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
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	openDialog = obj => {
		this.setState({
			dialogVisible: true,
			orderId: obj.id,
			orderNumber: obj.orderNumber, // 订单号
			realRepaymentMoney: obj.realRepaymentMoney, // 应还金额
			applyMoney: obj.applyMoney, // 借款金额
			serviceMoney: obj.serviceMoney, // 服务费
			loanDate: obj.loanDate, // 放款时间
			repaymentDate: obj.repaymentDate, // 约定还款日
		})
		this.tabClick('1')
		this.form.resetFields()
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
				const data = Object.assign({}, obj, {orderId:orderId})
				if(activeName === '1'){ // 全款
					this.props.updateStateComplete(data)
				} else { // 延期
					this.props.updateStateDelay(data)
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
	}
	render() {
		const { list, btnLoading } = this.props
		const { columns, dialogVisible, form, rules, orderNumber, realRepaymentMoney, applyMoney, serviceMoney, loanDate, repaymentDate, activeName } = this.state
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
							<Tabs.Pane label="全款" name="1"></Tabs.Pane>
							<Tabs.Pane label="延期" name="2"></Tabs.Pane>
						</Tabs>
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
								<p className="red">{'剩余应还:'}{ realRepaymentMoney }</p>
							</li>
						</ul>
						<Form labelWidth="80" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="还款方式" prop="repaymentType">
								<SelectPicker
									value={ form.repaymentType }
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
							{ activeName === '1' &&
								<Form.Item label="减免金额" prop="reductionMoney">
									<Input type="number" value={ form.reductionMoney } onChange={ this.onChange.bind(this, 'reductionMoney') } />
								</Form.Item>
							}
							{
								activeName === '2' &&
								<Form.Item label="延期天数" prop="delayNumber">
									<Input type="number" value={ form.delayNumber } onChange={ this.onChange.bind(this, 'delayNumber') } />
								</Form.Item>
							}
							{ activeName === '2' &&
								<Form.Item label="延期金额" prop="reMoney">
									<Input type="number" value={ form.reMoney } onChange={ this.onChange.bind(this, 'reMoney') } />
								</Form.Item>
							}

							<Form.Item label="还款单号" prop="payNumber">
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
	const { list, btnLoading } = state
	return { list, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, selectPendingRepay, updateStateComplete, updateStateDelay }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitHuan)
