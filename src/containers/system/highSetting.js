import React, { Component } from 'react'
// import { Button, Loading, Table } from 'element-react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
class HighSetting extends Component {
	static propTypes = {

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
		return (
			<div>
			{'系统高级设置'}
				{/* <Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="登陆方式">
						<Radio.Group value={ form.loginMode } onChange={ this.onChange.bind(this, 'loginMode') } >
							<Radio value={ 'PASSWORD' } disabled={ adminDisabled }>{'密码登陆'}</Radio>
							<Radio value={ 'VERIFYCODE' } disabled={ adminDisabled }>{'验证码登陆'}</Radio>
						</Radio.Group>
					</Form.Item>
				</Form> */}
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	const {  } = state
// 	return {  }
// }
// const mapDispatchToProps = dispatch => {
// 	return {
// 		...bindActionCreators({ }, dispatch)
// 	}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(HighSetting)
export default HighSetting
