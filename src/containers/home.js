import React, { Component } from 'react'
import Header from '@components/header'
import Sidebar from '@components/sidebar'
// import MyTabs from './myTabs'
import '@styles/home.less'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import api from '@api/index'
import { Message } from 'element-react'
import { MessageBox } from 'element-react'
// import num from '@global/num'
class Home extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			 recharge: 0, // 充值总金额
			 consume: 0, // 已消费
			 consumeLowerLimit: 0, // 系统费用最低=提醒
			 residue: 0 // 剩余 = 充值总金额 - 消耗费用
		}
	}
	componentWillMount() {

  }
	componentDidMount() {
		this.selectGlobalValue()
	}
	selectGlobalValue = async () => {
		const res = await api.selectGlobalValueApi()
		if(res.success){
			// const result = parseFloat(res.data.recharge) - parseFloat(res.data.consume)
			// const result = num.minus(res.data.recharge, res.data.consume)
			if (parseInt(res.data.balance) <= res.data.consumeLowerLimit) {
				MessageBox.confirm('余额即将不足', '提示', {
					type: 'warning'
				}).then(() => {

				}).catch(() => {

				})
			}
			this.setState({
				recharge: res.data.recharge,
				consume: res.data.consume,
				consumeLowerLimit: res.data.consumeLowerLimit,
				residue: res.data.balance
			})
		}else{
			Message.error(res.msg)
		}
  }
	render() {
		const time = new Date()
		const { children } = this.props
		// const { recharge, consume, consumeLowerLimit, residue } = this.state
		const { recharge, consume, residue } = this.state
		return (
			<div className="flex flex-direction_column">
				<div className="header">
					<Header history={ this.props.history }/>
				</div>
				<ul className="flex flex-diredtion_row container">
					<li className="sidebar">
						<Sidebar />
					</li>
					<li className="main">
						<div className="content" key={ time }>
							{ children }
						</div>
					</li>
				</ul>
				<ul className="footer flex flex-direction_row">
					<li>{ '©2019' }</li>
					<li>{'系统名称 小赢花花后台管理系统'}</li>
					<li>{'消费环境开启状态'}</li>
					<li>{'总充值'}{recharge}{'¥'}</li>
					<li>{'已消费'}{consume}{'¥'}</li>
					<li>{'剩余'}{residue}{'¥'}</li>
				</ul>
				{/* <li>{`提醒${ consumeLowerLimit }¥`}</li> */}
			</div>
		)
	}
}
export default withRouter(Home)
