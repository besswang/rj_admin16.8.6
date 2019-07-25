import React, { Component } from 'react'
import { Switch, Button, Form, Message, Radio, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSeniorConfig, updateGlobalConfigs } from './actions'
import api from '@api/index'
import validate from '@global/validate'
class HighSetting extends Component {
	static propTypes = {
		selectSeniorConfig: PropTypes.func.isRequired,
		updateGlobalConfigs: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			form: {
				// modetype: 'true', // 服务费申请扣款方式 true 先扣  false  后扣
				// wechat: '1,2,3,4', // 官方微信
				// cappingmoneyl: null, // 封顶金额
				// qqnumber: '1,2,3', //企业QQ号
				// servicephone: '1,2,3,0', // 客服电话
				// overhightday: null, //逾期计算最高天数
				// beaparttime: null, // 申请相隔时间(天为单位)
				// thresholdscoreuser: null, //风控分数人工审核门槛
				// fengkongnumber: 'false', // 老客是否调用
				// thresholdscore: null, // 风控分数机器审核门槛
				// riskilencetime: null, // 风控静默时间
				// minage:null, //年龄限制-年龄最小值
				// maxage:null //年龄限制-年龄最大值
			},
			rules:{
				cappingmoneyl: [{required: true, validator: validate.moneyType}],
				overhightday: [{required: true, validator: validate.dayNum}],
				beaparttime: [{required: true, validator: validate.dayNum}],
				thresholdscoreuser: [{required: true, validator: validate.fen}],
				thresholdscore: [{required: true, validator: validate.fen}],
				riskilencetime: [{required: true, validator: validate.dayNum}],
			}
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		// this.props.selectSeniorConfig()
		this.configData()
	}
	arr = (value) => {
		return value.split(',')
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	configData = async () => {
    const res = await api.selectOtherConfigApi()
    if (res.success) {
			this.setState({
				form:res.data
			})
		}else{
			Message.warning(res.msg)
		}
	}
	saveApi = async obj => {
		const res = await api.updateGlobalConfigssApi(obj)
		if (res.success) {
			Message.success(res.msg)
			this.configData()
		}else{
			Message.warning(res.msg)
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.saveApi(this.state.form)
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	onChange1 = value => {
		this.setState({
			pay: value
		})
	}
	removeDomain(item, e) {
		var index = this.state.wechat.indexOf(item)

		if (index !== -1) {
			this.state.wechat.splice(index, 1)
			this.forceUpdate()
		}

		e.preventDefault()
	}
	addDomain(e) {
		e.preventDefault()

		this.state.wechat.push('')

		this.forceUpdate()
	}
	render() {
		const { form, rules, wechat } = this.state
		console.log(wechat)
		return (
			<div style={ {width:'60%'} }>
				<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="服务费申请扣款方式">
						<Radio.Group value={ form.modetype } onChange={ this.onChange.bind(this,'modetype') }>
							<Radio value={ 'true' }>{'先扣'}</Radio>
							<Radio value={ 'false' }>{'后扣'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="官方微信">
						<Input type="textarea" value={ form.wechat } onChange={ this.onChange.bind(this, 'wechat') } />
						<span className="info-text">{'每个微信号之间请用逗号隔开,例如：150xxxxxxxx,187xxxxxxxx'}</span>
					</Form.Item>
					<Form.Item label="封顶金额" prop="cappingmoneyl">
						<Input type="number" value={ form.cappingmoneyl } onChange={ this.onChange.bind(this,'cappingmoneyl') } />
					</Form.Item>
					<Form.Item label="企业QQ号">
						<Input type="textarea" value={ form.qqnumber } onChange={ this.onChange.bind(this, 'qqnumber') } />
						<span className="info-text">{'每个qq号之间请用逗号隔开,例如：506xxxxxxxx,187xxxxxxxx'}</span>
					</Form.Item>
					<Form.Item label="客服电话">
						<Input type="textarea" value={ form.servicephone } onChange={ this.onChange.bind(this, 'servicephone') } />
						<span className="info-text">{'每个电话号码之间请用逗号隔开,例如：150xxxxxxxx,187xxxxxxxx'}</span>
					</Form.Item>
					<Form.Item label="年龄限制">
						<div className="flex flex-direction_row">
							<div>
								<Input type="number" value={ form.minage } onChange={ this.onChange.bind(this, 'minage') } />
								<span className="info-text">{'年龄最小值'}</span>
							</div>
							<span className="plr10">{'-'}</span>
							<div>
								<Input type="number" value={ form.maxage } onChange={ this.onChange.bind(this, 'maxage') } />
								<span className="info-text">{'年龄最大值'}</span>
							</div>
						</div>
					</Form.Item>
					<Form.Item label="逾期计算最高天数" prop="overhightday">
						<Input type="number" value={ form.overhightday } onChange={ this.onChange.bind(this,'overhightday') } />
					</Form.Item>
					<Form.Item label="申请相隔时间(天为单位)" prop="">
						<Input type="number" value={ form.beaparttime } onChange={ this.onChange.bind(this,'beaparttime') } />
					</Form.Item>
					<Form.Item label="风控分数人工审核门槛" prop="thresholdscoreuser">
						<Input type="number" value={ form.thresholdscoreuser } onChange={ this.onChange.bind(this,'thresholdscoreuser') } />
					</Form.Item>
					<Form.Item label="风控分数机器审核门槛" prop="thresholdscore">
						<Input type="number" value={ form.thresholdscore } onChange={ this.onChange.bind(this,'thresholdscore') } />
					</Form.Item>
					<Form.Item label="风控静默时间(天)" prop="riskilencetime">
						<Input type="number" value={ form.riskilencetime } onChange={ this.onChange.bind(this,'riskilencetime') } />
					</Form.Item>
					<Form.Item label="老客是否调用">
						<Switch
							value = { form.fengkongnumber }
							onText=""
							offText=""
							onValue = { 'true' }
							offValue={ 'false' }
							onChange={ this.onChange.bind(this, 'fengkongnumber') }
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={ this.saveContent }>{'确 定'}</Button>
					</Form.Item>
				</Form>
				{/* <Button onClick={ () => {console.log(this.state.form)} }>{'obj'}</Button> */}
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	const {  } = state
// 	return {  }
// }
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectSeniorConfig, updateGlobalConfigs }, dispatch)
	}
}
export default connect(mapDispatchToProps)(HighSetting)
// export default HighSetting
