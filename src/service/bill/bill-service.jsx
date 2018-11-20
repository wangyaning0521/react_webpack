import axios from 'Axios'
class bill {
    // 获取地区
    getPlugList(){
        return axios({
            method   : 'get',
            url     : '/qthl-wf-policy/api/area/province/city/plug',
        });
    }
    // 获取归属客服
    getAfter(){
        return axios({
            method   : 'post',
            url     : '/qlth-wf-base/api/companySystem/getEmployees',
            data:{
                roleId: 2
            }
        });
    }
    // 省市
    cityPlug(){
        return axios({
            method : 'get',
            url    : '/qthl-wf-policy/api/area/province/city/plug',
        })
    }
    // 业务类型
    busiTypePlug(){
        return axios({
            method : 'get',
            url    : '/qthl-wf-policy/api/supplierManager/supplierType/60001',
        })
    }
    // 列表方法
    TablePlug( data ){
        return axios({
            method : 'post',
            url    : '/qthl-wf-busi/api/finaReportManager/finaReport/list',
            data,
        })
    }
    // 账单详情
    detailsPlug( data ){
        return axios({
            method : 'post',
            url    : '/qthl-wf-busi/api/finaReportManager/detail',
            data,
        })
    }
    // 列表下拉账单
    statusPlug(){
        return {
            code : 0,
            result : [
                {
                    label:"审核中",
                    value:1
                },
                {
                    label:"待确认",
                    value:2
                },
                {
                    label:"待回款",
                    value:3
                },
                {
                    label:"已回款",
                    value:4
                },
                {
                    label:"已垫资",
                    value:15
                },
                {
                    label:"已解锁",
                    value:5
                },
                {
                    label:"已超期",
                    value:6
                },
                {
                    label:"已中止",
                    value:7
                },
                {
                    label:"更新中",
                    value:8
                },
                {
                    label:"解锁更新",
                    value:9
                },
                {
                    label:"更新异常",
                    value:10
                },
                {
                    label:"解锁更新异常",
                    value:11
                },
                {
                    label:"生成异常",
                    value:12
                },
            ]
        }
    }
}
export default bill