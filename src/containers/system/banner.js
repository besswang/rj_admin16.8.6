import React, { Component } from 'react'
import { Button, Loading, Table, Dialog, Upload, Message } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRotationChart, deleteRotationChart, updateRotationChart } from './actions'
import MyPagination from '@components/MyPagination'
import DisableBtn from '@components/DisableBtn'
class Banner extends Component {
	static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
		pageRotationChart: PropTypes.func.isRequired,
		deleteRotationChart: PropTypes.func.isRequired,
		updateRotationChart: PropTypes.func.isRequired
  }
	constructor(props) {
		super(props)
		this.state = {
			btnLoading: false,
			dialogVisible: false,
			dialogImageUrl: '',
			columns: [{
					type: 'index',
					fixed: 'left'
				}, {
					label: '图片',
					prop: 'advertUrl',
					align: 'center',
					render: row => {
						return (
							<div style={ {overflow:'hidden', paddingTop:10, paddingBottom:10} }>
								<img style={ { display:'block', height: 60, margin: '0 auto'} } src={ row.advertUrl } alt="" onClick={ this.openDialog.bind(this,row.advertUrl) }/>
							</div>
						)
					}
				}, {
					label: '上架状态',
					prop: 'status',
					render: row => {
						const text = row.status === 1 ? '已下架' : '已上架'
						return text
					}
				}, {
					label: '排序',
					prop: 'sort'
				}, {
          label: '操作',
          render: row => {
            return (
							<div>
								<DisableBtn value={ row.status } result={ 1 } text={ ['上架','下架'] } onClick={ this.props.updateRotationChart.bind( this,{id:row.id, status:row.status}) }/>
								<Button type="danger" size="mini" onClick={ this.props.deleteRotationChart.bind(this,{id:row.id}) }>{'删除'}</Button>
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
    this.props.pageRotationChart()
	}
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageRotationChart()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageRotationChart()
	}
	openDialog = url => {
		this.setState({
			dialogVisible: true,
			dialogImageUrl: url
		})
	}
	submitUpload() {
		this.upload.submit()
		this.setState({
			btnLoading: true
		})
	}
	onChange = (file) => {
		const { success, msg } = file.response
		if(success){
			Message.success(msg)
			this.props.pageRotationChart()
		}else{
			Message.error(msg)
		}
		this.upload.clearFiles()
		this.setState({
			btnLoading: false
		})
	}
	render() {
		const { list } = this.props
		const { columns, dialogVisible, dialogImageUrl, btnLoading } = this.state
		return (
			<div>
				<Upload
					className = "margin-bottom15"
					ref={ e => {this.upload = e} }
					action="/rjwl/api/rotationChart/addRotationChart"
					accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
					limit={ 1 }
					autoUpload={ false }
					tip={ <div className="el-upload__tip">{'只能上传jpg/png文件，且不超过500kb'}</div> }
					trigger={ <Button size="small" type="primary">{'选取文件'}</Button> }
					onChange={ this.onChange }
				>
					<Button style={ { marginLeft: '10px'} } size="small" type="success" onClick={ () => this.submitUpload() } loading={ btnLoading }>{'上传到服务器'}</Button>
				</Upload>
				<Loading loading={ list.loading }>
					<Table
						style={ { width: '100%' } }
						columns={ columns }
						data={ list.data }
						border
					/>
				</Loading>
        <MyPagination
          total={ list.total }
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
				<Dialog
				visible={ dialogVisible }
				size="tiny"
				onCancel={ () => this.setState({ dialogVisible: false }) }
				>
					<img width="100%" src={ dialogImageUrl } alt="" />
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { list } = state
	return { list }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ sizeChange, currentChange, initSearch, pageRotationChart, deleteRotationChart, updateRotationChart }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner)
