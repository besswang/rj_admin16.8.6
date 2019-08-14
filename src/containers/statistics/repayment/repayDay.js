// 报表统计-还款统计
import React, { Component } from 'react'
import { Loading, Table, Breadcrumb } from 'element-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sizeChange, currentChange, initSearch } from '@redux/actions'
import { pageRepaymentCountByDay } from '../actions'
import MyPagination from '@components/MyPagination'
// import Search from '@components/Search'
import num from '@global/num'
import { Link } from 'react-router-dom'
class RepayMent extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    sizeChange: PropTypes.func.isRequired,
    currentChange: PropTypes.func.isRequired,
    initSearch: PropTypes.func.isRequired,
    pageRepaymentCountByDay: PropTypes.func.isRequired,
  }
  constructor(props){
    console.log('constructor()')
    super(props)
    this.state = {
      column:[
        {
          label: '#',
          width: 60,
          render: (a,b,c) => {
            return c+1
          }
        }, {
          label:'渠道名称',
          prop: 'channelName',
          width:120
        }, {
          label: '应还单数',
          width: 100,
          prop: 'shouldReturnNum'
        }, {
          label: '实还单数',
          width: 100,
          // prop: 'alreadyReturnNum', //   全额单数+续期单数
          render: row => {
            if (row.fullRepaymentNum !== null && row.renewNum !== null) {
              const x = parseInt(row.fullRepaymentNum) + parseInt(row.renewNum)
              return x
            } else {
              return 0
            }
          }
        }, {
          label: '未还单数',
          width: 100,
          // prop: 'noReturnNum', // 应还单数- 实还单数
          render: row => {
            if (row.fullRepaymentNum !== null && row.renewNum !== null) {
              const x = parseInt(row.fullRepaymentNum) + parseInt(row.renewNum)
              if (row.shouldReturnNum !==null && x !== null) {
                const n = parseInt(row.shouldReturnNum) - parseInt(x)
                return n
              } else {
                return 0
              }
            } else {
              return 0
            }
          }
        }, {
          label: '还款率',
          // prop: 'repaymentRate', // 还款率 = 实还单数 /应还单数
          render: row => {
            if (row.fullRepaymentNum !== null && row.renewNum !== null) {
              const x = parseInt(row.fullRepaymentNum) + parseInt(row.renewNum)
              if (x && row.shouldReturnNum) {
                const n = parseInt(x) / parseInt(row.shouldReturnNum)
                return (num.toDecimal(n*100))
              } else {
                return ('0.00%')
              }
            } else {
              return ('0.00%')
            }
          }
        }, {
          label: '全额单数', // 全额还款单数
          width: 100,
          prop: 'fullRepaymentNum'
        }, {
          label: '全额率', // 全额还款率
          prop: 'fullRepaymentRate', // 全额还款单数/应还单数
          render: row => {
            if (row.fullRepaymentNum && row.shouldReturnNum) {
              const n = parseInt(row.fullRepaymentNum) / parseInt(row.shouldReturnNum)
              return (num.toDecimal(n*100))
            } else {
              return ('0.00%')
            }
          }
        }, {
          label: '续期单数',
          width: 100,
          prop: 'renewNum'
        }, {
          label: '续期率',
          prop: 'renewRate', // 续期单数/应还单数
          render: row => {
            if (row.renewNum && row.shouldReturnNum) {
              const n = parseInt(row.renewNum) / parseInt(row.shouldReturnNum)
              return (num.toDecimal(n*100))
            } else {
              return ('0.00%')
            }
          }
        }, {
          label: '复借单数',
          width: 100,
          prop: 'moreBorrowNum'
        }, {
          label: '复借率',
          prop: 'moreBorrowRate', // 复借单数/应还单数
          render: row => {
            if (row.moreBorrowNum && row.shouldReturnNum) {
              const n = parseInt(row.moreBorrowNum) / parseInt(row.shouldReturnNum)
              return (num.toDecimal(n*100))
            } else {
              return ('0.00%')
            }
          }
        }, {
          label: '首借',
          headerAlign:'center',
          subColumns: [
            {
              label: '应还单数',
              width: 100,
              prop: 'newShouldReturnNum'
            }, {
              label: '已还单数',
              width: 100,
              prop: 'newAlreadyReturnNum'
            }, {
              label: '未还单数',
              width: 100,
              // prop: 'newNoReturnNum',
              render: row => {
                if (row.newShouldReturnNum !== null && row.newAlreadyReturnNum !== null) {
                  const n = parseInt(row.newShouldReturnNum) - parseInt(row.newAlreadyReturnNum)
                  return n
                } else {
                  return 0
                }
              }
            }, {
              label: '还款率',
              prop: 'newRepaymentRate', // 已还单数（首借）/应还单数（首借）
              render: row => {
                if (row.newAlreadyReturnNum && row.newShouldReturnNum) {
                  const n = parseInt(row.newAlreadyReturnNum) / parseInt(row.newShouldReturnNum)
                  return (num.toDecimal(n*100))
                } else {
                  return ('0.00%')
                }
              }
            }
          ]
        }, {
          label: '续期',
          headerAlign: 'center',
          subColumns: [
            {
              label: '应还单数',
              width: 100,
              prop: 'xuShouldReturnNum'
            }, {
              label: '已还单数',
              width: 100,
              prop: 'xuAlreadyReturnNum'
            }, {
              label: '未还单数',
              width: 100,
              // prop: 'xuNoReturnNum',
              render: row => {
                if (row.xuShouldReturnNum !== null && row.xuAlreadyReturnNum !== null) {
                  const n = parseInt(row.xuShouldReturnNum) - parseInt(row.xuAlreadyReturnNum)
                  return n
                } else {
                  return 0
                }
              }
            }, {
              label: '还款率',
              prop: 'xuRepaymentRate', // 已还单数（续期）/应还单数（续期）
              render: row => {
                if (row.xuAlreadyReturnNum && row.xuShouldReturnNum) {
                  const n = parseInt(row.xuAlreadyReturnNum) / parseInt(row.xuShouldReturnNum)
                  return (num.toDecimal(n*100))
                } else {
                  return ('0.00%')
                }
              }
            }
          ]
        }, {
          label: '复借',
          headerAlign: 'center',
          subColumns: [
            {
              label: '应还单数',
              width: 100,
              prop: 'fuShouldReturnNum',
              render: row => {
                return row.fuShouldReturnNum ? row.fuAlreadyReturnNum:0
              }
            }, {
              label: '已还单数',
              width: 100,
              prop: 'fuAlreadyReturnNum'
            }, {
              label: '未还单数',
              width: 100,
              // prop: 'fuNoReturnNum',
              render: row => {
                if (row.fuShouldReturnNum !== null && row.fuAlreadyReturnNum !== null) {
                  const n = parseInt(row.fuShouldReturnNum) - parseInt(row.fuAlreadyReturnNum)
                  return n
                } else {
                  return 0
                }
              }
            }, {
              label: '还款率',
              prop: 'fuRepaymentRate', // 已还单数（续期）/应还单数（续期）
              render: row => {
                if (row.fuAlreadyReturnNum && row.fuShouldReturnNum) {
                  const n = parseInt(row.fuAlreadyReturnNum) / parseInt(row.fuShouldReturnNum)
                  return (num.toDecimal(n*100))
                } else {
                  return ('0.00%')
                }
              }
            }
          ]
        }
      ]
    }
  }
  componentWillMount() {
    this.props.initSearch()
  }
  componentDidMount() {
    this.props.pageRepaymentCountByDay()
  }
  handleSearch = e => {
    e.preventDefault()
    this.props.pageRepaymentCountByDay()
  }
  sizeChange = e => {
    this.props.sizeChange(e)
    this.props.pageRepaymentCountByDay()
  }
  onCurrentChange = e => {
    this.props.currentChange(e)
    this.props.pageRepaymentCountByDay()
  }
  render(){
    const { list } = this.props
    return (
      <div>
        <Breadcrumb separator="/" className="margin-bottom15">
          <Breadcrumb.Item>
            <Link to="/statistics/repayment">
              {'还款统计'}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{ '当天' }</Breadcrumb.Item>
        </Breadcrumb>
        {/* <Search showTime showChannel>
          <Form.Item>
            <Button onClick={ this.handleSearch } type="primary">{'搜索'}</Button>
          </Form.Item>
          <Form.Item />
        </Search> */}
        <Loading loading={ list.loading }>
          <Table
            style={ { width: '100%' } }
            columns={ this.state.column }
            data={ list.data }
            border
            stripe
          />
        </Loading>
        <MyPagination
          onSizeChange={ this.sizeChange }
          onCurrentChange={ this.onCurrentChange }
        />
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
		...bindActionCreators({sizeChange, currentChange, initSearch, pageRepaymentCountByDay}, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(RepayMent)
