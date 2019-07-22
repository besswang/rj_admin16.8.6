import React, { Component } from 'react'
import { Checkbox, Button } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSeniorConfig } from './actions'
class HighSetting extends Component {
	static propTypes = {
		list: PropTypes.object.isRequired,
		selectSeniorConfig: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			data:[
				{value:'0,0,1,0',id:1},
				{value:'true',id:2}
			],
			checkedCities:[]
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		this.props.selectSeniorConfig()
	}
	arr = (value) => {
		return value.split(',')
	}
	handleCheckedCitiesChange(value) {
		this.setState({
			checkedCities: value,
		})
	}
	render() {
		const {list} = this.props
		return (
			<div>
			<ul>
				{ list.data.map(item => {
					return (
						<li key={ item.id }>{ item.title }
						{
							item.configKey === 'BANK_PAY' &&
							<Checkbox.Group
							// value={ this.arr(item.configValue) }
							value={ this.state.checkedCities }
							onChange={ this.handleCheckedCitiesChange.bind(this) }
							>
								<Checkbox value="0" label="连连" />
								<Checkbox value="1" label="富有" />
								<Checkbox value="2" label="快钱" />
								<Checkbox value="3" label="合利" />
							</Checkbox.Group>
						}
						</li>
					)
				})}
			</ul>
			<Button onClick={ () => {console.log(list.data[0].configValue)} }>{'看看'}</Button>
			<Button onClick={ () => {console.log(this.state.checkedCities)} }>{'看看'}</Button>
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

const mapStateToProps = state => {
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectSeniorConfig }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(HighSetting)
// export default HighSetting
