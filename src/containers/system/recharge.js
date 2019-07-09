// 系统充值
import React, { Component } from 'react'
import { Button, Loading, Table, Dialog,Form, Input, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRecharge, addRecharge } from './actions'
import MyPagination from '@components/MyPagination'
import validate from '@global/validate'
import Search from '@components/Search'
import timeDate from '@global/timeDate'
// import filter from '@global/filter'
class BlackUser extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageRecharge: PropTypes.func.isRequired,
		addRecharge: PropTypes.func.isRequired,
		btnLoading: PropTypes.bool.isRequired,
  }
	constructor(props) {
		super(props)
		this.state = {
			voucher:'',
			form: {
				rechargeMoney: null
			},
			rules: {
				rechargeMoney: [{required: true, validator: validate.numEmpty}]
			},
			dialogVisible: false,
			columns: [{
				type: 'index',
				fixed: 'left'
			}, {
				label: '充值用户',
				prop: 'adminName'
			}, {
				label: '充值金额',
				prop: 'rechargeMoney'
			}, {
				label: '充值时间',
				prop: 'gmt',
				render: row => {
					const date = timeDate.time(row.gmt, 'yyyy-MM-dd hh:mm:ss')
					return date
				}
			}, {
				label: '支付凭证',
				prop: 'voucher',
				render: row => {
					return (<div className="table-img-con"><img className="table-img" alt="" src={ row.voucher } /></div>)
				}
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
	}
	saveContent = e => {
		e.preventDefault()
		console.log(this.state.voucher)
		// Notification({
		// 	title: '成功',
		// 	message: '这是一条成功的提示消息',
		// 	type: 'success'
		// })
		this.form.validate((valid) => {
			if (valid) {
				if (this.state.voucher === '') {
					Message.warning('请上传支付凭证')
					return false
				}
				this.props.addRecharge({rechargeMoney:this.state.form.rechargeMoney,voucher:this.state.voucher})
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
	inputfile =()=> {
		const file1 = document.querySelector('#input').files[0]
		// const flag = this.beforeAvatarUpload(file1)
		// if(!flag){
		// 	return false
		// }
		console.log(file1)
		const that=this
    if(file1){
      var reader = new FileReader()
					// 图片文件转换为base64
				reader.readAsDataURL(file1)
				reader.onload = function(){
				// 显示图片
				// document.getElementById('file1_img').src = this.result
				that.setState({
					voucher:this.result
				})
			}
    }
  }
	render() {
		const { list, btnLoading } = this.props
		const { form, rules, dialogVisible, voucher } = this.state
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
							<Form.Item label="充值金额" prop="rechargeMoney">
								<Input type="number" value={ form.rechargeMoney } onChange={ this.onChange.bind(this,'rechargeMoney') } />
							</Form.Item>
							<Form.Item label="支付凭证" prop="voucher">
								<div className="my-upload">
								<input className="upload-input" type="file" id="input" name="file1" onChange={ this.inputfile } />
								{ voucher ? <img src={ voucher } className="avatar" alt="" /> : <i className="el-icon-plus avatar-uploader-icon" /> }
								</div>
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
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageRecharge, addRecharge }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BlackUser)
