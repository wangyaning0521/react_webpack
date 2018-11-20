/*
* @Author: WangYaNing
* @Date:   2018-01-23 22:18:41
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-23 22:26:09
*/
import React from 'react';
import { Modal,Row,Col } from 'antd';
import FromBusi from './from-busi.jsx'
import ApplyInfo from './apply-info.jsx'
import busi from 'service/busi/busi-service.jsx'
import userImg from '../../images/selectUser.png'
import styles from '../../style/addbusi.less'

const _busi = new busi()

class Busi extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ModalShow : this.props.addShow,
            formValidate : {},
            insuranceInfor : {
                aInsured : 2,
                fundaInsured : 2
            },
            social : {},
            fund   : {},
            show   : false
        }
    }

    
    handleOk(){
        this.setState({
            ModalShow: false
        })
        this.props.handleCancel()
    }
    handleCancel(){
        this.setState({
            ModalShow: false
        })
        this.props.handleCancel()
    }

    onValuesChange( formValidate, insured ){
        this.setState({
            formValidate
        })

        setTimeout( () => {
            this.changeInsured( 1, insured )
            this.changeInsured( 2, insured )
        },200)
    }

    /** @event 险种公共方法 */
    async changeInsured(type, insured, packageId, supplierId) {
        /** @param {Type} 1 为社保 2 为 公积金 */
        /** @param {insured} 参保地 */
        /** @param {packageId} 政策包 */
        /** @param {supplierId} 供应商 */

        let { domicile, nature, projectId } = this.state.formValidate
        let { aInsured, fundaInsured } = this.state.insuranceInfor

        let param = {
            province: insured[0],
            city: insured[1],
            district: insured[2] || '',
            nature,
            type,
            projectId,
            packageId,
            supplierId
        }

        if( domicile.length == 0 ) 
            param.region = 0
        else if ( insured[0] == domicile[0] && insured[1] == domicile[1] ) 
            param.region = 1
        else 
            param.region = 2

        param.joinType = type == 1 ? aInsured : fundaInsured

    

        let { data : { code , result } } = await _busi.applyInfoA( param )

        if( type == 1  ){
            this.setState({
                social : result
            })
        }
        if( type == 2  ){
            this.setState({
                fund : result,
                show : true
            })
        }
    }

    render(){
        let { ModalShow, fund, social, show } = this.state
        let { okText, cancelText } = defaultText
        return (
            <Modal
                title="单个增员"
                width={'1280px'}
                visible={ModalShow}
                okText={okText}
                cancelText={cancelText}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <FromBusi 
                            onValuesChange = {this.onValuesChange.bind(this)}
                        />
                    </Col>
                    <Col span={20} className={styles.col}>
                        {
                            show 
                                &&
                            <div className={styles.infor}>
                                <ApplyInfo
                                    type= { 1 }
                                    res = { social }
                                />
                                <ApplyInfo
                                    type= { 2 }
                                    res = { fund }
                                />
                            </div>
                        }
                        {
                            !show 
                                &&
                            <div className={styles.infor}>
                                <img src={userImg} />
                            </div>
                        }
                    </Col>
                </Row>
            </Modal>
        );
    }
}

const defaultText={
    okText: '提交',
    cancelText : "取消"
}

export default Busi;