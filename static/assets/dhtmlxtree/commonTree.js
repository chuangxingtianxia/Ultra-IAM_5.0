function Tree(htmlObject,width, height, rootId,xmlSrc,imgPath){
  this.treeHtmlObject = htmlObject;
  this.treeWidth = width || "100%";
  this.treeHeight = height || "100%";
  this.treeRootId = rootId || 0;
  this.treeXmlSrc = xmlSrc;
  this.treeImagePath = imgPath || "/web/js/3rd/tree/imgs/csh_dhx_skyblue/";
  this.dhtmltree = null;
  this.xmlPath = null;
};
Tree.prototype.treeItemOnClick = function(id, tree){
  if(id == null || id.length <=0 || id.charAt(0) == '#'){
    return false;
  }
  //多个参数的情况，多个参数间用#符号分割（直接用&符号时,会有tree解析错误）,如果要使用#，请使用#@#
  if(id.indexOf("#@#")==-1)
  {
	 id = id.replace(new RegExp("#", 'g'),"&"); 
  }else
  {
  	 id=id.replace(new RegExp("#@#", 'g'),"#");
  }
  
  if(id.charAt(0)=='@'){
    window.open(id.substring(1));
  }else{
    //top.location.href = id;
    parent.frames['main'].location=id;   
  }
};
Tree.prototype.isValidId = function(id){
  if(id == null || id.length <=0 || id.charAt(0) == '#'){
    return false;
  }
  return true;
};
Tree.prototype.setImagePath = function(imagePath){
  this.treeImagePath = imagePath;
};
Tree.prototype.setXmlSrc = function(xmlSrc){
  this.treeXmlSrc = xmlSrc;
};
Tree.prototype.setXmlPath = function(xmlPath){
  this.xmlPath = xmlPath;
};
Tree.prototype.getDhtmlTree = function(){
  return this.dhtmltree;
};
Tree.prototype.buildTree = function(fun){
  var treeObj = new dhtmlXTreeObject(this.treeHtmlObject,this.treeWidth,this.treeHeight,this.treeRootId);
  treeObj.setImagePath(this.treeImagePath);
  treeObj.loadXMLString(this.treeXmlSrc);
  this.dhtmltree = treeObj;
  if(fun == null){
    fun = this.treeItemOnClick; 
  }
  this.dhtmltree.attachEvent("onClick", function(id){
     fun(id, treeObj);
  });
};

Tree.prototype.buildCheckTree = function(fun){
  var treeObj = new dhtmlXTreeObject(this.treeHtmlObject,this.treeWidth,this.treeHeight,this.treeRootId);
  treeObj.setImagePath(this.treeImagePath);
  treeObj.enableCheckBoxes(1);//设置复选框
  treeObj.enableThreeStateCheckboxes(true);//允许半选状态 
  treeObj.loadXMLString(this.treeXmlSrc);
  this.dhtmltree = treeObj;
  if(fun == null){
    fun = this.treeItemOnClick; 
  }
  this.dhtmltree.attachEvent("onCheck", function(id){
     fun(id, treeObj);
  });
};

Tree.prototype.buildTreeFromXml = function(fun){
  var treeObj = new dhtmlXTreeObject(this.treeHtmlObject,this.treeWidth,this.treeHeight,this.treeRootId);
  treeObj.setImagePath(this.treeImagePath);
  treeObj.loadXML(this.xmlPath);
  treeObj.setXMLAutoLoading(this.xmlPath);
  this.dhtmltree = treeObj;
  if(fun == null){
    fun = this.treeItemOnClick; 
  }
  this.dhtmltree.attachEvent("onClick", function(id){
     fun(id, treeObj);
  }); 
};
Tree.prototype.destroyTree = function(){
  var obj = document.getElementById(this.treeHtmlObject);
  if(obj == null){
    return;
  }
  if(obj.hasChildNodes()){
    var child = obj.childNodes.item(0);
    obj.removeChild(child);
  }
};