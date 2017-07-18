var dtable;
+function ($) {
    /* 初始化datatables */
    var listSet = {
        "ajax": {
            "url": '../../data/order.action'
        },
        "autoWidth": false,
        "columnDefs": [{
            "orderable": false,
            "targets": 5
        }],
        "order": [],
        "columns":[
            { "data": "name", "title": "工单名称" },
            { "data": "type", "title": "工单类型" },
            { "data": "createAccount", "title": "工单发起人" },
            { "data": "start_date", "title": "工单发起时间" },
            { "data": "end_date", "title": "工单结束时间" },
            { "data": "id", "title": "操作", "width": "60px", "render": optionRender }
        ]
    };

    var listOption = $.extend(true, {}, dataTableOption, listSet);
    dtable = $("#datagrid").DataTable(listOption);

    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='editorBtn' onclick=\"Modify('"+data+"','"+linNum+"')\">查看工单</a>"
    }

    //把操作栏固定到浏览器顶部
    scrollDiv(".operation-wrap");

}(jQuery);

/*
$('#datagrid tbody').on( 'click', 'tr', function () {
    var obj= dtable.row(this).data();
    //console.log(obj);
});
*/


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

//添加
$("#addBtn").on("click", function () {
    layer.open({
        type: 2,
        title:'创建工单',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','410px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'add.html'
    });
})


//编辑
function Modify(id,linNum) {
    layer.open({
        type: 2,
        title:'查看工单',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','410px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'detail.html?id='+id+'&linNum='+linNum
    });
}

