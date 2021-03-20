$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //上传
    $('#btnImg').on('click', function () {
        $('#file').click()
    })

    // 修改参见图片
    let layer = layui.layer
    $('#file').on('change', function (e) {
        //拿到用户选择的文件
        let file = e.target.file[0]
        //非空校验
        if (file == undefined) {
            return layer.msg('请选择图片')
        }
        // 根据文件选择的文件 创建一个对应的URL 地址
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //上传头像
    $('#btnpload').on('click', function () {
        //获取 base64位类型的头像   
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
    })
    //发送ajax
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: { avatar: dataURL },
        success: (res) => {
            //    console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            //上传成功
            layer.msg(res.message)
            //调用父页上的 方法 重新 渲染头像
            window.parent.getUserInfo()
        }
    })
})