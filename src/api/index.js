
import request from '@/plugins/request';

const REST_PREFIX = '/server/data'

export default {
    get: function (url, params, success, failure) {
        return request({ url: REST_PREFIX + url, method: 'get', params }).then(res => {
            success(res)
        }).catch(err => {
            failure(err);
        })
    },
    post: function (url, params, success, failure) {
        return request({ url: REST_PREFIX + url, method: 'post', params }).then(res => {
            success(res)
        }).catch(err => {
            failure(err);
        })
    }
}
