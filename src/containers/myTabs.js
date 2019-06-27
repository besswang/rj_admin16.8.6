import React from 'react'
import { Tabs } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '@styles/welcome.less'
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
	render() {
		const { tabObj } = this.props
		console.log(tabObj)
		return (
			<div style={ {margin:'15px'} }>
				<Tabs type="card" value={ tabObj.tabActive }>
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
