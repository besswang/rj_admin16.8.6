import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Radio } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageAdmin, addAdmin, updateAdmin } from './actions'
import MyPagination from '@components/MyPagination'
import DisableBtn from '@components/DisableBtn'
import Search from '@components/Search'
import SelectPicker from '@components/SelectPicker'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageAdmin: PropTypes.func.isRequired,
		addAdmin: PropTypes.func.isRequired,
		updateAdmin: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
		roleList: PropTypes.array
  }
	constructor(props) {
		super(props)
		this.state = {
			dialogTitle:'',
			adminDisabled: false,
			rid: null,
			form:{
				adminName:'',
				nickName:'',
				roleId: null,
				loginMode: 'PASSWORD', // 登陆方式
				adminState: 0, // 用户状态
				distribution: 0, // 是否分配
				password:''
			},
			rules: {
				adminName: [
					{ required: true, message: '请输入登陆手机号', trigger: 'blur' }
				],
				nickName: [
					{ required: true, message: '请输入昵称', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				roleId: [{
					required: true,
					validator: (rule, value, callback) => {
						if (value === '' || value === null) {
							callback(new Error('请选择角色'))
						} else {
							callback()
						}
					}
				}]
			},
			value: 1,
			sort: null,
			id: null,
			dialogVisible: false,
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '用户账号',
					prop: 'adminName'
				}, {
					label: '用户昵称',
					prop: 'nickName'
				}, {
					label: '用户角色',
					prop: 'roleName',
					render: row => {
						let text = ''
						this.props.roleList.find(item => {
							if(item.id === row.roleId){
								text = item.roleName
							}
							return text
						})
						return text
					}
				}, {
					label: '用户状态',
					prop: 'adminState',
					render: row => {
						return row.adminState === 0 ? '启用':'禁用'
					}
				}, {
					label: '分配状态',
					prop: 'distribution',
					render: row => {
						return row.distribution === 0 ? '正常分配' : '未分配'
					}
				}, {
          label: '操作',
          render: row => {
            return (
							<div>
								<Button type="primary" size="mini" onClick={ this.openDialog.bind(this,row) }>{'编辑'}</Button>
								<DisableBtn value={ row.distribution } result={ 1 } text={ ['正常分配','不分配'] } onClick={ this.updateAdmin.bind(this,row,'distribution') } />
								<DisableBtn value={ row.adminState } result={ 1 } text={ ['启用','禁用'] } onClick={ this.updateAdmin.bind(this,row) } />
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
		this.props.pageAdmin()
	}
	componentWillReceiveProps(nextProps){
		const obj = nextProps.roleList.filter(item => item.roleName === '催收员')
		if(obj[0]){
			this.setState({
				rid: obj[0].id
			})
		}
	}
	updateAdmin = (r, type) => {
		if (type === 'distribution'){
			const state = r.distribution === 0 ? 1 : 0
			this.props.updateAdmin({ id:r.id,distribution:state }, 'distribution')
		}else{
			const state = r.adminState === 0 ? 1 : 0
			this.props.updateAdmin({ id:r.id,adminState:state }, 'adminState')
		}

	}
	handleSearch = e => {
		e.preventDefault()
		this.props.pageAdmin()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageAdmin()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageAdmin()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		if (r === 'add') { //添加
			this.setState({
				dialogTitle: '添加用户',
				form: {
					adminName:null,
					nickName:'',
					roleId: null,
					loginMode: 'PASSWORD', // 登陆方式
					adminState: 0, // 用户状态
					distribution: 0, // 是否分配
					password:''
				},
				id: null,
				adminDisabled: false
			})
		} else { // 编辑
			this.setState({
				dialogTitle: '编辑用户',
				form: {
					adminName: r.adminName,
					nickName: r.nickName,
					roleId: r.roleId,
					adminState: r.adminState, // 用户状态
					distribution: r.distribution // 是否分配
				},
				id:r.id,
				adminDisabled: true
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
				if (this.state.id) {
					const trans = Object.assign({},this.state.form,{id:this.state.id})
					this.props.updateAdmin(trans)
				} else {
					this.props.addAdmin(this.state.form)
				}

			} else {
				console.log('error submit!!')
				return false
			}
		})
	}
	onRadioChange(value) {
		this.setState({ value })
	}
	render() {
		const { list, btnLoading, roleList } = this.props
		const { form, rules, dialogTitle, adminDisabled, rid } = this.state
		return (
			<div>
				<Search showRole showAdminName>
					<div>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						<Button type="primary" onClick={ this.openDialog.bind(this,'add') }>{'添加'}</Button>
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
					title= { dialogTitle }
					visible={ this.state.dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" model={ form } ref={ e => {this.form = e} } rules={ rules }>
							<Form.Item label="登陆方式">
								<Radio.Group value={ form.loginMode } onChange={ this.onChange.bind(this, 'loginMode') } >
									<Radio value={ 'PASSWORD' }>{'密码登陆'}</Radio>
									<Radio value={ 'VERIFYCODE' }>{'验证码登陆'}</Radio>
								</Radio.Group>
							</Form.Item>
						 {
						 		form.loginMode === 'PASSWORD' &&
								<Form.Item label="用户名" prop="adminName">
									<Input disabled={ adminDisabled } value={ form.adminName } onChange={ this.onChange.bind(this, 'adminName') } />
								</Form.Item>
						 }
						 {
								form.loginMode === 'VERIFYCODE' &&
								<Form.Item label="登录手机号" prop="adminName">
									<Input disabled={ adminDisabled } type="number" value={ form.adminName } onChange={ this.onChange.bind(this, 'adminName') } />
								</Form.Item>
						 }
							<Form.Item label="昵称" prop="nickName">
								<Input value={ form.nickName } onChange={ this.onChange.bind(this, 'nickName') } />
							</Form.Item>
							{/* {
								form.roleId !== rid &&
								<Form.Item label="角色" prop="roleId">
									<SelectPicker value={ form.roleId } options={ roleList } onChange={ this.onChange.bind(this, 'roleId') } />
								</Form.Item>
							} */}
							{
								<Form.Item label="角色" prop="roleId">
									<SelectPicker value={ form.roleId } clearable={ 1 } options={ roleList } onChange={ this.onChange.bind(this, 'roleId') } />
								</Form.Item>
							}
							{
								form.roleId === rid &&
								<Form.Item label="密码" prop="password">
									<Input value={ form.password } onChange={ this.onChange.bind(this, 'password') } />
								</Form.Item>
							}
							<Form.Item label="用户状态">
								<Radio.Group value={ form.adminState } onChange={ this.onChange.bind(this, 'adminState') } >
									<Radio value={ 0 }>{'启用'}</Radio>
									<Radio value={ 1 }>{'禁用'}</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="是否分配">
								<Radio.Group value={ form.distribution } onChange={ this.onChange.bind(this, 'distribution') }>
									<Radio value={ 0 }>{'是'}</Radio>
									<Radio value={ 1 }>{'否'}</Radio>
								</Radio.Group>
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
	const { list, btnLoading, roleList } = state
	return { list, btnLoading, roleList }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({sizeChange, currentChange, initSearch, pageAdmin, addAdmin, updateAdmin}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
