var dtable;
var tableHeight=$(window).height()-$('.grid-wrap').offset().top - $('.grid-header').outerHeight()-50-30-15;

+function ($) {

    /* 初始化datatables */
    var listSet = {
        "scrollX": true,
        "scrollY": tableHeight,
        "lengthChange":false,
        "ajax": {
            "url": 'data/data.action',
            /*"type": "POST",
             "data": function ( d ) {
             return $.extend( {}, d, {
             "plan.type": "4", //离线=4

             } );
             }*/
        },
        "columnDefs": [{
            "orderable": false,
            "targets": 0
        },{
            "orderable": false,
            "targets": 11
        }],
        "order": [[1, 'asc']],
        "columns":[
            {
                "title": "<input type='checkbox' onclick=\"checkAllKey(this,'key_id')\"   id='checkAllId'/>",
                data: "uuid",
                "width": "20px",
                "render": function (data, type, row, meta) {
                    return "<input type='checkbox' name='key_id' onclick=\"checkKey(this,'#checkAllId')\"  id='key_id_" + data + "' class='RowCheck' value='" + data + "'  />";
                }
            },
            { "data": "userId", "title": "主账号ID"},
            { "data": "userName", "title": "用户姓名"},
            { "data": "mobile", "title": "用户手机号"},
            { "data": "userType", "title": "用户类型"},
            { "data": "status", "title": "用户状态"},
            { "data": "endTime", "title": "有效期"},
            { "data": "userGroup", "title": "所属用户组","width": "150","render":function(data, type, row, meta){
                if (data == null) {
                    return "";
                }
                var ret = "<div style='width: 100px; text-overflow: ellipsis; overflow: hidden; word-wrap: break-word;'>" + data + "</div>";
                return ret;

            }
            },
            { "data": "createUser", "title": "创建人"},
            { "data": "mobile", "title": "工单号"},
            { "data": "isPortalUser", "title": "信息完整度","width": "100","render":function(data, type, row, meta){
                if (data == null) {
                    return "";
                }
                var ret = '<div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 60%"> 60%  </div> </div>';
                return ret;

            }
            },
            { "data": "uuid", "title": "操作", "width": "50px", "render": optionRender }
        ]/*,
         createdRow: function ( row, data, index ) {
         if ( index%2 == 0 ) {
         $(row).addClass( 'tabBg' );
         }
         }*/
    };

    var listOption = $.extend(true, {}, dataTableOption, listSet);
    dtable = $("#datagrid").DataTable(listOption);
    // dtable.ajax.url( '../../data/table_data.action' ).load();
    dtable.page.len(10).draw();
    //console.log(dtable.rows);
    alert($(".dataTables_scrollHeadInner").height())
    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='editorBtn' onclick=\"Modify('"+data+"','"+linNum+"',event)\">修改</a>"


        /* return "<a class='editorBtn' onclick=Modify('" + data + "')>编辑</a>" +
         "<a class='detailBtn' onclick=Detail('" + data + "')>详细</a>";*/
    }

    //使用col插件实现表格头宽度拖拽
    // $(".table").colResizable();

    //把操作栏固定到浏览器顶部
    // scrollDiv(".operation-wrap");

}(jQuery);
//关闭列显示区域
$("#column-close-btn").click(function(){
    $("#column-chceck").dropdown('hide');
})


//刷新表格数据
function reloadTable(){
    dtable.ajax.reload(function(){
        $("#checkAllId").prop("checked", false)
    });
}

//添加客户端
$("#addBtn").on("click", function () {
    var addLayer=layer.open({
        type: 2,
        title:'添加主账号',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'add.html'
    });
    layer.full(addLayer);

})
//删除客户端
$("#delBtn").on("click", function() {
    var datas = getChecked("input[name='key_id']");
    if (datas == "") {
        showCross("请先选择要删除的对象")
    }else{
        //询问框
        layer.confirm('确认要删除选择的数据吗？', {
            btn: ['确认','取消'],//按钮
            shade: [0.05, '#393D49']
        }, function(){
            delRow(datas)
        });
    }
});

//点击行查看详情
$('#datagrid tbody').on('click', 'tr', function () {
/*    var $tr = $(this).parents('tr');
    $tr.toggleClass('selected');
    var $tmp = $('[name=checkList]:checkbox');*/
    //$(this).toggleClass('selected');

    var addLayer=layer.open({
        type: 2,
        title:'查看主账号信息',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'detial.html'
    });
    layer.full(addLayer);

});


//编辑
function Modify(id,linNum,evt) {

    var addLayer=layer.open({
        type: 2,
        title:'添加主账号',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'add.html'
    });

    layer.full(addLayer);
    var e=(evt)?evt:window.event; //判断浏览器的类型，在基于ie内核的浏览器中的使用cancelBubble
    if (window.event) {
        e.cancelBubble=true;

    } else {
        e.stopPropagation();
    }
}


//批量删除
function delRow(datas) {
    Manager.del(datas,function(ret){
        if(ret.success==true){
            layer.msg('删除资源成功', {icon: 1} ,function(){
                reloadTable()
            });

        } else {
            layer.msg("删除资源失败，失败原因是："+ret.resultMsg,{ icon:2 });
        }

    });
};


