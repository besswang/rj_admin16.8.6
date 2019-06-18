// 报表统计-数据看版
import React, { Component } from 'react'
import { Card, Loading } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectDataCheckCount } from './actions'
import solt from '@global/solt'
import '@styles/look.less'
class Look extends Component {
  static propTypes = {
    selectDataCheckCount: PropTypes.func.isRequired,
    lookInfo: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
    this.state={
      data:[
        {
          text:'放款金额',
          num: 'allLoanMoney'
        }, {
          text: '待还总金额',
          num: 'allToReturnMoney'
        }, {
          text: '未逾期待还金额',
          num: 'noOverdueReturnMoney'
        }, {
          text: '还款总金额',
          num: 'allReturnMoney'
        }, {
          text: '还款收益',
          num: 'allReturnProfit'
        }, {
          text: '续期金额',
          num: 'allRenewalMoney'
        }, {
          text: '逾期金额',
          num: 'overdueToReturnMoney'
        }, {
          text: '逾期本金',
          num: 'overduePrincipal'
        }
      ]
    }
  }
  componentWillMount() {
    this.props.selectDataCheckCount()
    console.log(this.props.lookInfo)
  }
  render(){
    const { lookInfo } = this.props
    return (
      <Loading loading={ lookInfo.loading }>
      <div className="look-card-con flex flex-direction_row justify-content_flex-center">
        {
          lookInfo.data.map((item, index) => {
            return (
              <Card className="look-card" bodyStyle={ { backgroundColor:solt.getColor() } } key={ item.text }>
                <p>{ item.num }</p>
                <p>{ item.text }</p>
              </Card>
            )
          })
        }
      </div>
      </Loading>
    )

  }
}
const mapStateToProps = state => {
	const { lookInfo } = state
	return { lookInfo }
}
const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators({ selectDataCheckCount }, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Look)
