// 系统充值
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Upload, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRecharge, addQuota } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
import Search from '@components/Search'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageRecharge: PropTypes.func.isRequired,
		addQuota: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			form: {
				money: null,
				imageUrl: '',
			},
			rules: {
				money: [{required: true, validator: validate.money}]
			},
			dialogVisible: false,
			columns: [{
				type: 'index',
				fixed: 'left'
			}, {
				label: '充值用户',
				prop: ''
			}, {
				label: '充值金额',
				prop: ''
			}, {
				label: '充值时间',
				prop: ''
			}, {
				label: '支付凭证',
				prop: ''
			}]
		}
	}
	componentWillMount() {
		this.props.initSearch()
  }
  componentDidMount() {
		this.props.pageRecharge()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageRecharge()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageRecharge()
	}
	openDialog = r => {
		this.form.resetFields()
		this.setState({
			dialogVisible: true
		})
		this.setState({
			form: {
				money: null,
				imageUrl:''
			}
		})
	}
	saveContent = e => {
		e.preventDefault()
		this.form.validate((valid) => {
			if (valid) {
				this.props.addQuota(this.state.form)
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
		this.props.pageRecharge()
	}
	handleAvatarScucess(res, file) {
		this.setState({ imageUrl: URL.createObjectURL(file.raw) })
	}
	beforeAvatarUpload(file) {
		const isJPG = file.type === 'image/jpeg'
		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isJPG) {
			Message('上传头像图片只能是 JPG 格式!')
		}
		if (!isLt2M) {
			Message('上传头像图片大小不能超过 2MB!')
		}
		return isJPG && isLt2M
	}
	render() {
		const { list, btnLoading } = this.props
		const { form, rules, dialogVisible, imageUrl } = this.state
		return (
			<div>
				<Search showTime>
					<div>
						<Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
						<Button className="margin-bottom15" type="primary" onClick={ this.openDialog.bind(this,'add') }>{'充值'}</Button>
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
					title="充值"
					visible={ dialogVisible }
					onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<Dialog.Body>
						<Form labelWidth="120" ref={ e => {this.form=e} } model={ form } rules={ rules }>
							<Form.Item label="充值金额" prop="">
								<Input type="number" value={ form.money } onChange={ this.onChange.bind(this,'money') } />
							</Form.Item>
							<Form.Item label="支付凭证" prop="">
								<Upload
									className="avatar-uploader"
									action="//jsonplaceholder.typicode.com/posts/"
									showFileList={ false }
									onSuccess={ (res, file) => this.handleAvatarScucess(res, file) }
									beforeUpload={ file => this.beforeAvatarUpload(file) }
									tip={ <div className="el-upload__tip">{'只能上传jpg/png文件，且不超过500kb'}</div> }
								>
								{ imageUrl ? <img src={ imageUrl } className="avatar" alt="" /> : <i className="el-icon-plus avatar-uploader-icon" /> }
								</Upload>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageRecharge, addQuota }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
