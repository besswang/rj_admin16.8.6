import React, { Component } from 'react'
import { Button, Loading, Table, Input, Form, Dialog, TimePicker, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { findAllLiftingAmount, addLiftingAmount, updateLiftingAmount } from './actions'
import MyPagination from '@components/MyPagination'
import api from '@api/index'
import validate from '@global/validate'
import timeDate from '@global/timeDate'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		findAllLiftingAmount: PropTypes.func.isRequired,
		addLiftingAmount: PropTypes.func.isRequired,
		updateLiftingAmount: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			editConfit: false,
			// kan: new Date(2000, 10, 10, 10, 10),
			// kan: new Date('2019-06-30T17:02:02.000Z'),
			// kan: new Date('2019-07-01 11:42:58'),
			form2: {
				configValue: null
			},
			rules2: {
				configValue:[{required: true, validator: validate.moneyType}]
			},
			dialogTitle:'',
			form:{
				money: null, // 小于等于多少金额
				advanceDayNum: null, //提前多少天
				advanceMoney: null, //提前天数提额
				frontTime: null, //时间前
				frontMoney: null, //时间前提额
				afterTime: null, // 时间后
				afterMoney: null, //时间后提额
				otherMoney: null, //其他时间提额
			},
			rules: {
				money:  [{required: true, validator: validate.moneyType}],
				advanceDayNum: [{required: true, validator: validate.dayNum}],
				advanceMoney: [{required: true, validator: validate.moneyType}],
				frontTime: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				frontMoney: [{required: true, validator: validate.moneyType}],
				afterTime: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				afterMoney: [{required: true, validator: validate.moneyType}],
				otherMoney: [{required: true, validator: validate.moneyType}]
			},
			value: 1,
			sort: null,
			id: null,
			dialogVisible: false,
			columns: [{
					label: '借款金额',
					prop:'money',
					// render: row => {
					// 	return <div>{ '小于等于' }<Input value={ row.money } /></div>
					// }
				},
				//  {
				// 	label: '还款方式',
				// 	render: () => {
				// 		return '正常还款'
				// 	}
				// },
				{
					label: '提前多少天',
					prop: 'advanceDayNum'
				}, {
					label: '提前天数提额',
					prop: 'advanceMoney'
				}, {
					label: '时间前',
					prop: 'frontTime',
					render: row => {
						const date = timeDate.time(row.frontTime, 'hh:mm:ss')
						return date
					}
				}, {
					label: '时间前提额',
					prop: 'frontMoney'
				}, {
					label: '时间后',
					prop: 'afterTime',
					render: row => {
						const date = timeDate.time(row.afterTime, 'hh:mm:ss')
						return date
					}
				}, {
					label: '时间后提额',
					prop: 'afterMoney'
				} ,{
					label: '其他时间提额',
					prop: 'otherMoney'
				}, {
          label: '操作',
          render: row => {
            return (
							<div>
								<Button type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>{'编辑'}</Button>
							</div>
            )
          }
        }]
		}
	}
	componentWillMount() {
		this.props.initSearch()
  }
  componentDidMount() {
		this.props.findAllLiftingAmount()
		this.findMinAndCappingMoney()
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.findAllLiftingAmount()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.findAllLiftingAmount()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.findAllLiftingAmount()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	findMinAndCappingMoney = async () => {
		const res = await api.findMinAndCappingMoneyApi()
		if(res.success){
			this.setState({
				form2: {
					configValue: res.data.configValue
				}
			})
		}else{
			Message.error('res.msg')
		}
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if (r === 'add') { //添加
			this.setState({
				dialogTitle: '添加',
				form: {
					money: null, // 小于等于多少金额
					advanceDayNum: null, //提前多少天
					advanceMoney: null, //提前天数提额
					frontTime: null, //时间前
					frontMoney: null, //时间前提额
					afterTime: null, // 时间后
					afterMoney: null, //时间后提额
					otherMoney: null //其他时间提额
				},
				id: null
			})
		} else { // 编辑
			const t1 = timeDate.time(r.frontTime, 'hh:mm:ss')
			const t2 = timeDate.time(r.afterTime, 'hh:mm:ss')
			this.setState({
				dialogTitle: '编辑',
				form: {
					money: r.money,
					advanceDayNum: parseInt(r.advanceDayNum), //提前多少天
					advanceMoney: r.advanceMoney, //提前天数提额
					frontTime: new Date('2019-07-01 '+t1), //时间前
					frontMoney: r.frontMoney, //时间前提额
					afterTime: new Date('2019-07-01 ' + t2), // 时间后
					afterMoney: r.afterMoney, //时间后提额
					otherMoney: r.otherMoney //其他时间提额
				},
				id: r.id
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		console.log(this.state.form)
		this.form.validate((valid) => {
			if (valid) {
				this.setState({
					dialogVisible: false
				})
				console.log(this.state.id)
				if (this.state.id) { // editor
					const trans = Object.assign({},this.state.form,{id:this.state.id})
					this.props.updateLiftingAmount(trans)
				} else { // add
					this.props.addLiftingAmount(this.state.form)
				}

			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	editConfitBtn(){
		this.setState({
			editConfit:true
		})
		if(this.state.editConfit){
			this.form2.validate((valid) => {
				if (valid) {
					this.updateMinAndCappingMoney()
				} else {
					console.log('error submit!!')
					return false
				}
			})

		}
	}
	updateMinAndCappingMoney = async () => {
		const res = await api.updateMinAndCappingMoneyApi({money:this.state.form2.configValue})
		if (res.success) {
			Message.success(res.msg)
			this.setState({
				editConfit: false
			})
		}else{
			Message.error(res.msg)
		}
	}
	onChange2(key, value) {
		this.setState({
			form2: Object.assign({}, this.state.form2, { [key]: value })
		})
	}
	render() {
		const { list, btnLoading } = this.props
		const { form2, form, rules, rules2, dialogTitle, editConfit } = this.state
		return (
			<div>
				<Button type="primary" className="margin-bottom15" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
				<Form labelWidth="120" inline model={ form2 } ref={ e => {this.form2 = e} } rules={ rules2 }>
					<Form.Item label="自动提额上限" prop="configValue">
						{
							!editConfit &&
							<p>{ form2.configValue }</p>
						}
						{
							editConfit &&
							<Input type="number" value={ form2.configValue } onChange={ this.onChange2.bind(this, 'configValue') } />
						}
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={ this.editConfitBtn.bind(this) }>{editConfit ? '保存':'修改上限'}</Button>
					</Form.Item>
				</Form>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ this.state.columns }
						data={ list.data }
						border
						stripe
					/>
				</Loading>
        <MyPagination
          total={ list.total }
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
				<Dialog
					title= { dialogTitle }
					visible={ this.state.dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
							<Form.Item label="小于等于多少金额" prop="money">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this, 'money') } />
							</Form.Item>
							<Form.Item label="提前多少天" prop="advanceDayNum">
								<Input type="advanceDayNum" value={ form.advanceDayNum } onChange={ this.onChange.bind(this, 'advanceDayNum') } />
							</Form.Item>
							<Form.Item label="提前天数提额" prop="advanceMoney">
								<Input type="advanceMoney" value={ form.advanceMoney } onChange={ this.onChange.bind(this, 'advanceMoney') } />
							</Form.Item>
							<Form.Item label="时间前" prop="frontTime">
								{/* <Input type="frontTime" value={ form.frontTime } onChange={ this.onChange.bind(this, 'frontTime') } /> */}
								<TimePicker
									onChange={ this.onChange.bind(this, 'frontTime') }
									placeholder="选择时间"
									value={ form.frontTime }
								/>
							</Form.Item>
							<Form.Item label="时间前提额" prop="frontMoney">
								<Input type="frontMoney" value={ form.frontMoney } onChange={ this.onChange.bind(this, 'frontMoney') } />
							</Form.Item>
							{
								form.frontTime &&
								<Form.Item label="时间后" prop="afterTime">
								{/* <Input type="afterTime" value={ form.afterTime } onChange={ this.onChange.bind(this, 'afterTime') } /> */}
								<TimePicker
									onChange={ this.onChange.bind(this, 'afterTime') }
									placeholder="选择时间"
									selectableRange = { `${ timeDate.time(form.frontTime, 'hh:mm:ss') } - 20:30:00` }
									value={ form.afterTime }
								/>
								</Form.Item>
							}

							<Form.Item label="时间后提额" prop="afterMoney">
								<Input type="afterMoney" value={ form.afterMoney } onChange={ this.onChange.bind(this, 'afterMoney') } />
							</Form.Item>
							<Form.Item label="其他时间提额" prop="otherMoney">
								<Input type="otherMoney" value={ form.otherMoney } onChange={ this.onChange.bind(this, 'otherMoney') } />
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer className="dialog-footer">
						<Button onClick={ () => this.setState({ dialogVisible: false }) }>{'取 消'}</Button>
						<Button type="primary" onClick={ this.saveContent } loading={ btnLoading }>{'确 定'}</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list, btnLoading } = state
	return { list, btnLoading }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, findAllLiftingAmount, addLiftingAmount,updateLiftingAmount}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
