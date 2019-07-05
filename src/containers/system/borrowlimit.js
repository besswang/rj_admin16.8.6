import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Radio } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageQuota, deleteQuota, addQuota, updateQuota } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
import Search from '@components/Search'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageQuota: PropTypes.func.isRequired,
		deleteQuota: PropTypes.func.isRequired,
		addQuota: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		updateQuota: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle: '',
			id: null,
			form: {
				money: null,
				defaultValue: 0,
				state:0,
				sort:null,
				delayType:0,
				overdueType:0,
				moneyRate:'',
				overdueRate:'',
				serverMoney: null,
				continueMoney:null,
				dayNumber:null
			},
			rules: {
				money: [{required: true, validator: validate.money}],
				sort: [{required: true, validator:validate.sort}],
				moneyRate: [{required: true,validator:validate.moneyRate}],
				overdueRate: [{required: true,validator:validate.overdueRate}],
				serverMoney: [{required: true, validator: validate.serverMoney}],
				continueMoney: [{required: true, validator:validate.continueMoney}],
				dayNumber: [{required: true,validator:validate.dayNumber}],
			},
			dialogVisible: false,
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '渠道名称',
					prop: 'channelName',
					fixed: 'left'
				}, {
					label: '额度',
					prop: 'money',
					fixed: 'left'
				}, {
					label: '是否是默认值',
					prop: 'defaultValue',
					render: row => {
						const data = row.defaultValue === 0 ? '是' : '否'
						return data
					}
				}, {
					label: '状态',
					prop: 'state',
					render: row => {
						const t = row.state === 0 ? '启用':'禁用'
						return t
					}
				}, {
					label: '排序',
					prop: 'sort'
				}, {
					label: '延期开关',
					prop: 'delayType',
					render: row => {
						const t = row.delayType === 0 ? '开' : '关'
						return t
					}
				}, {
					label: '逾期开关',
					prop: 'overdueType',
					render: row => {
						const t = row.overdueType === 0 ? '开' : '关'
						return t
					}
				}, {
					label: '借款年化利率（利息）',
					prop: 'moneyRate'
				}, {
					label: '逾期利率',
					prop: 'overdueRate'
				}, {
					label: '服务费',
					prop: 'serverMoney'
				}, {
					label: '延期金额',
					prop: 'continueMoney'
				}, {
					label: '申请天数',
					prop: 'dayNumber'
				}, {
					label: '操作',
					width:120,
					fixed: 'right',
          render: row => {
            return (
							<div>
							{/* {
								row.defaultValue !==0 &&
								<Button type="primary" size="mini" onClick={ this.props.deleteQuota.bind(this,{id:row.id, defaultValue:0}) }>{'设为默认'}</Button>
							} */}
							<Button type="primary" size="mini" onClick={ this.openDialog.bind(this, row) }>{'编辑'}</Button>
              <Button type="danger" size="mini" onClick={ this.props.deleteQuota.bind(this,row.id) }>{'删除'}</Button>
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
    this.props.pageQuota()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageQuota()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageQuota()
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if(r === 'add'){
			this.setState({
				dialogTitle: '添加额度',
				id: null,
				form: {
					money: null,
					defaultValue: 0,
					state: 0,
					sort: null,
					delayType: 0,
					overdueType: 0,
					moneyRate: '',
					overdueRate: '',
					serverMoney: null,
					continueMoney: null,
					dayNumber: null
				}
			})
		} else {
			this.setState({
				dialogTitle: '编辑额度',
				id: r.id,
				form: {
					money: r.money,
					defaultValue: r.defaultValue,
					state:r.state,
					sort:r.sort,
					delayType:r.delayType,
					overdueType:r.overdueType,
					moneyRate:r.moneyRate,
					overdueRate:r.overdueRate,
					serverMoney: r.serverMoney,
					continueMoney:r.continueMoney,
					dayNumber:r.dayNumber
				}
			})
		}
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				if(this.state.id){// 编辑
					const data = Object.assign({},this.state.form,{id:this.state.id})
					this.props.updateQuota(data)
				}else{//添加
					this.props.addQuota(this.state.form)
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
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	handleSearch = e => {
		e.preventDefault()
		this.props.pageQuota()
	}
	render() {
		const { list, btnLoading } = this.props
		const { form, rules, dialogTitle, dialogVisible } = this.state
		return (
			<div>
        {/* <Button className="margin-bottom15" type="primary" onClick={ e => this.openDialog(e) }>{'添加'}</Button> */}
				<Search showChannel>
					<div>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
					</div>
				</Search>
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
					title={ dialogTitle }
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="额度" prop="money">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this,'money') } />
							</Form.Item>
							<Form.Item label="是否默认">
								<Radio.Group value={ form.defaultValue } onChange={ this.onChange.bind(this,'defaultValue') }>
									<Radio value="0">{'是'}</Radio>
									<Radio value="1">{'否'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="状态">
								<Radio.Group value={ form.state } onChange={ this.onChange.bind(this,'state') }>
									<Radio value="0">{'启用'}</Radio>
									<Radio value="1">{'禁用'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="排序" prop="sort">
								<Input type="number" value={ form.sort } onChange={ this.onChange.bind(this,'sort') } />
							</Form.Item>
							<Form.Item label="延期开关">
								<Radio.Group value={ form.delayType } onChange={ this.onChange.bind(this,'delayType') }>
									<Radio value="0">{'开'}</Radio>
									<Radio value="1">{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="逾期开关">
								<Radio.Group value={ form.overdueType } onChange={ this.onChange.bind(this,'overdueType') }>
									<Radio value="0">{'开'}</Radio>
									<Radio value="1">{'关'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="借款年化利率（利息）" prop="moneyRate">
								<Input value={ form.moneyRate } onChange={ this.onChange.bind(this,'moneyRate') } />
							</Form.Item>
							<Form.Item label="逾期利率" prop="overdueRate">
								<Input value={ form.overdueRate } onChange={ this.onChange.bind(this,'overdueRate') } />
							</Form.Item>
							<Form.Item label="服务费" prop="serverMoney">
								<Input type="number" value={ form.serverMoney } onChange={ this.onChange.bind(this,'serverMoney') } />
							</Form.Item>
							<Form.Item label="延期金额" prop="continueMoney">
								<Input type="number" value={ form.continueMoney } onChange={ this.onChange.bind(this,'continueMoney') } />
							</Form.Item>
							<Form.Item label="申请天数" prop="dayNumber">
								<Input type="number" value={ form.dayNumber } onChange={ this.onChange.bind(this,'dayNumber') } />
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageQuota, deleteQuota, addQuota, updateQuota }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
