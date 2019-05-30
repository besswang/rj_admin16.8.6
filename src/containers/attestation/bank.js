// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectBank, deleteBankByUserId } from './actions'
import Search from '@components/Search'
import MyPagination from '@components/MyPagination'
import filter from '@global/filter'
import timeDate from '@global/timeDate'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		selectBank: PropTypes.func.isRequired,
		deleteBankByUserId: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
				  label: '手机号码',
				  prop: 'phone'
				}, {
					label: '真实姓名',
					prop: 'realName'
				}, {
				  label: '银行卡号',
				  prop: 'bankNumber'
				}, {
					label: '开户银行',
					prop: 'bank'
				}, {
					label: '预留号码',
					prop: 'reservePhone'
				}, {
					label: '认证时间',
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '状态',
					prop: 'bankAuthType',
					render: row => {
						const text = filter.personalType(row.bankAuthType)
						return text
					}
				}, {
					label: '操作',
					render: row => {
						return (
              <Button type="danger" size="mini" onClick={ this.props.deleteBankByUserId.bind(this, { userId: row.userId }) }>{'删除'}</Button>
						)
					}
      }]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectBank()
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectBank()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectBank()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectBank()
	}
	render() {
		const { list } = this.props
		return (
			<div>
				<Search showRealName>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectBank, deleteBankByUserId }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
