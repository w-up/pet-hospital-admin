
import request from '@/plugins/request';

const REST_PREFIX = '/server/data'

// 第二个参数data/params对应请求的config的data/params
export default {
    get: function (url, params, success) {
        return request({ url: REST_PREFIX + url, method: 'get', params }).then(res => {
            success(res)
        }).catch(err => {
            console.log(err);
        })
    },
    post: function (url, data, success, stringify) {
        return request({ url: REST_PREFIX + url, method: 'post', data, stringify: stringify }).then(res => {
            success(res)
        }).catch(err => {
            console.log(err);
        })
    }
}
