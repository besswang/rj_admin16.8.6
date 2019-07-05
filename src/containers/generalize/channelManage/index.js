import React, { Component } from 'react'
import { Button, Table, Loading, Dialog, Form, Input } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { sizeChange, currentChange, initSearch, menuActive } from '@redux/actions'
import { selectChannel, insertChannel, updateChannel, prohibitChannel } from './action'
import MyPagination from '@components/MyPagination'
import Search from '@components/Search'
import SelectPicker from '@components/SelectPicker'
import { PROMOTION_TYPE } from '@meta/select'
import DisableBtn from '@components/DisableBtn'
class Apply extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		list: PropTypes.object.isRequired,
		sizeChange: PropTypes.func.isRequired,
		currentChange: PropTypes.func.isRequired,
		initSearch: PropTypes.func.isRequired,
		selectChannel: PropTypes.func.isRequired,
		menuActive: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		insertChannel: PropTypes.func.isRequired,
		updateChannel: PropTypes.func.isRequired,
		prohibitChannel: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle:'',
			id: null,
			form: {
				channelName: '', // 渠道名称,
				daiName: '', // 贷超名称,
				price: null, // 单价,
				type: '', // 类型,
				machineScore: null, // 机审分数,
				userScore: null, // 人工分数
				firstMoney: null, // 首借额度
				remake: '', // 备注,
			},
			rules: {
				channelName: [{required: true,message: '请输入渠道名称',trigger: 'blur'}],
				daiName: [{required: true,message: '请输入超贷名称',trigger: 'blur'}],
				firstMoney:[{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入首借额度'))
						} else {
							callback()
						}
					}
				}],
				price: [{
						required:true,
						validator: (rule, value, callback) => {
							if (value === '' || value === null) {
								callback(new Error('请输入单价'))
							} else {
								callback()
							}
						}
					}
				],
				type: [{required: true,message: '请选择推广方式',trigger: 'blur'}],
				machineScore: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入机审分数'))
						} else {
							callback()
						}
					}
				}],
				userScore: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请输入人工审核分数'))
						} else {
							callback()
						}
					}
				}],
				remake: [{required: true,message: '请输入备注',trigger: 'blur'}]
			},
			dialogVisible: false,
			columns: [{
					type: 'index'
				}, {
					label: '渠道名称',
					prop: 'channelName'
				}, {
					label: '超贷名称',
					prop: 'daiName'
				}, {
					label: '推广链接',
					prop: 'extensionLink',
					width:280
				}, {
					label: '单价',
					prop: 'price'
				}, {
					label: '推广方式',
					prop: 'type'
				}, {
					label: '推广费用',
					prop: 'money'
				}, {
					label: '机审分数',
					prop: 'machineScore'
				}, {
					label: '人工审核分数',
					prop: 'userScore'
				}, {
					label: '首借额度',
					prop: 'firstMoney'
				}, {
					label: '备注',
					prop: 'remake'
				}, {
					label: '状态',
					prop: 'state',
					render: row => {
						return (row.state === 0 ? '正常': '禁用')
					}
				}, {
						label: '操作',
						width:210,
						fixed: 'right',
						render: row => {
							return (
								<div>
									<Button type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>{'编辑'}</Button>
									<DisableBtn value={ row.state } result={ 1 } text={ ['启用','禁用'] } onClick={ this.props.prohibitChannel.bind(this,{channelName:row.channelName,id:row.id,state:row.state}) }/>
									<Link to={ {pathname:'/generalize/exhibition',state:{date:row.channelName}} } className="margin_right10">
										<Button type="success" size="mini" onClick={ this.ditchType.bind(this, row.channelName) }>{'展期'}</Button>
									</Link>
									<Link to={ {pathname:'/generalize/channellimit',state:{date:row.channelName}} }>
										<Button type="warning" size="mini" onClick={ this.ditchType.bind(this, row.channelName) }>{'额度'}</Button>
									</Link>
								</div>
							)
						}
				}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
		this.props.menuActive(this.props.location.pathname)
		window.sessionStorage.removeItem('channelName')
	}
	componentDidMount() {
		this.props.selectChannel()
	}
	ditchType = (name) => {
    window.sessionStorage.setItem('channelName', name)
  }
	handleSearch = e => {
		e.preventDefault()
		this.props.selectChannel()
	}
	sizeChange = e => {
		this.props.sizeChange(e)
		this.props.selectChannel()
	}
	onCurrentChange = e => {
		this.props.currentChange(e)
		this.props.selectChannel()
	}
	openDialog = obj => {
		this.setState({
			dialogVisible: true
		})
		this.form.resetFields()
		if(obj === 'add'){
			this.setState({
				dialogTitle:'添加',
				id: null
			})
		} else {
			console.log(obj)
			this.setState({
				dialogTitle:'编辑',
				form:{
					channelName: obj.channelName,
					daiName: obj.daiName,
					price: obj.price,
					type: obj.type,
					machineScore: obj.machineScore,
					userScore: obj.userScore,
					remake: obj.remake
				},
				id: obj.id
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		console.log(this.state.form)
		this.form.validate((valid) => {
			if (valid) {
				if(this.state.id){// 编辑
					const data = Object.assign({},this.state.form,{id:this.state.id})
					this.props.updateChannel(data)
				}else{//添加
					this.props.insertChannel(this.state.form)
				}
				this.setState({
					dialogVisible: false
				})
			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	selectType = e => {
		console.log(e)
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	render(){
		const { list, btnLoading } = this.props
		const { dialogTitle, columns, dialogVisible, form, rules, id } = this.state
		return(
			<div>
				<Search showChannel>
					<div>
						<Button onClick={ this.handleSearch } type="primary" className="margin_right10">{'搜索'}</Button>
						{/* <Button type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button> */}
						<Link to={ {pathname:'/generalize/add'} }>
							<Button type="primary">{'添加'}</Button>
						</Link>
					</div>
				</Search>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
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
					title={ dialogTitle }
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="渠道名称" prop="channelName">
								<Input disabled={ id ? true : false } value={ form.channelName } onChange={ this.onChange.bind(this, 'channelName') } />
							</Form.Item>
							<Form.Item label="贷超名称" prop="daiName">
								<Input value={ form.daiName } onChange={ this.onChange.bind(this, 'daiName') } />
							</Form.Item>
							<Form.Item label="单价" prop="price">
								<Input type="number" value={ form.price } onChange={ this.onChange.bind(this, 'price') } />
							</Form.Item>
							<Form.Item label="推广方式" prop="type">
								<SelectPicker
									stringValue={ form.type }
									onChange={ this.onChange.bind(this, 'type') }
									optionsArr={ PROMOTION_TYPE }
									placeholder={ '选择方式' }
								/>
							</Form.Item>
							<Form.Item label="机审分数" prop="machineScore">
								<Input type="number" value={ form.machineScore } onChange={ this.onChange.bind(this, 'machineScore') } />
							</Form.Item>
							<Form.Item label="人工审核分数" prop="userScore">
								<Input type="number" value={ form.userScore } onChange={ this.onChange.bind(this, 'userScore') } />
							</Form.Item>
							<Form.Item label="首借额度" prop="firstMoney">
								<Input type="number" value={ form.firstMoney } onChange={ this.onChange.bind(this, 'firstMoney') } />
							</Form.Item>
							<Form.Item label="备注" prop="remake">
								<Input value={ form.remake } onChange={ this.onChange.bind(this, 'remake') } />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, menuActive, selectChannel, insertChannel, updateChannel, prohibitChannel}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Apply)
