import React, { Component } from 'react'
import { Select, Message, Button } from 'element-react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import api from '@api/index'
class Backup extends Component {
	static propTypes = {

  }
	constructor(props) {
		super(props)
		this.state = {
			btnLoading: false,
			province: [], // 省
			city: [], // 市
			area: [], // 区
			country: [], //乡
			provinceId: null,
			cityId: null,
			areaId: null,
			countryId:null,
			id:null
		}
	}
	componentWillMount() {

  }
  componentDidMount() {
		this.selectProvince()
	}
	selectProvince = async () => {
		const data = await api.selectAreasByIdApi()
		if(data.success){
			this.setState({
				province: data.data,
			})
		}else{
			Message.error(data.msg)
		}
	}
	selectCity = async id => {
		const data = await api.selectAreasByIdApi({id:id})
		if (data.success) {
			this.setState({
				city: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	selectArea = async id => {
		const data = await api.selectAreasByIdApi({
			id: id
		})
		if (data.success) {
			this.setState({
				area: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	selectCountry = async id => {
		const data = await api.selectAreasByIdApi({
			id: id
		})
		if (data.success) {
			this.setState({
				country: data.data
			})
		} else {
			Message.error(data.msg)
		}
	}
	onChangePro = e => {
		this.setState({
			id: e,
			provinceId: e,
			cityId:null,
			areaId:null,
			countryId: null
		})
		if(e !== ''){
			this.selectCity(e)
		}else{
			this.setState({
				provinceId: null,
				cityId: null,
				areaId: null,
				countryId: null
			})
		}
	}
	onChangeCity = e => {
		this.setState({
			id: e,
			cityId:e,
			areaId: null,
			countryId: null
		})
		if (e !== '') {
			this.selectArea(e)
		}
	}
	onChangeArea = e => {
		this.setState({
			id: e,
			areaId:e,
			countryId: null
		})
		if( e !== ''){
			this.selectCountry(e)
		}
	}
	onChangeCountry = e => {
		this.setState({
			id: e,
			countryId:e
		})
	}
	updateAreaState = async () => {
		const id = this.state.id
		if(id){
			this.setState({
				btnLoading: true
			})
			const res = await api.updateAreaStateApi({id:id,state:0})
			if(res.success){
				Message.success(res.msg)
				this.setState({
					provinceId: null,
					cityId: null,
					areaId: null,
					countryId: null
				})
			}else{
				Message.error(res.msg)
			}
			this.setState({
				btnLoading: false
			})
		}else{
			Message.warning('请选择禁用的地区')
		}
	}
	render() {
		const { province, city, area, country, provinceId, cityId , areaId, countryId, btnLoading } = this.state
		return (
			<div>
				<Select
					onChange={ e => this.onChangePro(e) }
					value={ provinceId }
					clearable
					placeholder="选择省"
				>
					{
						province &&
						province.map(el => {
							return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
						})
					}
				</Select>
				{ city.length>0 && provinceId !=='' && provinceId !==null &&
					<Select
						onChange={ e => this.onChangeCity(e) }
						value={ cityId }
						clearable
						placeholder="选择市"
					>
						{
							city.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				}
				{
					area.length > 0 && cityId !== '' && cityId !== null && provinceId !== null &&
					<Select
						onChange={ e => this.onChangeArea(e) }
						value={ areaId }
						clearable
						placeholder="选择区"
					>
						{
							area.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				}
				{ country.length>0 && areaId !=='' && areaId !== null && provinceId !==null &&
					<Select
						onChange={ e => this.onChangeCountry(e) }
						value={ countryId }
						clearable
						placeholder="选择乡"
					>
						{
							country.map(el => {
								return (<Select.Option key={ el.id } label={ el.areaname } value={ el.id } />)
							})
						}
					</Select>
				}
				<Button className="margin_left15" onClick={ this.updateAreaState.bind(this) } type="warning" loading={ btnLoading }>{ '禁用' }</Button>
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	const {} = state
// 	return {}
// }
// const mapDispatchToProps = dispatch => {
// 	return {
// 		...bindActionCreators({}, dispatch)
// 	}
// }
export default connect()(Backup)
