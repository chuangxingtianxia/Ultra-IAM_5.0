function tree(id,soType,soType_val){
	var xmlString = '<?xml version="1.0" encoding="UTF-8"?><tree id="0"><item text="root" id="a" open="1"><item text="漏洞扫描" id="1" open="1"><item text="绿盟RSAS" id="1.1"/><item text="设备名称1" id="1.2"/><item text="设备名称2" id="1.3"/></item><item text="启明星辰天镜" id="2" open="1"><item text="设备名称3" id="2.1"/></item><item text="网页扫描" id="3"/><item text="基线检查" id="4"/><item text="合规检查" id="5"/><item text="代码检查" id="6"/></item></tree>';
	soTypeTree = new dhtmlXTreeObject(id,"100%","100%",0);
	soTypeTree.deleteChildItems(0);
	soTypeTree.setImagePath("static/assets/dhtmlxtree/skins/skyblue/imgs/dhxtree_skyblue/"); 
	soTypeTree.enableCheckBoxes(true);
	soTypeTree.enableThreeStateCheckboxes(true);
	soTypeTree.enableDragAndDrop(true);
	soTypeTree.loadXMLString(xmlString);
	soTypeTree.attachEvent("onCheck", function(id, state){
		if(soTypeTree.getAllChecked() == "" ){
			$(soType).attr("value"," ");
		}
		
		var checkIdList =  soTypeTree.getAllChecked().split(",");   
		var checkTextList = new Array();
		for(var i=0;i<checkIdList.length;i++)
		{
			if(checkIdList[i] !=0){
		 		checkTextList[i] = soTypeTree.getItemText(checkIdList[i]);
		 	}
		}   
		//如果“操作系统”根结点是勾选状态，非三态树中的半勾选
		var checkedValues = soTypeTree.getAllChecked();
		if (soTypeTree.isItemChecked("3") == "1"){
			//console.log("checked根结点");
			checkedValues = checkedValues.substr(2);
			$(soType_val).val(checkedValues);
			$(soType).attr("value","所有");
		}else{
			$(soType_val).val(checkedValues);
			$(soType).attr("value",checkTextList);		
		}
   });
	
}
function tree2(id,soType,soType_val){
	var xmlString = '<?xml version="1.0" encoding="UTF-8"?><tree id="0"><item text="root" id="a" open="1"><item text="漏洞扫描" id="1" open="1"><item text="绿盟RSAS" id="1.1"/><item text="设备名称1" id="1.2"/><item text="设备名称2" id="1.3"/></item><item text="启明星辰天镜" id="2" open="1"><item text="设备名称3" id="2.1"/></item><item text="网页扫描" id="3"/><item text="基线检查" id="4"/><item text="合规检查" id="5"/><item text="代码检查" id="6"/></item></tree>';
	soTypeTree2 = new dhtmlXTreeObject(id,"100%","100%",0);
	soTypeTree2.deleteChildItems(0);
	soTypeTree2.setImagePath("static/assets/dhtmlxtree/skins/skyblue/imgs/dhxtree_skyblue/"); 
	soTypeTree2.loadXMLString(xmlString);
	soTypeTree2.attachEvent("onClick",function(id){
		var txt = soTypeTree2.getItemText(id);
		$(soType_val).val(txt);
		$(soType).attr("value",txt);	
	})
}

$(function(){
	$('.arrow-dropdown').click(function(){
			if($(this).parent().find($('div')).css('display') == 'none'){
				$(this).parent().find($('div')).css('display','block');
			}else{
				$(this).parent().find($('div')).css('display','none');
			}
	})	
	
})
