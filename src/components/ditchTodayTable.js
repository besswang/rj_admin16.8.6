import React, { Component } from 'react'
import { Table } from 'element-react'
import PropTypes from 'prop-types'
// import num from '../global/num'
export default class TodayTable extends Component {
  render() {
    const [ ...arrObj ] = this.props.data
    return (
      <Table
        style={ { width: '100%' } }
        data={ arrObj }
        border
        stripe
      >
        <Table.Column label="序号" type="index" />
        <Table.Column label="渠道名称" prop="channelName" />
        <Table.Column label="注册人数" prop="userCount"/>
        <Table.Column label="个人信息" prop="emergencyCount"/>
        <Table.Column label="身份认证" prop="idCardCount"/>
        <Table.Column label="手机认证" prop="phoneDateCount"/>
        <Table.Column label="银行认证" prop="bankAuthenticationCount"/>
        <Table.Column label="申请单数" prop="orderCount"/>
        <Table.Column label="申请率" prop="orderRate"/>
        {/* render = {
          (row) => {
            if (row.apply && row.register) {
              // 申请率 = 申请单数 / 注册人数
              const applynum = parseInt(row.apply) / parseInt(row.register)
              // return (this.toDecimal(applynum))
              return (num.toDecimal(applynum))
            } else {
              return ('0.00%')
            }
          }
        } */}
        <Table.Column label="放款人数" prop="orderStateCount"/>
        <Table.Column label="放款率" prop="orderStateRate" />
        {/* render = {
          (row) => {
            if (row.loanNum && row.register) {
              // 放款率 = 放款人数 / 注册人数
              const loanNumnum = parseInt(row.loanNum) / parseInt(row.register)
              return (num.toDecimal(loanNumnum))
            } else {
              return ('0.00%')
            }
          }
        } */}
      </Table>
    )
  }
}
TodayTable.propTypes= {
  data: PropTypes.array
}