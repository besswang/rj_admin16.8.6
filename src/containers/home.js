import React, { Component } from 'react'
import Header from '@components/header'
import Sidebar from '@components/sidebar'
import '@styles/home.less'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
class Home extends Component {
	static propTypes = {
    history: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentDidMount() {

	}
	render() {
		const time = new Date()
		const { children } = this.props
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
			</div>
		)
	}
}
Home.propTypes = {
	children: PropTypes.node.isRequired
}
export default withRouter(Home)