import React, { Component } from 'react'
import { Button, Table, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectPromotionStatistics } from './actions'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectPromotionStatistics: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
					type: 'index'
				}, {
					label: '日期',
					prop: 'date'
				}, {
					label: 'UV',
					prop: 'uv'
				}, {
					label: '注册人数',
					prop: 'userCount',
					render: row => {
						return row.userCount === null ? 0 : row.userCount
					}
				}, {
					label: '登陆APP人数',
					prop: 'loginCount'
				}, {
					label: '登陆APP比例',
					prop: 'loginRate'
				}, {
					label: '资料完成人数',
					prop: 'completedCount'
				}, {
					label: '申请人数',
					prop: 'applicantsCount'
				}, {
					label: '申请比例',
					prop: 'applicantsRate'
				}, {
					label: '放款人数',
					prop: 'orderStateCount'
				}, {
					label: '放款比例',
					prop: 'orderStateRate'
				}
			]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.selectPromotionStatistics()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.selectPromotionStatistics()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectPromotionStatistics()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectPromotionStatistics()
	}
	render(){
		const { list } = this.props
		return(
			<div>
				<Search showChannel showTime>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectPromotionStatistics}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
