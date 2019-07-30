// 财务管理-已还款
import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectBill } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
class AlreadyHuan extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectBill: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
					label: '还款类型',
					prop: 'moneyType',
					render: row => {
						const text = filter.moneyType(row.moneyType)
						return text
					}
				}, {
					label: '支付方式',
					prop: 'payType',
					render: row => {
						const text = filter.payType(row.payType)
						return text
					}
				}, {
					label: '支付单号',
					prop: 'payNumber'
				}, {
					label: '申请单号',
					prop: 'orderNumber'
				}, {
					label: '约定还款日',
					prop: 'appointmentDate',
					width:120,
					render: row => {
						const date = timeDate.time(row.appointmentDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '实际还款日',
					prop: 'realDate',
					width:120,
					render: row => {
						const date = timeDate.time(row.realDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '申请金额',
					prop: 'applyMoney'
				}, {
					label: '已放金额', // 到账金额
					prop: 'loanMoney'
				}, {
					label: '用户姓名',
					prop: 'realName'
				}, {
					label: '用户手机',
					prop: 'phone'
				}, {
					label: '应还金额',
					prop: 'shouldMoney'
				}, {
					label: '实还金额',
					prop: 'money'
				}, {
					label: '放款客服',
					prop: 'loanCustomer'
				}]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectBill()
  }
	handleSearch = e => {
    e.preventDefault()
    this.props.selectBill()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectBill()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectBill()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showLoanMode showSelect3 showTime>
					<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectBill }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AlreadyHuan)
