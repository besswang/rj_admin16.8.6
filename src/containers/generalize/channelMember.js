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
import filter from '@global/filter'
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
						label: '#',
						width: 60,
						render: (a, b, c) => {
							return c + 1
						}
					}, {
				label: '渠道名称',
				prop: 'channelName'
			}, {
				label: '姓名',
				prop: 'realName',
				render: row => {
					if (row.realName === null){
						return '未命名'
					}else{
						if (row.realName){
							const reg = row.realName.slice(1)
							const s = reg.split('')
							const x = []
							for(let i=0;i<s.length;i++){
								x.push('*')
							}
							const z = x.join('')
							const y = row.realName.substring(1, 0)
							return y+z
							// return row.realName.replace(/(?<=.)./g, '*')
						}
					}
				}
			}, {
				label: '手机号码',
				prop: 'phone',
				render: row => {
					if (row.phone){
						return row.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
					}
				}
			}, {
				label: '身份号码',
				prop: 'idcardNumber',
				render: row => {
					if (row.idcardNumber){
						return row.idcardNumber.replace(/^(\d{3})\d{8}(\d+)/, '$1****$2')
					}
				}
			}, {
				label: '身份证认证',
				width: 120,
				prop: 'idcardType',
				render: row => {
					return this.textType(row.idcardType)
				}
			}, {
				label: '个人信息认证',
				prop: 'idcardType',
				width: 140,
				render: row => {
					return this.textType(row.idcardType)
				}
			}, {
				label: '银行卡认证',
				prop: 'bankType',
				width: 120,
				render: row => {
					return this.textType(row.idcardType)
				}
			}, {
				label: '运营商认证', // 手机认证
				prop: 'mobileType',
				width: 120,
				render: row => {
					return this.textType(row.idcardType)
				}
			}, {
				label: '收款银行',
				prop: 'bankName'
			},{
				label: '注册时间',
				prop: 'gmt',
				render: row => {
					const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
					return date
				}
			}, {
				label: '申请状态',
				prop: 'loanType',
				render: row => {
					return filter.loanTyp(row.loanType)
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectChannelMember}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
