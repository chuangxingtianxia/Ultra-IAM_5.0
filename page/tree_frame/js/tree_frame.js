
$(document).ready( function () {

    /* 初始化树 */
    var tree = new dhtmlXTreeObject("tree_panel", "100%", "100%", 0);
    tree.setImagePath("../../static/assets/dhtmlxtree/imgs/dhxtree_skyblue3/");
    tree.loadXML("../../data/tree2.xml");
})

$(".tree-toggle").on("click",function(){
    if($(this).hasClass("istoggle")){
        $(this).animate({right:'0px'});
        $(this).children("i").removeClass("fa-caret-right");
        $(this).children("i").addClass("fa-caret-left");
        $(".tree_wrap").animate({left:'0px'});
        $(".content-wrap").animate({left:'180px'});
        $(this).removeClass("istoggle")
    }else{
        $(this).animate({right:'-10px'});
        $(this).children("i").removeClass("fa-caret-left");
        $(this).children("i").addClass("fa-caret-right");
        $(".tree_wrap").animate({left:'-180px'});
        $(".content-wrap").animate({left:'0px'});
        $(this).addClass("istoggle")

    }
})