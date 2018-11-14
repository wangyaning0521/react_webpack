import React from 'react';
import { Provider, connect } from 'react-redux'; 
import { withRouter } from 'react-router'
import { Buttonm, Tag, Card, Icon   } from 'antd';
import styles from '../style/billDetails.less'

class billDetails extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
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
                            2018 年06 月账单
                            <span>
                                账单号:YD201806141200218662825
                            </span>
                        </div>
                        <Tag className={styles.tagLess} color="magenta">
                            当前账单状态为：审核中
                        </Tag>
                    </div>
                    <div className={styles.CardRight}>
                        <div className={styles.RightTime}>
                            <Icon type="clock-circle" /> 实际生成时间2018-06-14
                        </div>
                        <ul className={styles.RightDate}>
                            <li>账单生成日：2018-11-02</li>
                            <li>账单确认日：2018-11-02</li>
                            <li>账单付款日：2018-11-02</li>
                        </ul>
                    </div>
                </Card>
                <Card 
                    title="账单明细"
                    hoverable
                    className={styles.Card}
                >
                    <Card.Grid 
                        className={styles.gridStyle}
                    >
                        <p>社保</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p>
                    </Card.Grid>
                    <Card.Grid className={styles.gridStyle}>
                        <p>公积金</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p>
                    </Card.Grid>
                    <Card.Grid className={styles.gridStyle}>
                        <p>社保服务费</p>
                        <p>
                            服务费 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p>
                    </Card.Grid>
                    <Card.Grid className={styles.gridStyle}><p>外呼费</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p></Card.Grid>
                    <Card.Grid className={styles.gridStyle}>
                    <p>调差</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p></Card.Grid>
                    <Card.Grid className={styles.gridStyle}>
                    <p>套餐费</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p>
                        </Card.Grid>
                    <Card.Grid className={styles.gridStyle}>
                    <p>其他</p>
                        <p>
                            共0人 单位总额￥0 +个人总额￥0 = ￥0
                        </p>
                        <p>
                            <span>申报记录</span>
                            <span>在缴记录</span>
                        </p>
                    </Card.Grid>
                </Card>
            </div>
        )
    }
}


export default withRouter(billDetails)

