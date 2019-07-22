import React, { Component } from 'react'
import { Switch, Button, Form } from 'element-react'
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
			checkedCities:[],
			form:{
				value1: 0
			}
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
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	render() {
		const {form} = this.state
		const {list} = this.props
		return (
			<div>
			<ul>
				{ list.data.map(item => {
					return (
						<li key={ item.id }>{ item.title }
						{
							item.configKey === 'BANK_PAY' &&
							<Form labelWidth="120" model={ form } ref={ e => {this.form = e} }>
								<Form.Item label="连连">
									<Switch
										value = { this.arr(item.configValue)[2] }
										onText=""
										offText=""
										onValue={ '1' }
										offValue={ '0' }
										onChange={ this.onChange.bind(this, 'value1') }
									/>
								</Form.Item>
							</Form>
						}
						</li>
					)
				})}
			</ul>
			{/* this.arr(item.configValue) */}
			<Button onClick={ () => {console.log(list.data[0].configValue)} }>{'看看'}</Button>
			<Button onClick={ () => {console.log(this.state.checkedCities)} }>{'看看'}</Button>
			<Button onClick={ () => {console.log(this.state.form.value1)} }>{'value'}</Button>

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
