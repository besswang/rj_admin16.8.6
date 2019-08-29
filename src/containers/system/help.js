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
				thresholdscoreuser: [{required: true, validator: validate.userfen}],
				thresholdscore: [{required: true, validator: validate.machfen}],
				riskilencetime: [{required: true, validator: validate.dayNum}],
				minage: [
					{ required: true, message: '请输入最小年龄', trigger: 'blur' },
					{ validator: (rule, value, callback) => {
						const r = new RegExp('^[0-9]*$')
						if (value === '') {
							callback(new Error('请输入最小年龄'))
						} else if (!r.test(value)) {
							callback(new Error('请输入有效的年龄'))
						} else if (value > this.state.form.maxage) {
							callback(new Error('最小年龄不能大于最大年龄'))
						} else {
							callback()
						}
					} }
				],
				maxage: [
					{ required: true, message: '请输入最大年龄', trigger: 'blur' },
					{ validator: (rule, value, callback) => {
						const r = new RegExp('^[0-9]*$')
						if (value === '') {
							callback(new Error('请输入最大年龄'))
						} else if (!r.test(value)) {
							callback(new Error('请输入有效的年龄'))
						} else if (value < this.state.form.minage) {
							callback(new Error('最大年龄不能小于最小年龄'))
						} else {
							callback()
						}
					} }
				]
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
		let v = null
		if (value && (typeof value === 'string')) {
			v = value.trim()
		} else {
			v = value
		}
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: v })
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
	render() {
		const { form, rules } = this.state
		return (
			<div style={ {width:'60%'} }>
				<Form labelWidth="140" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="服务费申请扣款方式">
						<Radio.Group value={ form.modetype } onChange={ this.onChange.bind(this,'modetype') }>
							<Radio value={ 'true' }>{'先扣'}</Radio>
							<Radio value={ 'false' }>{'后扣'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="审核拒绝推荐链接" prop="recommend_URL">
						<Input value={ form.recommend_URL } onChange={ this.onChange.bind(this,'recommend_URL') } />
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
							<Form.Item labelWidth="0" prop="minage">
								<Input type="number" value={ form.minage } onChange={ this.onChange.bind(this, 'minage') } />
								{/* <span className="info-text">{'年龄最小值'}</span> */}
							</Form.Item>
							<span className="plr10">{'-'}</span>
							<Form.Item labelWidth="0" prop="maxage">
								<Input type="number" value={ form.maxage } onChange={ this.onChange.bind(this, 'maxage') } />
								{/* <span className="info-text">{'年龄最大值'}</span> */}
							</Form.Item>
						</div>
					</Form.Item>
					<Form.Item label="逾期计算最高天数" prop="overhightday">
						<Input type="number" value={ form.overhightday } onChange={ this.onChange.bind(this,'overhightday') } append="天" />
					</Form.Item>
					<Form.Item label="申请相隔时间" prop="beaparttime">
						<Input type="number" value={ form.beaparttime } onChange={ this.onChange.bind(this,'beaparttime') } append="天" />
					</Form.Item>
					<Form.Item label="风控分数人工审核门槛" prop="thresholdscoreuser">
						<Input type="number" value={ form.thresholdscoreuser } onChange={ this.onChange.bind(this,'thresholdscoreuser') } append="分" />
					</Form.Item>
					<Form.Item label="风控分数机器审核门槛" prop="thresholdscore">
						<Input type="number" value={ form.thresholdscore } onChange={ this.onChange.bind(this,'thresholdscore') } append="分" />
					</Form.Item>
					<Form.Item label="风控静默时间" prop="riskilencetime">
						<Input type="number" value={ form.riskilencetime } onChange={ this.onChange.bind(this,'riskilencetime') } append="天" />
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
