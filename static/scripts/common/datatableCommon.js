/*
 * @description  datatable 基础配置
 */
var dataTableOption = {
	"dom": 'rt<"bottom"ipl<"clear">>',
	"searching":true,
	//"serverSide":true,
	"destroy": true,
	"info":true,
	"filter":true,
	"ordering":true,
	"processing":false,
	"paging":true,
	"lengthChange":false,
	"pageLength":12,
	"lengthMenu": [ 12, 30, 50, 100],
	//"pagingType":"full_numbers",
	"initComplete": function( settings ) {
		cloumTitle(settings.aoColumns,'.columnList')
		//为控制表格的列是否显示的Dom添加事件
		columnToggle(dtable);
	},
	"language": {
		"emptyTable": "未查询到符合条件的记录",
		"loadingRecords": "加载中...",
		"processing": "",
		"paginationType": "full_numbers",
		"search": "查询:",
		"lengthMenu": "每页 _MENU_ 条",
		"zeroRecords": "没有数据",
		"info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 ) 当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
		"infoEmpty": "第 0 页 ( 总共 0 页 ) 当前第 0 条　共计 0 条",
		"infoFiltered": "(从 _MAX_ 条记录过滤)",
		"paginate": {
			"first": "首页",
			"previous": "前一页",
			"next": "后一页",
			"last": "末页"
		}
	}
};


/**
 * @FunctionName	cloumTitle
 * @description	 把dataTable表头信息插入到指定DIV容器
 * @param		 divId  要把html字符串插入的容器
 * @param		 columJson  表格的表头数据
 **/
function cloumTitle(columJson,divId){
	//表头信息插入到指定DIV容器
	var insertHtml = '<ul>';
	for (var i = 1; i < columJson.length-1; i++){
		if(columJson[i].bVisible) {
			var stitle = columJson[i].sTitle;
			insertHtml += '<li><input type="checkbox"  class="toggle-vis" checked=checked data-column="' + i + '"  id="input' + i + '"><label for="input' + i + '">' + stitle + '</label></li>';
		}
	}
	insertHtml +='</ul>';
	$(divId).html(insertHtml);


}
/**
 * @FunctionName	columnToggle
 * @description	 为cloumsTitle函数插入的信息添加事件
 * @param		 dtable  datatable对象，用于操控列
 **/
function columnToggle(dtable){
	$('.toggle-vis').on('change', function (e) {
		e.preventDefault();
		console.log($(this).attr('data-column'));
		var column = dtable.column($(this).attr('data-column'));
		column.visible(!column.visible());
	});
}

/**
 * @FunctionName	reloadTable
 * @description	 刷新datatable表格
 * @param		 dtable  datatable对象，用于操控列
 **/
/*function reloadTable(dtable){
 dtable.ajax.reload();
 }*/
/**
 * @FunctionName	delList
 * @description	 datatable删除当前列
 * @param		 obj  this对象
 * @param		 delId  绑定删除事件的Dom ID
 **/

function delList(obj,delId) {
	$(obj).parents("tr").find('input.RowCheck').prop("checked", true);
	$(delId).click();
}

/**
 * @FunctionName	checkKey
 * @description	 单选事件
 * @param		 checkId  传过来的this对象
 * @param		 checkAllId  全选checkBox的id
 **/
function checkKey(checkId,checkAllId) {
	if ($(checkId).prop("checked") === false) {
		$(checkAllId).prop("checked", false);
	}
}
/**
 * @FunctionName	checkAllKey
 * @description	 全选选事件
 * @param		 checkAllId  传过来的this对象
 * @param		 checkName  需要控制的checkBox 的name值
 **/
function checkAllKey(checkAllId,checkName) {
	if ($(checkAllId).prop("checked") === true) {
		$("input[name= "+checkName+" ]").prop("checked", $(checkAllId).prop("checked"));
	} else {
		$("input[name= "+checkName+" ]").prop("checked", false);
	}
}

/**
 * @FunctionName	getChecked
 * @description	 获取checkBox选中的值
 * @param		 selector  jquery选择器，例如"input[name='key_id'"
 **/
function getChecked(selector) {
	var isSelect = false;
	var retVal = '';
	var i = 0;
	$(selector).each(function () {
		if ($(this).prop("checked") == true) {
			//alert($(this).attr("value"));
			retVal = retVal + 'id=' + $(this).attr("value");
			if (i < $(selector).length - 1) {
				retVal = retVal + '&';
			}
			isSelect = true;
		}
		i++;

	});
	return retVal;
}
