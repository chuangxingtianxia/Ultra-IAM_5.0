jQuery(function(){
 
 comboTree('business_tree','http://127.0.0.1:8080/amrportal/tree/asynOrgTree.action?isDisplayRoot=false', treeCallback);

 comboCheckTree('business_tree_check','http://127.0.0.1:8080/amrportal/tree/asynOrgTree.action?isDisplayRoot=false', treeCallCheckback);
 
});

function treeCallback(id, tree){
$("#checkUUName").val(tree.getItemText(id));
}
function treeCallCheckback(id, tree,checkText){
 $("#checkUUNameCheck").val(checkText);
 var checkids =  tree.getAllChecked().split(",");
 var checkgroupids = "";
 var checkall = "-1";
 for(var i=0;i<checkids.length;i++){
	if(checkids[i] == "-1"){
		checkUUID=checkall;
		return;
	}else{
		checkgroupids+= checkids[i]+",";
	}
 }
 checkgroupids = checkgroupids.substring(0,checkgroupids.length-1);
}