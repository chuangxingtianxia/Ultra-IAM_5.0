var dtable;
+function ($) {
    /* 初始化datatables */
    var listSet = {
        "ajax": {
            "url": '../../data/news_data.action'
        },
        "autoWidth": false,
        "columnDefs": [{
            "orderable": false,
            "targets": 0
        },{
            "orderable": false,
            "targets": 3
        }],
        "order": [],
        "columns":[
            {
                "title": "<input type='checkbox' onclick=\"checkAllKey(this,'key_id')\"   id='checkAllId'/>",
                data: "id",
                "width": "30px",
                "render": function (data, type, row, meta) {
                    return "<input type='checkbox' name='key_id' onclick=\"checkKey(this,'#checkAllId')\"  id='key_id_" + data + "' class='RowCheck' value='" + data + "'  />";
                }
            },
            {
                "title": "公告标题", data: "title", "render": function (data, type, row, meta) {
                var linNum = meta.row
                var id = row.id;
                if (data == null) {
                    return "";
                }
                var ret = "<a  onclick=\"Detail(this,'"+id+"','"+linNum+"')\">" + data + "</a>";
                return ret;
                }
            },
            { "data": "time", "title": "到期时间" },
            { "data": "id", "title": "操作", "width": "100px", "render": optionRender }
        ]
    };

    var listOption = $.extend(true, {}, dataTableOption, listSet);
    dtable = $("#datagrid").DataTable(listOption);

    function optionRender(data, type, row, meta) {
        //因为是静态页 需要去json里的数据，所以应用的时候把这些删掉，用下边注释的，只传一个id就行了
        var linNum = meta.row
        return "<a class='editorBtn' onclick=\"Modify('"+data+"','"+linNum+"')\">编辑</a>" +
            "<a class='detailBtn' onclick=\"Detail(this,'"+data+"','"+linNum+"')\">详细</a>"+
            "<a class='delbtn'  onclick=\"delList(this,'#delBtn')\">删除</a>";
    }

    //把操作栏固定到浏览器顶部
    scrollDiv(".operation-wrap");

}(jQuery);

$('#datagrid tbody').on( 'click', 'tr', function () {
    var obj= dtable.row(this).data();
    //console.log(obj);
});


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
        title:'添加公告',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','410px'],
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



//编辑
function Modify(id,linNum) {
    layer.open({
        type: 2,
        title:'编辑公告',
        shadeClose: true,
        shade: [0.1, '#ccc'],
        area: ['800px','410px'],
        maxmin: true, //开启最大化最小化按钮
        content: 'modify.html?id='+id+'&linNum='+linNum
    });
}

//查看
function Detail($this,id,linNum) {
    if(!$(".notice-content").is(":visible")  ){
        var tableHeight = $(".notice-list").height()
        $(".notice-main").css("min-height",tableHeight-50);
        $(".notice-list").css({"width":"55%"});
        $(".notice-content").show().css({"margin-left":"57%"});
    }

    //var obj= dtable.row(this).data();
    $($this).parents("tr").siblings("tr").removeClass('selected');
    $($this).parents("tr").addClass('selected');

    Manager.findById(id, function (ret) {
        var obj = ret.data[linNum];
        $('#notice-title').html(obj.title);
        $('#notice-time').html(obj.time);
        $('#nitice-detail').html(obj.desc);
    })
}

$("#notice-close-btn").on("click",function(){
    $(".notice-list").css({"width":"100%"});
    $(".notice-content").hide().css({"margin-left":"0%"});
})
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
