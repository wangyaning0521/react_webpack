import axios from 'Axios'
import md5   from 'md5'
class _login {
    // 登录
    loginLayer( params ){
        return axios({
            method    : 'post',
            url     : '/qlth-wf-base/api/user/login',
            data    : {
                email        :  params.email,
                password     :  md5(md5(md5(params.password))),
                validateCode :  params.validateCode,
                time         :  params.time
            }
        });
    }
}
export default _login