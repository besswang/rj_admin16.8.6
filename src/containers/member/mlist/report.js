import React, { Component } from 'react'
import { Button, Tooltip, Layout } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '@styles/report.less'
import { Link } from 'react-router-dom'
import Echartgauge from '@components/echartsGauge'
import EchartsBarLeft from '@components/echartsBarLeft'
import EchartsBarRight from '@components/echartsBarRight'
class Report extends Component{
	static propTypes = {
		reportDate: PropTypes.object
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	render() {
		const { userInfo, lastTime, gaugeEchart } = this.props.reportDate
		return (
			<div>
				<ul className="flex flex-direction_row justify-content_flex-justify section1">
					<li className="flex flex-direction_row">
						<h5 className="title center">{'画像维度'}</h5>
						<p className="time">{'更新日期为 '}{ lastTime }</p>
					</li>
					<li>
						<Link to={ '/member/mlist' }>
							<Button className="back-btn" type="text" size="small">{ '返回会员列表' }</Button>
						</Link>
					</li>
				</ul>
				<section className="flex flex-direction_row section2">
					<Layout.Row gutter="10" style={ {width:'100%'} }>
					<Layout.Col xs="24" sm="24" md="24" lg="12">
					<div className="flex_1 sec2 sec2-left">
						<h1 className="title">{'基本信息概况'}</h1>
						<div className="flex flex-direction_row sec2-left-bottom">
							<ul className="flex_1 left-bot-left">
								<li><span>{'身份证号码:'}</span>{ userInfo.id_number_mask }</li>
								<li><span>{'可信姓名:'}</span>{ userInfo.names }</li>
								<li><span>{'性别:'}</span>{ userInfo.gender }</li>
								<li><span>{'民族:'}</span>{ userInfo.nation }</li>
								<li><span>{'住址:'}</span>{ userInfo.address }</li>
							</ul>
							<div className="left-bot-right">
							{
								gaugeEchart.length>0 &&
								<Echartgauge gaugeData={ gaugeEchart } />
							}
								<Tooltip className="gauge-tool" effect="dark" content={
										<div className="tool-text">{'模型说明：有盾贷前评估模型是有盾特别针对互金行业提供盾一项服务。基于用户的全维度数据信息，结合有盾风控专家多年盾行业经验，有盾人工智能团队通过机器学习，数据挖掘算法，综合评判用户的信用行为，及时预警潜在的逾期风险。有盾信用评分分值从1-99分，分值越高，逾期概率越大，0分表示未评分，不在此信用评分统计值中。商户可以根据自己的业务自行选择阈值进行判断，同时，如果您希望进一步提升模型的效果，使其更加符合您的业务，您也可以直接咨询有盾商务。'}</div>
										} placement="top"
								>
									<Button className="gauge-btn" type="primary">{'有盾贷前模型'}</Button>
								</Tooltip>
							</div>
						</div>
					</div>
					</Layout.Col>
					<Layout.Col xs="24" sm="24" md="24" lg="12">
					<div className="sec2 sec2-right">
						<div className="flex flex-direction_row justify-content_flex-justify">
							<h1 className="title">{'用户特征'}</h1>
							<ul className="flex flex-direction_row sec2-title-right">
								<li><i className="color-block col1" />{'高危'}</li>
								<li><i className="color-block col2" />{'警示'}</li>
								<li><i className="color-block col3" />{'中立'}</li>
								<li><i className="color-block col4" />{'未触发'}</li>
								<li>
									<Tooltip className="tool" effect="dark" content={
										<div className="tool-text">{'有盾大数据系统根据用户的互联网交易行为、黑名单匹配情况、操作行为等多维度来识别用户的特征，特征下的日期为该用户最近一次满足该特征的日期，同时特征颜色反应了用户在互联网借贷行业失信风险的高低程度，红色最高，黄色次之，绿色最低，蓝色为中性特征，灰色表示该特征未被触发'}</div>
										} placement="left"
									>
										<i className="el-icon-information col5" />
										{/* <Button>{'看看'}</Button> */}
									</Tooltip>
								</li>
							</ul>
						</div>
						<ul className="sec2-right-bottom">
							<li><Tooltip effect="dark" content="命中法院失信明单">{'法院失信'}</Tooltip></li>
							<li className="tag1"><Tooltip effect="dark" content="命中有网贷失信明单">{'网贷失信'}</Tooltip></li>
							<li className="tag2"><Tooltip effect="dark" content="有盾云慧眼系统识别出该用户有过活体攻击行为">{'活体攻击'}</Tooltip></li>
							<li className="tag3"><Tooltip effect="dark" content="命中有盾疑似团伙欺诈名单库">{'疑似欺诈团伙'}</Tooltip></li>
						</ul>
					</div>
					</Layout.Col>
					</Layout.Row>
				</section>
				<section className="section3">
					<h1 className="title">{'信贷行为'}</h1>
					<Layout.Row gutter="10">
						<Layout.Col xs="24" sm="24" md="12" lg="9">
							<EchartsBarLeft />
						</Layout.Col>
						<Layout.Col xs="24" sm="24" md="12" lg="9">
							<EchartsBarRight />
						</Layout.Col>
						<Layout.Col xs="24" sm="24" md="12" lg="6" className="sec3-right">
							<p>{'总申请借款平台数: '}<span>{'1'}</span></p>
							<p>{'总借款平台数: '}<span>{'2'}</span></p>
							<p>{'总还款平台数: '}<span>{'1'}</span></p>
							<p>{'还款笔数: '}<span>{'3'}{'笔'}</span></p>
						</Layout.Col>
					</Layout.Row>

				</section>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { reportDate } = state
	return { reportDate }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Report)
