//入口函数
$(function () {
    //封装一个全局函数，，后面需要多次调用
    getUserInfo()

    //退出登录
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地tokn
            localStorage.removeItem('token')
            //退出 跳转页面
            location.href = '/03-login.html'
            //关闭询问窗
            layer.close(index);
        });
    })
})

//封装一个全局函数
function getUserInfo() {
    //发送ajax  //获取用户基本信息
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            // console.log(123, res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            //渲染 头像 ，文字
            renderAvatar(res.data)
        }
    })
}
//封装头像，文字渲染
function renderAvatar(user) {
    //渲染用户名，如果有名称直接用名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎' + name);
    // 判断 是否有头像。如果没有就渲染文字
    if (user.user_pic != null) {
        //渲染头像，隐藏文字
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        //隐藏头像 渲染文字
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())

    }
}