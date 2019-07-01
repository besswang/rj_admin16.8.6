import React from 'react'
import { Tabs } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '@styles/tab.less'
class MyTabs extends React.Component{
	static propTypes = {
		tabObj: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillMount() {
		console.log(this.props)
	}
	componentDidMount() {

	}
	tabMenu = (e) => {
		console.log(e)
	}
	render() {
		const { tabObj } = this.props
		console.log(tabObj)
		return (
			<div style={ {margin:'15px'} }>
			<div className="el-tabs el-tabs--card">
				<div className="el-tabs__header">
					<div className="el-tabs__nav-wrap">
						<div classNameel-tabs__nav-scroll>
							<ul className="el-tabs__nav">
								{
									tabObj.tabs.map((item, index) => {
										return (
											<li className="el-tabs__item is-closable" key={ item.name }>
												<Link to={ item.url }>{item.name}</Link>
												<span className="el-icon-close" />
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
			{/* <ul className="flex flex-direction_row tab-ul">
				{
					tabObj.tabs.map((item, index) => {
						return (
							<li className="tab-li" key={ item.name }>
								<Link to={ item.url }>{item.name}</Link>
								<span className="el-icon-close" />
							</li>
						)
					})
				}
			</ul> */}

			{/* <Link to={ '/welcome' }>
				{'欢迎页'}
			</Link> */}
				<Tabs type="card" value={ tabObj.tabActive } onTabClick={ this.tabMenu }>
					{
						tabObj.tabs.map((item, index) => {
							return <Tabs.Pane key={ item.name } closable label={ item.name } name={ item.name }></Tabs.Pane>
						})
					}
				</Tabs>
			</div>
		)
	}
}
const mapStateToProps = state => {
	const { tabObj } = state
	return { tabObj }
}
export default connect(mapStateToProps)(MyTabs)
