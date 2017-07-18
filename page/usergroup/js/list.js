var dtable;
var tableHeight=$(window).height()-270;
+function ($) {
    $(":radio").niceCheck();
    $(":checkbox").niceCheck();
    /* 初始化datatables */
    var listSet = {
        "scrollX": true,
        "scrollY": tableHeight,
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
            "targets": 6
        }],
        "order": [[1, 'asc']],
        "columns":[
            {
                "title": "<input type='checkbox' onclick=\"checkAllKey(this,'key_id')\"   id='checkAllId'/>",
                data: "uuid",
                "width": "30px",
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
    dtable.page.len(12).draw();

    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='editorBtn' onclick=\"Modify('"+data+"','"+linNum+"')\">修改</a>"


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



//编辑
function Modify(id,linNum) {
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
$("#filter_toggle_btn").on("click", function(){

    if($(".findWrap").is(":visible")){
        $(this).find("i").attr("class",'fa fa-chevron-down')
        $(".findWrap").hide();
    }else{
        $(".findWrap").show()
        $(this).find("i").attr("class",'fa fa-chevron-up')
    }
});

//搜索
$("#searchBtn").click(function(){
    var searchKey = $("#searchKeys").val();
    dtable.search(searchKey).draw();
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
