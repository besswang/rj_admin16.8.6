// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectOrderCompleted } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import DetailBtn from '@components/DetailBtn'
import { dalreadyWan } from '@meta/details'
import timeDate from '@global/timeDate'
class AlreadyWan extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectOrderCompleted: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
					type: 'index'
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
					label: '已放金额', // 到账金额
					prop: 'loanMoney'
				}, {
					label: '实还金额',
					prop: 'realRepaymentMoney'
				}, {
					label: '实际还款日',
					prop: 'realRepaymentDate',
					width: 120,
					render: row => {
						const date = timeDate.time(row.realRepaymentDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '延期费用',
					prop: 'continuePayNumber'
				}, {
					label: '延期天数',
					prop: 'continueDay'
				}, {
					label: '借款次数',
					prop: 'loanTerm'
				}, {
					label: '放款客服',
					prop: 'loanCustomer'
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
					width: 120,
					render: row => {
						const date = timeDate.time(row.examineDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '放款时间',
					prop: 'loanDate',
					width: 120,
					render: row => {
						const date = timeDate.time(row.loanDate, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '约定还款日',
					prop: 'repaymentDate'
				}, {
					label: '打款单号',
					prop: 'loanNumber'
				}, {
					label: '打款方式',
					prop: 'loanMode',
					render: row => {
						const data = filter.payType(row.loanMode)
						return data
					}
				}, {
					label: '还款方式',
					prop: 'repaymentType',
					render: row => {
						const data = filter.loanModeState(row.repaymentType)
						return data
					}
				}, {
					label: '申请单号',
					prop: 'orderNumber'
				}, {
					label: '银行名称',
					prop: 'bankName'
				}, {
					label: '银行账号',
					prop: 'bankNumber'
				}, {
					label: '操作',
					render: row => {
							return (
								<DetailBtn linkTo={ dalreadyWan } row={ row } />
							)
					}
      }]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectOrderCompleted()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectOrderCompleted()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectOrderCompleted()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectOrderCompleted()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showSelect2>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectOrderCompleted }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AlreadyWan)
