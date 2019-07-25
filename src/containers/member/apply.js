import React, { Component } from 'react'
import { Button, Table, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive, tabAdd } from '@redux/actions'
import { applySearch } from './actions'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import timeDate from '@global/timeDate'
import filter from '@global/filter'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		applySearch: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		tabAdd: PropTypes.func.isRequired,
	}
	constructor(props) {
			super(props)
			this.state = {
				columns: [
					{
						type:'index'
					},
					{
						label: '渠道名称',
						prop: 'channelName'
					},
					{
						label: '真实姓名',
						prop: 'realName'
					},
					{
						label: '手机号码',
						prop: 'phone'
					},
					{
						label: '注册时间',
						prop: 'gmt',
						render: row => {
							const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
							return date
						}
					}, {
						label: '身份证认证',
						width: 100,
						prop: 'idcardType',
						render: row => {
							return this.textType(row.idcardType)
						}
					}, {
						label: '个人信息认证',
						prop: 'personalType',
						width: 100,
						render: row => {
							return this.textType(row.personalType)
						}
					}, {
						label: '运营商认证', // 手机认证
						prop: 'mobileType',
						width: 100,
						render: row => {
							return this.textType(row.mobileType)
						}
					}, {
						label: '银行卡认证',
						prop: 'bankType',
						width: 100,
						render: row => {
							return this.textType(row.bankType)
						}
					}
				]
			}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.applySearch()
		this.props.tabAdd({
			name: '注册未申请',
			url: '/member/apply'
		})
	}
	textType = x => {
		const t = filter.personalType(x)
		if (x === 'COMPLETED') {
			return <span className="g-border">{t}</span>
		} else {
			return <span className="r-border">{t}</span>
		}
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.applySearch()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.applySearch()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.applySearch()
	}
	render(){
		const { list } = this.props
		return(
			<div>
				<Search showTime>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, applySearch, tabAdd}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
