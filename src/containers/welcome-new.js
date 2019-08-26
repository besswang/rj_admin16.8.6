import React from 'react'
import { Button, Message, Layout,Card } from 'element-react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tabAdd } from '../redux/actions'
import Echart from '@components/echarts'
import Time from '@components/setime'
import api from '@api/index'
import '@styles/welcome.less'
import { WEL_STATISTICS } from '@meta/welcome'
class Welcome extends React.Component{
	static propTypes = {
		history: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
		tabAdd: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {
			time: {},
			statistics: []
		}
	}
	componentWillMount() {
		this.props.tabAdd({
			name: '欢迎页'
		})

	}
	componentDidMount() {
		const wel = this.props.router.defaultRouter.filter(item => item.text === '欢迎页')
		if (wel[0].hideInMenu){
			return false
		}
		this.initData()
	}
	search = () => {
		this.initData()
	}
	initData = async () => {
		const res = await api.selectTotalLogByTimeApi(this.state.time)
		if(res.success){
			const arr = []
			let obj = {}
			for (const i in WEL_STATISTICS) {
				obj = {
					value: res.data[WEL_STATISTICS[i].value] ? res.data[WEL_STATISTICS[i].value] : 0,
					icon: WEL_STATISTICS[i].icon,
					color: WEL_STATISTICS[i].color,
					text: WEL_STATISTICS[i].text
				}
				arr.push(obj)
			}
			this.setState({
				statistics: arr
			})
		}else{
			// if(res.msg === '请先登录'){
			// 	// setTimeout(() => {
			// 		this.props.history.push('/login')
			// 	// },1000)
			// }
			// Message.warning(res.msg)
			if(res.msg === '没有权限'){
				console.log('没有权限')
			}else{
				Message.warning(res.msg)
			}
		}
	}
	render(){
		const { router } = this.props
		const { statistics } = this.state
		const wel = router.defaultRouter.filter( item => item.text === '欢迎页')
		if (wel[0].hideInMenu) {
			return ''
		}else{
			return(
				<div>
					<div className="section">
						<Time handleTime={ data => this.setState({ time: data }) }/>
						<Button type="primary" className="margin_left15" onClick={ this.search }>{'查询'}</Button>
					</div>
					<div className="section">
							<h1 className="title">{'统计'}</h1>
							<Layout.Row gutter="50">
							{/* <Layout.Row> */}
								<Layout.Col xs="24" sm="24" md="12" lg="6">
									<div className="sec-bg sec-bg1 flex flex-direction_row align-items_center">
										<i className="icon iconfont icon-Time" />
										<div className="flex_1">
											<span className="money">{'59'}</span>
											<p className="info">{'今日注册'}</p>
										</div>
									</div>
								</Layout.Col>
								<Layout.Col xs="24" sm="24" md="12" lg="6">
									<div className="sec-bg sec-bg2 flex flex-direction_row align-items_center">
										<i className="icon iconfont icon-icon_shakehands" />
										<div className="flex_1">
											<span className="money">{'59'}</span>
											<p className="info">{'今日注册'}</p>
										</div>
									</div>
								</Layout.Col>
								<Layout.Col xs="24" sm="24" md="12" lg="6">
									<div className="sec-bg sec-bg3 flex flex-direction_row align-items_center">
										<i className="icon iconfont icon-icon_roundclose" />
										<div className="flex_1">
											<span className="money">{'59'}</span>
											<p className="info">{'今日注册'}</p>
										</div>
									</div>
								</Layout.Col>
								<Layout.Col xs="24" sm="24" md="12" lg="6">
									<div className="sec-bg sec-bg4 flex flex-direction_row align-items_center">
										<i className="icon iconfont icon-Personal" />
										<div className="flex_1">
											<span className="money">{'59'}</span>
											<p className="info">{'今日注册'}</p>
										</div>
									</div>
								</Layout.Col>
							</Layout.Row>
							<Layout.Row gutter="20">
								<Layout.Col xs="24" sm="24" md="8" lg="8">
									<Card
										header={
											<div className="clearfix">
												<span>{'今日借款申请'}</span>
											</div>
										}
									>
										<ul className="card-body flex flex-direction_row flex-wrap">
											<li>
												<h1>{'21'}</h1>
												<p>{'借款申请人数'}</p>
											</li>
											<li>
												<h1>{'21'}</h1>
												<p>{'借款总金额'}</p>
											</li>
										</ul>
									</Card>
								</Layout.Col>
							</Layout.Row>
							<ul className="flex flex-direction_row wel-ul">
							{
								statistics.length>0 &&
								statistics.map((item) => {
									return (
										<li className="flex flex-direction_row" key={ item.text }>
											<div className="sta-left" style={ { backgroundColor: item.color } }>
												<i className={ `${ item.icon }` } />
											</div>
											<div className="sta-right flex_1 flex flex-direction_column justify-content_flex-center">
												<span style={ { color: item.color } }>{ item.value }</span>
												<p>{ item.text }</p>
											</div>
										</li>
									)
								})
							}
							</ul>
					</div>
					<div className="section">
						<Echart/>
					</div>
				</div>
			)
		}
	}
}
const mapStateToProps = state => {
	const { router } = state
	return { router }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ tabAdd }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)