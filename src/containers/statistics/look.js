// 报表统计-数据看版
import React, { Component } from 'react'
import { Card } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectDataCheckCount } from './actions'
import solt from '@global/solt'
import '@styles/look.less'
class Look extends Component {
  static propTypes = {
    selectDataCheckCount: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={
      data:[
        {
          text:'总还金额',
          num:111
        }, {
          text: '总还本金',
          num: 111
        }, {
          text: '总还收益',
          num: 111
        }, {
          text: '总收益',
          num: 111
        }, {
          text: '待收本金',
          num: 111
        }, {
          text: '待收收益',
          num: 111
        }, {
          text: '逾期本金',
          num: 111
        }, {
          text: '逾期金额',
          num: 111
        }, {
          text: '渠道费用',
          num: 111
        }, {
          text: '延期金额',
          num: 111
        }, {
          text: '风控费用',
          num: 111
        }, {
          text: '净收利益',
          num: 111
        }
      ]
    }
  }
  componentWillMount() {
    this.props.selectDataCheckCount()
  }
  render(){
    console.log(solt.getColor())
    return (
      <div className="look-card-con flex flex-direction_row justify-content_flex-center">
        {
          this.state.data.map((item,index) => {
            return (
              <Card className="look-card" bodyStyle={ { backgroundColor:solt.getColor() } } key={ item.text }>
                <p>{ item.num }</p>
                <p>{ item.text }</p>
              </Card>
            )
          })
        }
      </div>
    )

  }
}
const mapStateToProps = state => {
	// const { list, time } = state
	// return { list, time }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectDataCheckCount }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Look)
