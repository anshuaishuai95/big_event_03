$(function () {
    // 导出 form
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.trim().length < 1 || value.trim().length > 6) {
                return '用户昵称长度为1~6之间'
            }

        }
    })

    //用户名称渲染
    let layer = layui.layer
    initInfo()
    function initInfo() {
        //    发送ajax
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //成功 渲染
                form.val('formInfo', res.data)
            }
        })
    }

    //重置表单
    $('#btn1').on('click', function (e) {
        e.preventDefault()
        //重新渲染 表单
        initInfo()
    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //成功渲染
                layer.msg(res.message)
                //调用父页面中更新用户信息个头像的方法
                window.parent.getUserInfo()
            }
        })
    })



})