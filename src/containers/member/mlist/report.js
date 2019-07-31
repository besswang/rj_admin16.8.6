import React, { Component } from 'react'
import { Button } from 'element-react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '@styles/report.less'
import { Link } from 'react-router-dom'
class Report extends Component{
	// static propTypes = {

	// }
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
		return (
			<div>
				<ul className="flex flex-direction_row justify-content_flex-justify section1">
					<li className="flex flex-direction_row">
						<h5 className="title center">{'画像维度'}</h5>
						<p className="time">{'更新日期为2019-07-31 17:30:25'}</p>
					</li>
					<li>
						<Link to={ '/member/mlist' }>
							<Button className="back-btn" type="text" size="small">{ '返回会员列表' }</Button>
						</Link>
					</li>
				</ul>

			</div>
		)
	}
}

const mapStateToProps = state => {
	// const {  } = state
	// return {  }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Report)
