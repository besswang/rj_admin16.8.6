// 财务管理-已完成
import React, { Component } from 'react'
import { Button, Loading, Table } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { selectIdCard, deleteIdCard } from './actions'
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
		selectIdCard: PropTypes.func.isRequired,
		deleteIdCard: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '真实姓名',
					prop: 'realName'
				}, {
				  label: '身份证号',
				  prop: 'idNumber'
				}, {
					label: '性别',
					prop: 'gender'
				}, {
					label: '年龄',
					prop: 'age'
				}, {
					label: '认证时间',
					prop: 'gmt',
					render: row => {
						const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '状态',
					prop: ''
				}, {
					label: '状态',
					prop: 'idcardType',
					render: row => {
						const text = filter.personalType(row.idcardType)
						return text
					}
				}, {
					label: '操作',
					render: row => {
						return (
              <Button type="danger" size="mini" onClick={ this.props.deleteIdCard.bind(this, { userId: row.userId }) }>{'删除'}</Button>
						)
					}
      }]
		}
	}
	componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.selectIdCard()
	}
  handleSearch = e => {
    e.preventDefault()
    this.props.selectIdCard()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.selectIdCard()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.selectIdCard()
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
		...bindActionCreators({sizeChange, currentChange, initSearch, selectIdCard, deleteIdCard }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
