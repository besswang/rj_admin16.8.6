import React, { Component } from 'react'
import { Button, Table, Loading } from 'element-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { handelSearch, updateNextApplyTime } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import DetailBtn from '@components/DetailBtn'
import { dauditRefuse } from '@meta/details'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
class AuditRefuse extends Component{
	static propTypes = {
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		handelSearch: PropTypes.func.isRequired,
		updateNextApplyTime: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
						type: 'index',
						fixed: 'left'
				}, {
					label: '订单号',
					prop: 'orderNumber',
					width: 100,
					fixed: 'left'
				},{
					label: '渠道名称',
					prop: 'channelName'
				},{
					label: '真实姓名',
					prop: 'realName'
				},
				{
					label: '风控分数',
					prop: 'riskNum'
				},
				{
					label: '手机号码',
					prop: 'phone'
				},
				{
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
					label: '催款次数',
					prop: 'loanTerm'
				}, {
					label: '新老客户',
					prop: 'loanTerm',
					render: row => {
						const text = filter.loanTerm(row.loanTerm)
						return text
					}
				}, {
					label: '申请时间',
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '审核客服',
					prop: 'examineCustomerName'
				}, {
					label: '审核时间',
					prop: 'examineDate',
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '拒绝时间',
					prop: 'examineDate',
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '操作',
					fixed: 'right',
					width:180,
					render: row => {
							return (
								<div className="flex flex-direction_row">
									<Button className="margin_right10" type="success" size="mini" onClick={ this.props.updateNextApplyTime.bind(this, row.id) }>
										{'开放申请'}
									</Button>
									<DetailBtn linkTo={ dauditRefuse } row={ row } />
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
		this.props.handelSearch()
		const sess = {
			name: '申请信息',
			title: '审核拒绝',
			url: '/borrow/auditrefuse'
		}
		window.sessionStorage.setItem('locationState', JSON.stringify(sess))
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.handelSearch()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.handelSearch()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.handelSearch()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showSelect2 showTime>
					<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
						data={ list.data }
						border
					/>
				</Loading>
				<MyPagination
					total={ list.total }
					onSizeChange={ this.sizeChange }
					onCurrentChange={ this.onCurrentChange }
				/>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ sizeChange, currentChange, initSearch, handelSearch, updateNextApplyTime }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AuditRefuse)