+function ($) {

    niceForm()
    /* 初始化表单 */
    function niceForm(){
        /* 初始化 select 下拉列表 */
        $('.select').select2();

        /* 初始化表单元素 */
        $('input[name="resDevTypes"]').niceCheck();
        $('input[name="isNeedPath"]').niceCheck();
        $('input[name="isDefalt"]').niceCheck();

        /* 初始化日历 */
     /*   var picker1 = new Pikaday({
            field: document.getElementById('valid_data'),
            firstDay: 1,
            format: 'YYYY-MM-DD'
        });*/

        /*单日历*/
        $('#valid_data').daterangepicker({
           // timePicker: true,
            singleDatePicker: true,//是否是单个时间选择器
            startDate: moment(),//起始时间
            showDropdowns: true,
            locale: {//本地设置
                format: 'YYYY-MM-DD'
            }
        })
    }

    //初始化组织机构树
    var tree = new dhtmlXTreeObject("group_tree", "100%", "100%", 0);
    tree.setImagePath("../../static/assets/dhtmlxtree/imgs/dhxtree_skyblue3/");
    tree.enableCheckBoxes(1);
    //tree.enableThreeStateCheckboxes(true);
    tree.loadXML("../../data/tree.xml");


    tree.attachEvent("onCheck", function(id,state){
        var name = tree.getItemText(id);
        if(state) {
            addAssetGroup(id, name);
        } else {
            removeAssetGroupFromList(id);
        }

    });

    //添加资产组
    function addAssetGroup(id, name) {
        var htmlStr = "<li><div class=\"asset-group-item-wrap\">" +
            "<span>" + name + "</span>" +
            "<a id=\"" + id + "\" class=\"remove-asset-group-action\" href=\"javascript: void(0);\"><i class=\"fa fa-times\"></i></a>" +
            "</div></li>";

        $("#asset_group_selected").append(htmlStr);
    }

    //移除资产组
    function removeAssetGroupFromList(id) {
        var $el = $("#asset_group_selected #" + id).parent().parent();
        $el.remove();
    }

    function removeAssetGroupFromTree(id) {
        tree.setCheck(id, false);
    }

    $("#asset_group_selected").on("click", ".remove-asset-group-action", function(){
        var _id = $(this).attr("id");
        removeAssetGroupFromList(_id);
        removeAssetGroupFromTree(_id);
    })

}(jQuery);
