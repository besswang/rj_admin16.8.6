// 催收管理-催收列表
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Input, Form } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectCollectionByParam, addUserBlack, removeUserBlack, insertRemarks } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import DisableBtn from '@components/DisableBtn'
import DetailBtn from '@components/DetailBtn'
import { dcollection } from '@meta/details'
import filter from '@global/filter'
class Collection extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectCollectionByParam: PropTypes.func.isRequired,
		addUserBlack: PropTypes.func.isRequired,
		removeUserBlack: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		insertRemarks: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogVisible: false,
			content: '',
			orderNumber: '',
			orderId: null,
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '备注信息',
					prop: 'content'
				}, {
					label: '渠道名称',
					prop: 'channelName'
				}, {
					label: '真实姓名',
					prop: 'realName'
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
					label: '已放金额',// 已放金额/到账金额
					prop: 'loanMoney'
				}, {
					label: '银行名称',
					prop: 'bankName'
				}, {
					label: '银行账号',
					prop: 'bankNumber'
				}, {
					label: '约定还款日',
					prop: 'repaymentDate'
				}, {
					label: '应还金额',
					prop: 'repaymentMoney'
				}, {
					label: '逾期天数',
					prop: 'overdueNumber'
				}, {
					label: '逾期金额', // 逾期金额
					prop: 'overdueMoney'
				}, {
					label: '借款次数',
					prop: 'loanTerm'
				}, {
					label: '新老客户',
					prop: 'loanTerm', // 等于0 为新客  大于0 为老客
					render: row => {
						if(parseInt(row.Loading) === 0){
							return '新客'
						}else{
							return '老客'
						}
					 }
				}, {
					label: '申请时间',
					prop: 'nextApplyTime'
				}, {
					label: '审核时间',
					prop: 'examineDate'
				}, {
					label: '放款时间',
					prop: 'loanDate'
				}, {
					label: '打款单号',
					prop: 'loanNumber'
				}, {
					label: '打款方式',
					prop: 'loanMode',
					render: row => {
						const text = filter.loanModeState(row.loanMode)
						return text
					}
				}, {
					label: '跟单人',
					prop: 'tracker'
				}, {
					label: '催收状态',
					prop: ''
				}, {
					label: '申请单号',
					prop: 'orderNumber'
				}, {
				 	label: '黑名单',
					fixed:'right',
					 render: row => {
						 return (
							 <DisableBtn
									value={ row.blackStatus }
									result={ 0 }
									onClick={ this.userBlack.bind(this, row) }
									text={ ['添加','移除'] }
								/>
						 )
					 }
				}, {
					label: '操作',
					fixed: 'right',
					align: 'center',
					width: 140,
					render: row => {
						return (
							<div className="flex flex-direction_row">
								<Button className="margin_right10" type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>
									{'备注'}
								</Button>
								<DetailBtn linkTo={ dcollection } row={ row } />
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
    this.props.selectCollectionByParam()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.selectCollectionByParam()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectCollectionByParam()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectCollectionByParam()
	}
		// 黑名单 idCard，phone,realName
	userBlack(r){
		if(r.blackStatus === 0){ // 添加
			const trans = {
				idCard: r.idcardNumber,
				phone: r.phone,
				realName: r.realName
			}
			this.props.addUserBlack(trans)
		} else { // 移除
			this.props.removeUserBlack({phone: r.phone})
		}
	}
	openDialog = r => {
		this.setState({
			dialogVisible: true,
			content: r.content,
			orderNumber: r.orderNumber,
			orderId: r.id
		})
	}
	onChange = e => {
		this.setState({
			content: e
		})
	}
	saveContent = e => {
		e.preventDefault()
		this.props.insertRemarks({
			content: this.state.content,
			orderId: this.state.orderId
		})
		this.setState({
			dialogVisible: false
		})
	}
	render() {
		const { list, btnLoading } = this.props
		return (
			<div>
				<Search showSelect2 showColl showSelectClient showSelectTime>
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
				<Dialog
					title="修改备注"
					visible={ this.state.dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form>
							<Form.Item label="订单号" labelWidth="120">
								<p>{ this.state.orderNumber }</p>
							</Form.Item>
							<Form.Item label="备注信息" labelWidth="120">
								<Input type="textarea" value={ this.state.content } onChange={ e => this.onChange(e) } />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectCollectionByParam, addUserBlack, removeUserBlack,insertRemarks }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection)
