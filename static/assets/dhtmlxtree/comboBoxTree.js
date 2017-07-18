function comboTree(treeDivId, xmlPath, callbackFun, pageDataCtlId) {
    var tree = new Tree(treeDivId, "100%", "100%", 0);
	var xmlString = '<?xml version="1.0" encoding="UTF-8"?><tree id="0"><item id="-1" text="所有" open="1"><item text="漏洞扫描" id="1" open="1"><item text="绿盟RSAS" id="1.1"/><item text="设备名称1" id="1.2"/><item text="设备名称2" id="1.3"/></item><item text="启明星辰天镜" id="2" open="1"><item text="设备名称3" id="2.1"/></item><item text="网页扫描" id="3"/><item text="基线检查" id="4"/><item text="合规检查" id="5"/><item text="代码检查" id="6"/></item></tree>';
    tree.setXmlSrc(xmlString);
    tree.setImagePath("../../static/assets/dhtmlxtree/imgs/dhxtree_skyblue3/");
    tree.buildTree(onSelectTreeNode);

    //树节点选择处理
    function onSelectTreeNode(id) {
        var txt = tree.getDhtmlTree().getItemText(id);
        if (callbackFun != null) {
            callbackFun(id, tree.getDhtmlTree(), pageDataCtlId);
        }
    }
}
function comboCheckTree(treeDivId, xmlPath, callbackFun) {
    var tree = new Tree(treeDivId, "100%", "100%", 0);
	var xmlString = '<?xml version="1.0" encoding="UTF-8"?><tree id="0"><item id="-1" text="所有" open="1"><item id="a36604130a3c4a709ecfde1ee204c84d" text="神州泰岳"><item id="59931920c19c422d8f5b307f7dc48ab4" text="泰岳安全"><item id="aca14ab671a840579e03b951f4d8fc18" text="办公网"/><item id="4aa85eae51c0415a9a94f40a1e0cb518" text="实验网"/></item><item id="59931920c19c422d8f5b307f7dc48ab1" text="网络技术"><item id="aca14ab671a842321e03b951f4d8fc18" text="办公网"/><item id="4aa85eae51c0415a9a94f40a1e0cb118" text="实验网"/></item></item></item></tree>';
    tree.setXmlSrc(xmlString);
    tree.setImagePath("../../static/assets/dhtmlxtree/imgs/dhxtree_skyblue3/");
    tree.buildCheckTree(onSelectTreeNode);
    //树节点选择处理
    function onSelectTreeNode(id) {
        if (callbackFun != null) {
			var checkText = getAllCheckText(tree.getDhtmlTree());
            callbackFun(id, tree.getDhtmlTree(), checkText);
        }
    }
}
function getAllCheckText(tree){
var idStr = tree.getAllChecked();
var text="";
var parentId = "";
var ids = idStr.split(",");
for(var j = 0; j<ids.length;j++){
	//是否存在子节点;
	var count = tree.hasChildren(ids[j]);
	if(count > 0){
	  parentId = parentId+ids[j]+",";
	}
 }
for(var i = 0; i<ids.length;i++){
	if(ids[i]!=""){
		if(ids[i]=="-1"){//选择所有的情况
			text = text+tree.getItemText(ids[i]);
			return text;
		}else{
			var nodeparent = tree.getParentId(ids[i]);
			if(parentId.indexOf(nodeparent) == -1){
				if(i==(ids.length-1)){
					text = text+tree.getItemText(ids[i]);
				}else{
					text = text+tree.getItemText(ids[i])+",";	
				}
			}
		}
	}
}
var lastText = text.substring(text.length-1,text.length);
if (lastText==",")
{
	text = text.substring(0,text.length-1)
}
return text;
}
