import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { withRouter } from 'react-router'
import { Buttonm, Tag, Card, Icon, Timeline   } from 'antd';
import styles from '../style/billDetails.less'
import bill from 'service/bill/bill-service.jsx'
import { operId } from 'utils'
import BillClassify from 'Component/bill/billClassify.jsx'
const _bill =  new bill()
class billDetails extends React.Component{
    constructor(props){

        super(props)

        this.state = {
            pageVariate : {
                dicTraceInfoList:[],
                finaReportDetailList:[],
                finaReportBindList:[],
                contractPads:[],
                flowLog:[],
                overdues:[],
                reportStatus:0
            }
        }

    }
    componentDidMount() {
        if( this.props.match.params.id ){
            this.mountDetails()
        }
    }
    mountDetails(){
        let { id : reportId } = this.props.match.params
        _bill.detailsPlug({
            reportId,
            operId
        }).then( (response ) =>{
           
            let { data : { code, result : pageVariate } } =  response 
            if( code == 0 ){
                this.setState({
                    pageVariate
                })
            }
        })
    }
    render(){
        let {
            pageVariate 
                : 
            {
                finaReportDetailList,
                billDate,
                reportId,
                reportStatus,
                createTime,
                buildTime,
                confirmTime,
                payTime,
                receiveName,
                receiveBank,
                receiveBankNum,
                companyName,
                companyLinker,  
                companyMobile,
                saleName,
                saleMobile,
                beforeName,
                beforeMobile

            } 
        } = this.state
        return(
            <div className='billDetails'>
                <div className={styles.billHeader}>
                    <Tag>常用操作</Tag>
                    <Tag>审核账单</Tag>
                    <Tag>绑定余额</Tag>
                    <Tag>代客户确认账单</Tag>
                </div>
                <Card
                    hoverable
                >
                    <div className={styles.CardLeft}>
                        <div className={styles.billNum}>
                            { billDate } 账单
                            <span>
                                账单号: {reportId}
                            </span>
                        </div>
                        {
                            status( reportStatus )
                        }
                    </div>
                    <div className={styles.CardRight}>
                        <div className={styles.RightTime}>
                            <Icon type="clock-circle" /> 实际生成时间{createTime}
                        </div>
                        <ul className={styles.RightDate}>
                            <li>账单生成日：{buildTime}</li>
                            <li>账单确认日：{confirmTime}</li>
                            <li>账单付款日：{payTime}</li>
                        </ul>
                    </div>
                </Card>
                <Card 
                    title="账单明细"
                    className={`Card ${styles.Card}`}
                >
                    {
                        finaReportDetailList.length 
                            &&
                        finaReportDetailList.map( (item,index) => <BillClassify key={index} {...item}></BillClassify>)
                    }
                </Card>
                <Card 
                    title="收款账号"
                    hoverable
                    className={`Card ${styles.Card}`}
                >
                    <div className={styles.information}>
                        <span>账户全称： <strong>{receiveName}</strong></span>
                        <span>开户银行： <strong>{receiveBank}</strong></span>
                        <span>银行账户： <strong>{receiveBankNum}</strong></span>
                    </div>
                    <div className={styles.account}>
                        <p>1.请您在三个工作日内核对数据明细及总金额并回复确认。</p>
                        <p>如在三个工作日内未收到您的回复，我司将视为您已确认以上应付款总计金额，并同意按此金额付款</p>
                        <p>2.上列账款敬请按照合同约定时间及时支付，若通过银行汇款，请在“用途”中写在本账单右上角账单号</p>
                    </div>
                </Card>
                <Card 
                    title="单位账号"
                    hoverable
                    className={`Card ${styles.Card}`}
                >
                    <div className={styles.information}>
                        <span>客户 ： <strong>{companyName}</strong></span>
                        <span>联系人： <strong>{companyLinker} {companyMobile}</strong></span>
                        <span>销售： <strong>{saleName} {saleMobile}</strong></span>
                        <span>前道客服： <strong>{beforeName} {beforeMobile}</strong></span>
                    </div>
                </Card>
                <Card 
                    title="跟踪记录"
                    hoverable
                    className={`Card ${styles.Card}`}
                >
                    <Timeline mode="alternate">
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
                        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
                    </Timeline>
                </Card>
            </div>
        )
    }
}

/**
 * @event 审核
 */
const status = ( val  ) => {
    const statusList = [
        {},
        { label: '审核中', value: 'magenta'},
        { label: '待确认', value: 'red'},
        { label: '待付款', value: 'volcano'},
        { label: '已付款', value: 'orange'},
        { label: '已解锁', value: 'gold'},
        { label: '已超期', value: 'lime'},
        { label: '已中止', value: 'green'},
        { label: '更新中', value: 'cyan'},
        { label: '解锁更新', value: 'blue'},
        { label: '更新异常', value: 'geekblue'},
        { label: '解锁更新异常', value: 'purple'},
        { label: '生成异常', value: '#108ee9'}
    ]
    return (
        <Tag className={styles.tagLess} color={statusList[val].value}>
            当前账单状态为：{statusList[val].label}
        </Tag>
    )
}
export default withRouter(billDetails)

