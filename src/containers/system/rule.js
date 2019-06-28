import React, { Component } from 'react'
import { Button, Loading, Table, Input, Form, Dialog } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { findAllLiftingAmount, addLiftingAmount } from './actions'
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
		btnLoading: PropTypes.bool.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			configValue:'',
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
				money:  [{required: true, validator: validate.numEmpty}],
				advanceDayNum: [{required: true, validator: validate.numEmpty}],
			},
			value: 1,
			sort: null,
			id: null,
			dialogVisible: false,
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '小于等于多少金额',
					prop: 'money'
				}, {
					label: '提前多少天',
					prop: 'advanceDayNum'
				}, {
					label: '提前天数提额',
					prop: 'advanceMoney'
				}, {
					label: '时间前',
					prop: 'frontTime',
					render: row => {
						const date = timeDate.time(row.frontTime, 'yyyy-MM-dd hh:mm:ss')
						return date
					}
				}, {
					label: '时间前提额',
					prop: 'frontMoney'
				}, {
					label: '时间后',
					prop: 'afterTime',
					render: row => {
						const date = timeDate.time(row.afterTime, 'yyyy-MM-dd hh:mm:ss')
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
		console.log(res)
		if(res.success){
			this.setState({
				configValue: res.data.configValue
			})
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
			console.log(r)
			this.setState({
				dialogTitle: '编辑',
				form: {
					money: r.money,
					advanceDayNum: parseInt(r.advanceDayNum), //提前多少天
					advanceMoney: r.advanceMoney, //提前天数提额
					frontTime: r.frontTime, //时间前
					frontMoney: r.frontMoney, //时间前提额
					afterTime: r.afterTime, // 时间后
					afterMoney: r.afterMoney, //时间后提额
					otherMoney: r.otherMoney //其他时间提额
				},
				id: r.id
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.setState({
					dialogVisible: false
				})
				console.log(this.state.id)
				if (this.state.id) { // editor
					const trans = Object.assign({},this.state.form,{id:this.state.id})
					this.props.addLiftingAmount(trans)
				} else { // add
					// this.props.addLiftingAmount(this.state.form)
				}

			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	render() {
		const { list, btnLoading } = this.props
		const { configValue, form, rules, dialogTitle } = this.state
		return (
			<div>
				<Button type="primary" className="margin-bottom15" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
				<Form labelWidth="120">
					<Form.Item label="自动提额上限">
						<Input type="number" value={ configValue } />
					</Form.Item>
					<Form.Item>
						<Button type="primary" size="mini">{'修改上限'}</Button>
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
								<Input type="frontTime" value={ form.frontTime } onChange={ this.onChange.bind(this, 'frontTime') } />
							</Form.Item>
							<Form.Item label="时间前提额" prop="frontMoney">
								<Input type="frontMoney" value={ form.frontMoney } onChange={ this.onChange.bind(this, 'frontMoney') } />
							</Form.Item>
							<Form.Item label="时间后" prop="afterTime">
								<Input type="afterTime" value={ form.afterTime } onChange={ this.onChange.bind(this, 'afterTime') } />
							</Form.Item>
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
		...bindActionCreators({sizeChange, currentChange, initSearch, findAllLiftingAmount, addLiftingAmount}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
