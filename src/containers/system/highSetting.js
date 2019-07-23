import React, { Component } from 'react'
import { Switch, Button, Form, Message, Radio, Checkbox, Input, Select } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectSeniorConfig, updateGlobalConfigs } from './actions'
import api from '@api/index'
class HighSetting extends Component {
	static propTypes = {
		selectSeniorConfig: PropTypes.func.isRequired,
		updateGlobalConfigs: PropTypes.func.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			pay:'',
			form:{
				// bankpay: '快钱', //银行卡支付通道开关：(连连,富有,快钱,合利)
				// downloadlink: 'http://www.baidu.com', // 下载链接
				// idcardprice: '', // 身份证认证单价
				// massageprice: '', // 短信单价
				// modetype: 'true', // 服务费申请扣款方式 true 先扣  false  后扣
				// pay: '微信,支付宝', // 支付开关：(微信， 支付宝， 银行卡)
				// phoneprice: '0.1', //手机认证单价
				// riskmanagement: '排序', //风控选择： 排序,瑞鲸
				// testswitch: 'false', // 测试开关：
			},
			rules:{
				downloadlink: [{required: true,message: '请输入下载链接',trigger: 'blur'}],
				idcardprice: [{required: true,message: '请输入身份证认证单价',trigger: 'blur'}],
				massageprice: [{required: true,message: '请输入短信单价',trigger: 'blur'}],
				phoneprice: [{required: true,message: '请输入手机认证单价',trigger: 'blur'}],
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
		// res.data = [
		// 	{
		// 		configKey: 'BANK_PAY',
		// 		configValue: '快钱'
		// 	}, {
		// 		configKey: 'DOWNLOAD_LINK',
		// 		configValue: 'http://www.baidu.com'
		// 	}, {
		// 		configKey: 'IDCARD_PRICE',
		// 		configValue: '0.5'
		// 	}, {
		// 		configKey: 'MASSAGE_PRICE',
		// 		configValue: '0.055'
		// 	}, {
		// 		configKey: 'MODE_TYPE',
		// 		configValue: 'true'
		// 	}, {
		// 		configKey: 'PAY',
		// 		configValue: '微信,支付宝'
		// 	}, {
		// 		configKey: 'PHONE_PRICE',
		// 		configValue: '0.1'
		// 	}, {
		// 		configKey: 'RISK_MANAGEMENT',
		// 		configValue: '0.1'
		// 	}, {
		// 		configKey: 'TEST_SWITCH',
		// 		configValue: 'false'
		// 	}
		// ]
    const res = await api.selectSeniorConfigApi()
    if (res.success) {
			console.log(res)
			// const o = {}
			// let xx = {}
			// for(const v of res.data){
			// 	o[v.configKey] = v.configValue
			// 	console.log(o)
			// 	xx = Object.assign({},o)
			// }

			// console.log(xx)
			const p = this.arr(res.data.pay)
			this.setState({
				pay:p,
				form:res.data
			})
		}else{
			Message.warning(res.msg)
		}
	}
	saveApi = async obj => {
		const res = await api.updateGlobalConfigsApi()
		if (res.success) {
			Message.success(res.data.msg)
		}else{
			Message.warning(res.data.msg)
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				const a = []
				if (this.state.pay.length > 0) {
					if (this.state.pay.includes('微信')) {
						a.unshift('微信')
					}
					if (this.state.pay.includes('支付宝')) {
						a.push('支付宝')
					}
					if (this.state.pay.includes('银行卡')) {
						a.push('银行卡')
					}
				}
				const b = [...new Set(a)]
				console.log(b)

				const p = b.join(',')
				const trans = Object.assign({},this.state.form,{pay:p})
				console.log(trans)
				console.log(typeof trans)
				this.saveApi(trans)
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
	render() {
						// bankpay: '快钱', //银行卡支付通道开关：(连连,富有,快钱,合利)
						// downloadlink: 'http://www.baidu.com', // 下载链接
						// idcardprice: '', // 身份证认证单价
						// massageprice: '', // 短信单价
						// modetype: 'true', // 服务费申请扣款方式 true 先扣  false  后扣
						// pay: '微信,支付宝', // 支付开关：(微信， 支付宝， 银行卡)
						// phoneprice: '0.1', //手机认证单价
						// riskmanagement: '排序', //风控选择： 排序,瑞鲸
						// testswitch: 'false', // 测试开关：
		const { form, pay, rules } = this.state
		return (
			<div style={ {width:'50%'} }>
				<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
					<Form.Item label="银行卡支付通道开关">
						<Select value={ form.bankpay } placeholder="" onChange={ this.onChange.bind(this, 'bankpay') }>
							<Select.Option label="连连" value="连连"></Select.Option>
							<Select.Option label="富有" value="富有"></Select.Option>
							<Select.Option label="快钱" value="快钱"></Select.Option>
							<Select.Option label="合利" value="合利"></Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="下载链接" prop="downloadlink">
						<Input value={ form.downloadlink } onChange={ this.onChange.bind(this,'downloadlink') } />
					</Form.Item>
					<Form.Item label="身份证认证单价" prop="idcardprice">
						<Input value={ form.idcardprice } onChange={ this.onChange.bind(this,'idcardprice') } />
					</Form.Item>
					<Form.Item label="短信单价" prop="massageprice">
						<Input value={ form.massageprice } onChange={ this.onChange.bind(this,'massageprice') } />
					</Form.Item>
					<Form.Item label="服务费申请扣款方式">
						<Radio.Group value={ form.modetype } onChange={ this.onChange.bind(this,'modetype') }>
							<Radio value={ 'true' }>{'先扣'}</Radio>
							<Radio value={ 'false' }>{'后扣'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="支付开关">
						<Checkbox.Group value={ pay } onChange={ v => this.onChange1(v) }>
							<Checkbox label="微信" name="type" />
							<Checkbox label="支付宝" name="type" />
							<Checkbox label="银行卡" name="type" />
						</Checkbox.Group>
					</Form.Item>
					<Form.Item label="手机认证单价" prop="phoneprice">
						<Input value={ form.phoneprice } onChange={ this.onChange.bind(this,'phoneprice') } />
					</Form.Item>
					<Form.Item label="风控选择">
						<Radio.Group value={ form.riskmanagement } onChange={ this.onChange.bind(this,'riskmanagement') }>
							<Radio value="排序">{'排序'}</Radio>
							<Radio value="瑞鲸">{'瑞鲸'}</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="测试开关">
						<Switch
							value = { form.testswitch }
							onText=""
							offText=""
							onValue = { 'true' }
							offValue={ 'false' }
							onChange={ this.onChange.bind(this, 'testswitch') }
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