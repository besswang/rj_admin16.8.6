import React, { Component } from 'react'
// import { Message } from 'element-react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class Mlist extends Component{
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
				{ '2233' }
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
export default connect(mapStateToProps, mapDispatchToProps)(Mlist)
