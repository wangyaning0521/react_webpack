import axios from 'Axios'
class bill {
    // 获取地区
    getPlugList(){
        return axios({
            method   : 'get',
            url     : '/qthl-wf-policy/api/area/province/city/plug',
        });
    }
}
export default bill