/* 过滤条件面板 */
$("#filterBtn").on("click", function(){
    $(".filter-mask").fadeIn()

});
$(".filter-mask").on("click",function(){
    $(".filter-mask").fadeOut()
})
$(".filter-wrapper").on("click",function(event){
    event.stopPropagation()
})


//input 情况
$("#searchshowKeys").on("input propertychange blur", function(){
    //添加筛选按钮
    if($(".filter-item-wrap .cancel-filter").length==0){
        $("#last-item").after('<li class="cancel-filter">取消筛选</li>')
    }
    var inputValue=$(this).val();
    var inputKey=$(this).attr('name');
    if(inputValue==""){
        $(".filter-item-wrap .filter-item[data-prop="+inputKey+"]").remove()
        return
    }
    if($(".filter-item-wrap .filter-item[data-prop="+inputKey+"]").length==0){
        $("#last-item").before('<li class="filter-item" title="'+ inputValue+'"  onclick="removeItem(this)" data-prop="'+ inputKey +'">'+inputValue+'</li>')
    }else{
        $(".filter-item-wrap .filter-item[data-prop="+inputKey+"]").html(inputValue)
        $(".filter-item-wrap .filter-item[data-prop="+inputKey+"]").attr("title",inputValue)
    }

});

$("#searchshowKeys").on("blur",function(){

    $(".filter-item-wrap .filter-item").tooltip()
})
//单选钮情况
$('.checkbox input:radio').on('ifChecked', function(event){
    //添加筛选按钮
    if($(".filter-item-wrap .cancel-filter").length==0){
        $("#last-item").after('<li class="cancel-filter">取消筛选</li>')
    }
    var chKey=$(this).attr("name");
    var chTitle = $(this).parents("div.body").siblings("h3.title").text();
    var chValue =$(this).parents("div.checkbox").find('span').html();
    var str=chTitle+'：'+chValue
    if($(".filter-item-wrap .filter-item[data-prop="+chKey+"]").length==0){
        $("#last-item").before('<li class="filter-item" onclick="removeItem(this)" data-prop="'+ chKey +'">'+str+'</li>')
    }else{
        $(".filter-item-wrap .filter-item[data-prop="+chKey+"]").html(str)
    }
});
//多选框情况
$('.checkbox input:checkbox').on('ifChecked ifUnchecked', function(event){
    //添加筛选按钮
    if($(".filter-item-wrap .cancel-filter").length==0){
        $("#last-item").after('<li class="cancel-filter">取消筛选</li>')
    }
    var chKey=$(this).attr("name")
    var chTitle = $(this).parents("div.body").siblings("h3.title").text();
    var htmlStr = chTitle+'：'
    var level=0;
    if( $('input[name='+chKey+']:checked').length==0){
        $(".filter-item-wrap .filter-item[data-prop="+chKey+"]").remove();
        //判断是否移除筛选按钮
        if($(".filter-item-wrap .filter-item").length==0){
            $(".filter-item-wrap .cancel-filter").remove();
        }
    }else{
        $('input[name='+chKey+']:checked').each(function(){
            var chLabel=$(this).attr("data-label");
            if(level!=0){
                htmlStr+='、'
            }
            htmlStr+=chLabel
            level++;
        });

        if($(".filter-item-wrap .filter-item[data-prop="+chKey+"]").length==0){
            $("#last-item").before('<li class="filter-item" onclick="removeItem(this)" data-prop="'+ chKey +'">'+htmlStr.replace('、', '')+'</li>')
        }else{
            $(".filter-item-wrap .filter-item[data-prop="+chKey+"]").html(htmlStr)
        }
    }


    /*var chKey=$(this).attr("name");
     var chTitle = $(this).parents("div.body").siblings("h3.title").text();
     var chValue =$(this).parents("div.checkbox").find('span').html();
     var str=chTitle+':'+chValue

     if($(".filter-item-wrap .filter-item[data-prop="+chKey+"]").length==0){
     $("#last-item").before('<li class="filter-item" onclick="removeItem(this)" data-prop="'+ chKey +'">'+str+'</li>')
     }else{
     var oldStr= $(".filter-item-wrap .filter-item[data-prop="+chKey+"]").html()
     oldStr+='、';
     oldStr+=chValue;
     $(".filter-item-wrap .filter-item[data-prop="+chKey+"]").html(oldStr)
     }*/
});

//取消筛选
$(".filter-item-wrap").on("click",'.cancel-filter',function(){

    $(".filter-item-wrap li").each(function(){
        if($(this).hasClass('filter-item')){
            removeItem(this)
        }
    })
    $(this).remove();
})


//移除节点 并重置
function removeItem(selector){
    var namea = $(selector).attr('data-prop');
    $("input[name="+ namea +"]").val('')
    $("input[name="+ namea +"]").iCheck('uncheck');
    $("select[name="+ namea +"]").children("option:first").prop("selected", 'selected');
    $("select[name="+ namea +"]").trigger('change.select2')
    $(selector).remove();

    //判断是否移除筛选按钮
    if($(".filter-item-wrap .filter-item").length==0){
        $(".filter-item-wrap .cancel-filter").remove();
    }
}

