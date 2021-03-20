$(function () {
    //密码校验规则  导出form
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '新密码与原密码不能一致'
            };
        },
        rePwd: function (value) {
            if (value != $('[name="newPwd"]').val()) {
                return '两次输入的密码要一致'
            }

        }
    })

    //提交修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //成功 提交信息
                layer.msg(res.message)
                $('.layui-form')[0].reset()

            }
        })
    })

})