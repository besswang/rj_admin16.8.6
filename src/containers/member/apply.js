import React, { Component } from 'react'
import { Button, Table, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { applySearch } from './actions'
import MyPagination from '@components/MyPagination'
import { APPLY_COLUMNS } from '@meta/columns'
import Search from '@components/Search'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		applySearch: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
	}
	componentDidMount() {
		this.props.applySearch()
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
						columns={ APPLY_COLUMNS }
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, applySearch}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
