import axios from 'Axios'
class busi {
    // 获取公司
    getCompanyList( data ){
        return axios({
            method   : 'post',
            url     : '/qthl-wf-busi/api/insurApplyAManager/company/search',
            data
        });
    }
    //获取项目
    getProjectsList( data ){
        return axios({
            method   : 'post',
            url      : '/qthl-wf-busi/api/insurApplyAManager/insurApplyA/projects',
            data
        });
    }
    //获取项目
    AreaTreeList(  ){
        return axios({
            method   : 'get',
            url      : '/qthl-wf-policy/api/product/adjunction/area/tree/1',
        });
    }
    //险种
    applyInfoA( data ){
        return axios({
            method   : 'post',
            url      : '/qthl-wf-busi/api/insurApplyAManager/applyInfoA',
            data
        });
    }
    
   
}
export default busi