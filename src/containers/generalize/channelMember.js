import React, { Component } from 'react'
import { Button, Table, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectChannelMember } from './actions'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import timeDate from '@global/timeDate'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectChannelMember: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired
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
					label: '姓名',
					prop: 'realName',
					render: row => {
						return row.realName === null ? '未命名' : row.realName
					}
				}, {
					label: '手机号码',
					prop: 'phone'
				}, {
					label: '注册时间',
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
			}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.selectChannelMember()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.selectChannelMember()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectChannelMember()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectChannelMember()
	}
	render(){
		const { list } = this.props
		return(
			<div>
				<Search showChannel>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectChannelMember}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
