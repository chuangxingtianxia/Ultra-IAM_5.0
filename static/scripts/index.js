$(function () {
    $("body").removeClass("hold-transition");
    /* 初始化侧栏导航 */
    $('.up_nav_list').accordionMenu({
        sideMenuExpandHandler: function(){
            $("body").removeClass('sidebar-collapse');
            setScroll();

        },
        sideMenuCollapseHandler: function(){
            $("body").addClass('sidebar-collapse');
            $(".slimScrollDiv").attr('style','');
            $(".sidebar").attr('style','');

        }
    });
    setScroll();
    $(window, ".wrapper").resize(function () {
        setScroll();
    });
   /* $(".nav-item-warp li").hover(function(){
        $(this).children(".dropdown-menu-topbar").show()
    },function(){
        $(this).children(".dropdown-menu-topbar").hide()
    })*/

    $(".nav-item-warp li").on('mouseover',function(){
        $(this).children(".dropdown-menu-topbar").show()
    })
    $(".nav-item-warp li").on('mouseout',function(){
        $(this).children(".dropdown-menu-topbar").hide()
    })
    $("#serviceBtn").hover(function(){
        $(".slimScrollDiv").attr('style','');
        $(".sidebar").attr('style','');
        $("#serviceList").css("max-width","1000px")
        $(".sub-nav-section ul").each(function(){
            if($(this).height()>160){
                $(this).slimscroll({
                    height:"165px",
                    color: "#fff",
                    size: "5px"
                });
            }
        })
    },function(){
        $("#serviceList").css("max-width","0px");
        setScroll();
    })

});


function setScroll() {
    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
    var window_height = $(window).height();
    var sidebar_height = $(".sidebar").height();
    //$(".main-sidebar").css('min-height', window_height);
    //$(".content-wrapper").css('min-height', window_height-$('.main-footer').outerHeight());
    $(".content-wrapper").css('min-height', window_height);

    if(!($("body").hasClass("sidebar-collapse"))){
        $(".sidebar").slimScroll({destroy: true}).height("auto");
        $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "#fff",
            size: "8px"
        });
    }

}

//系统锁屏询问
$("#lockBtn").on("click", function () {
    layer.confirm('是否进行锁屏操作？锁屏后需要锁屏密码解锁!!!', {
        btn: ['确认','取消'],//按钮
        shade: [0.05, '#393D49']
    }, function(){
        window.location.href="page/lock/lock.html"
    });
})

//设置账户锁
$("#lockSetBtn").on("click", function () {
    layer.open({
        type: 2,
        title:'创建账户锁',
        shadeClose: false,
        shade: [0.1, '#ccc'],
        area: ['800px','400px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'page/lock/add.html'
    });
})

//创建工单
$("#addOrderBtn").on("click", function () {
    layer.open({
        type: 2,
        title:'创建工单',
        shadeClose: false,
        shade: [0.1, '#ccc'],
        area: ['800px','430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'page/order/add.html'
    });
})