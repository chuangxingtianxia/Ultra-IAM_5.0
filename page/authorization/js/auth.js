var dtable;
+function ($) {
    /* 初始化datatables */
    var listSet = {
        "ajax": {
            "url": '../../data/table_data.action',
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
            { "data": "status", "title": "用户状态"},
            { "data": "userGroup", "title": "所属用户组"},
            { "data": "desc", "title": "描述" },
            { "data": "uuid", "title": "操作", "width": "100", "render": optionRender }
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
    dtable.page.len(7).draw();

    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='delbtn'  onclick=\"delList(this,'#delBtn')\">删除</a>";


    }


}(jQuery);
//关闭列显示区域
$("#column-close-btn").click(function(){
    $("#column-chceck").dropdown('hide');
})
//搜索
$("#searchBtn").click(function(){
    var searchKey = $("#searchKeys").val();
    dtable.search(searchKey).draw();
})

//刷新表格数据
function reloadTable(){
    dtable.ajax.reload(function(){
        $("#checkAllId").prop("checked", false)
    });
}

//添加客户端
$("#addBtn").on("click", function () {
    layer.open({
        type: 2,
        title:'添加客户端',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'add.html'
    });
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
