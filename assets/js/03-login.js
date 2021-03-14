$(function () {
    //点击去 注册账号。隐藏login-box盒子   显示reg-box 盒子
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去 去登录。隐藏reg-box 盒子  显示login-box盒子   
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //  密码验证  自动校验
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd: function (value) {
            console.log(value);
            if (value != $('.reg-box input[name=password]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    //注册 
    let layer = layui.layer;
    $('#ref_form').on('submit', function (e) {
        // 阻止提交默认事件
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                //提示成功
                layer.msg(res.message, { icon: 6 });
                //切换回用户登录
                $('#link_login').click();
                //清空注册页面信息
                $('#ref_form')[0].reset()
            }
        })
    })
    //登录
    $('#login_form').on('submit', function (e) {
        // 阻止提交默认事件
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                //判断登录是否成功
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                //登录成功 跳转页面
                location.href = '/03-index.html'
                //保存到本地储存 token 后面需要用到
                localStorage.setItem('token', res.token);
            }
        })
    })
})