$(function () {
    //--------------------------------- 导航栏
    var hasClass = $('header').hasClass('bai');
    if (!hasClass) {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 600) {
                // 触发操作的代码
                $('header').addClass('bai')
            } else {
                $('header').removeClass('bai')
            }
        });
    }
    //头部交互
    $('.dummy').on('click', '.erji', function () {
        $(this).find('.erjiwarp').stop().slideToggle()
        $(this).siblings().find('.erjiwarp').slideUp()
        $(this).toggleClass('zk')
        $(this).siblings().removeClass('zk')

    })
    $(".mynav").on("mouseenter", ".on", function () {
        $(this).find('.last').slideDown()
    })
    $(".mynav").on("mouseleave", ".on", function () {
        $(this).find('.last').stop().slideUp()
    })
    //--------------------------------- 导航栏
    //头部搜索
    var flag = false
    $('.serch').click(function () {
        flag = !flag
        if (flag) {
            $('#applyCertNum').css(
                'width', '200px'
            )
        } else {
            $('#applyCertNum').css(
                'width', '0px'
            )
        }
    })
    $('#applyCertNum').on('keypress', function (event) {
        let serchVal = $.trim($('#applyCertNum').val())
        if (event.keyCode == 13) {
            if (serchVal) {
                alert('你输入的内容为1：' + serchVal);
            } else {
                alert('请输入内容')
            }
        }
    });
    $('.serchBtn').click(function () {
        let serchVal = $.trim($('#ydinput').val())
        if (serchVal) {
            alert('你输入的内容为2：' + serchVal);
        } else {
            alert('请输入内容')
        }
    })
    $('#ydinput').on('keypress', function (event) {
        let serchVal = $.trim($('#ydinput').val())
        if (event.keyCode == 13) {
            if (serchVal) {
                alert('你输入的内容为2：' + serchVal);
            } else {
                alert('请输入内容')
            }
        }
    });
    //头部搜索
    $(".close").click(function () {
        $('.mymynavbox').removeClass('show')
        $('body').removeClass('add')
    })
    $(".open").click(function () {
        $('.mymynavbox').addClass('show')
        $('body').addClass('add')

    })
})