//美化input
$(".checkbox input").iCheck({
    checkboxClass: 'icheckbox_minimal',
    radioClass: 'icheckbox_minimal',
    increaseArea: '20%'
});

//搜索
$("#searchBtn").click(function(){
    var searchKey = $("#searchKeys").val();
    dtable.search(searchKey).draw();
})



//美化select
$("#userGroup").select2({
});
$('#userGroup').on('select2:select', function (evt) {
    //添加筛选按钮
    if($(".filter-item-wrap .cancel-filter").length==0){
        $("#last-item").after('<li class="cancel-filter">取消筛选</li>')
    }
    var selKey=$(this).attr("name")
    var selTitle = $(this).parents("div.body").siblings("h3.title").text();
    var selText = $(this).children("option:selected").text()
    var selstr=selTitle+'：'+selText
    if($(".filter-item-wrap .filter-item[data-prop="+selKey+"]").length==0){
        $("#last-item").before('<li class="filter-item" onclick="removeItem(this)" data-prop="'+ selKey +'">'+selstr+'</li>')
    }else{
        $(".filter-item-wrap .filter-item[data-prop="+selKey+"]").html(selstr)
    }
});

$(".filter-mask").hide();


//初始化组织机构树
var tree = new dhtmlXTreeObject("selectTree", "100%", "100%", 0);
tree.setImagePath("../../static/assets/dhtmlxtree/imgs/dhxtree_skyblue3/");
tree.setOnClickHandler(clickHandler);// 设置节点点击事件
tree.setOnCheckHandler(checkHandler);// 设置节点选中事件
tree.enableRadioButtons(true);// 设置显示单选按钮
tree.loadXML("../../data/tree.xml");



var selectedItemID;
var selectedItemName;
function checkHandler(id, model) {
    //var text = tree.getItemText(id);
    // $("#checkUUName").val(text);
    var select = tree.getAllChecked();
    var selectArr = select.split(",");
    for(var i = 0 ; i < selectArr.length;i++){
        if(id != selectArr[i]){
            tree.setCheck(selectArr[i],0);
        }
    }
    selectedItemName= tree.getItemText(id);
    tree.selectItem(id,true);
    $(".tree-title span").text(selectedItemName)
    //添加筛选按钮
    if($(".filter-item-wrap .cancel-filter").length==0){
        $("#last-item").after('<li class="cancel-filter">取消筛选</li>')
    }
    var userStr ='组织机构：'
    userStr+=selectedItemName
    if($(".filter-item-wrap .filter-item[data-prop='userGroup']").length==0){
        $("#last-item").before('<li class="filter-item" onclick=\'removeTree("'+id+'")\' data-prop="userGroup">'+userStr+'</li>')
    }else{
        $(".filter-item-wrap .filter-item[data-prop='userGroup']").html(userStr)
    }
    $(".tree-body").hide()
}

function removeTree(id) {
    tree.selectItem(id,false);
    tree.setCheck(id, false);
    $(".tree-title span").text('')
    $('li.filter-item[data-prop="userGroup"]').remove();
    //判断是否移除筛选按钮
    if($(".filter-item-wrap .filter-item").length==0){
        $(".filter-item-wrap .cancel-filter").remove();
    }
}
function clickHandler(id, model) {
    var text = tree.getItemText(id);
    tree.setCheck(id,true);
    tree.enableSingleRadioMode(true, id);
}



$(".tree-title").on("click",function(){
    //if($(".tree-body"))
    $(this).toggleClass('open')
    $(".tree-body").toggle()
})


/*
 var searchObj=new Object();

 $(".findInput input").on("input propertychange ", function(ev){

 var inputValue=$(this).val();
 var inputKey=$(this).attr('name');
 searchObj[inputKey]=inputValue;
 sjj(ev)
 });

 $(".findInput select.select").on("change", function(ev){
 var selectValue=$(this).val();
 var selectKey=$(this).attr('id');
 searchObj[selectKey]=selectValue;
 sjj(ev)
 });



 //填充搜索文本框value;
 function sjj(ev){

 var x;
 var y;
 var showTxt='';
 var sendTxt='';
 //搜索框需要发送的字符串
 for (x in searchObj)
 {
 if(searchObj[x]!=''){

 sendTxt=sendTxt + x + ":" +searchObj[x]+";";
 }else{
 sendTxt=sendTxt+searchObj[x];
 }

 }

 //搜索框展示
 for (y in searchObj)
 {
 if(searchObj[y]!=''){
 if(ev.type=='change'){
 showTxt=showTxt + $('#'+y+'').attr('data-key') + ":" +"("+searchObj[y]+")"+";";
 }else{
 showTxt=showTxt + $('.findInput input[name='+y+']').attr('placeholder') + ":" +"("+searchObj[y]+")"+";";
 }

 }else{
 showTxt=showTxt+searchObj[x];
 }

 }

 $("#searchKeys").val(sendTxt)
 $("#searchshowKeys").val(showTxt)
 console.log(searchObj)
 }*/
