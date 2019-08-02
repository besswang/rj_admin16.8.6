import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// 引入 ECharts 主模块
var echarts = require('echarts')
// 详情-报告-信贷行为-左边
export default class EchartsBarLeft extends Component {
	// static propTypes = {
	// 	gaugeData: PropTypes.array
	// }
    constructor(props) {
        super(props)
        this.state = {
			// data: props.gaugeData
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
		this.barLeftChart()
	}
	// componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
	// 	this.setState({
	// 		data: nextProps.gaugeData
	// 	})
	// }
	barLeftChart = () => {
	    // 基于准备好的dom，初始化echarts实例
	    var barLeftChart = echarts.init(document.getElementById('barLeft'))
	    // 绘制图表
	    barLeftChart.setOption({
			tooltip : {
				trigger: 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data:['申请借款','借款']
			},
			xAxis : [
				{
					type: 'category',
					data: ['总计', '近6月', '近3月', '近1月']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'申请借款',
					type:'bar',
					data:[320, 332, 301, 334]
				},
				{
					name:'借款',
					type:'bar',
					stack: '广告',
					data:[120, 132, 101, 134]
				}
			]
	    })
	}
    render() {
        return (
            <div id="barLeft" className="bar-left" />
        )
    }
}