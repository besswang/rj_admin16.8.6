// 催收管理-个人对账
import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectPendingLoan, updateStateLoan } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import { FALSE } from '@meta/state'
import DetailBtn from '@components/DetailBtn'
import { dwaitFang } from '@meta/details'
class WaitFang extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectPendingLoan: PropTypes.func.isRequired,
		updateStateLoan: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
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
					prop: 'nextApplyTime'
				}, {
					label: '审核客服',
					prop: 'examineCustomer'
				}, {
					label: '审核时间',
					prop: 'examineDate'
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
									{/* <Button className="margin_right10" type="success" size="mini">
										{'通过'}
									</Button> */}
									<Button className="margin_right10" type="danger" size="mini" onClick={ this.props.updateStateLoan.bind(this,{orderId:row.id,phone:row.phone,realName:row.realName,state:FALSE}) }>
										{'拒绝'}
									</Button>
									<DetailBtn linkTo={ dwaitFang } row={ row } />
								</div>
							)
					}
      }]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectPendingLoan()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectPendingLoan()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectPendingLoan()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectPendingLoan()
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectPendingLoan, updateStateLoan }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitFang)
