// 手机号
let mobile = /^[1][3,4,5,7,8][0-9]{9}$/

let FormValidate = (function () {
    function FormValidate () {}
    // From表单验证规则  可用于公用的校验部分
    FormValidate.Form = function () {
        return {
            // 手机号的验证规则
            validateMobile (rule, value, callback) {
                if (value) {
                    if (!mobile.test(value)) {
                        callback(new Error('请输入正确手机号'))
                    } else {
                        callback()
                    }
                }
                callback();
            }
        }
    }

    return FormValidate
}())

exports.FormValidate = FormValidate
