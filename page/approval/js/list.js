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
            { "data": "userId", "title": "申请人"},
            { "data": "userName", "title": "手机号码"},
            { "data": "status", "title": "邮箱地址"},
            { "data": "userGroup", "title": "所属组织机构"},
            { "data": "desc", "title": "状态" },
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
   //dtable.page.len(5).draw();

    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='editorBtn' onclick=\"Refuse()\">拒绝</a>" +
                "<a class='detailBtn' onclick=\"addUser('"+data+"','"+linNum+"')\">通过</a>"+
                "<a class='delbtn'  onclick=\"delList(this,'#delBtn')\">删除</a>";

       /* return "<a class='editorBtn' onclick=Modify('" + data + "')>编辑</a>" +
            "<a class='detailBtn' onclick=Detail('" + data + "')>详细</a>";*/
    }

    //使用col插件实现表格头宽度拖拽
    // $(".table").colResizable();

    //把操作栏固定到浏览器顶部
    scrollDiv(".operation-wrap");

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


//删除
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



//完善信息
function addUser(id,linNum) {
    /*var addLayer = layer.open({
        type: 2,
        title: '添加主账号',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px', '430px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'add.html?id=' + id + '&linNum=' + linNum
        // content: 'modify.html?id='+id
    })
    layer.full(addLayer)*/
    window.location='add.html'
}

//未通过
function Refuse() {
    layer.open({
        type: 1,
        title:'拒绝申请',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['400px'],
        anim:1,
        maxmin: true, //开启最大化最小化按钮
        content: document.getElementById('refuse').innerHTML
    });
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
}
