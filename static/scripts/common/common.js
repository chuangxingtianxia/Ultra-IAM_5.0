

/**
 * @author			wd
 * @name			UltraMessageBus
 * @description	前端框架工具类：支持插件化，消息发送，消息接收等功能
 * @CreateDate		2015-01-01
 * @version		V1.0
 */
var UltraMessageBus = function () {

    /* 自定义map */
    this.map = new Array();

    // 给MAP中放值(key,value)
    this.put = function(_key,_value) {
        this.map.push({
            key:_key,
            value:_value
        });
    };
    // 获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key){
        try {
            var result = null;
            for (i = 0; i < this.map.length; i++) {
                if (this.map[i].key == _key) {
                    result = this.map[i].value;
                }
            }
            return result;
        } catch(e) {
            return null;
        }
    };
    // 删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key){
        var bln = false;
        try {
            for (i = 0; i < this.map.length; i++) {
                if (this.map[i].key == _key) {
                    this.map.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    // 获取MAP元素大小
    this.size = function(){
        return this.map.length;
    }
    // 判断MAP是不是空，返回true：空/false：不空
    this.isEmpty = function(){
        return (this.map.length < 1);
    }
    // 清空MAP
    this.clear = function(){
        this.map = new Array();
    }
    // 设置MAP中指定KEY元素的值VALUE, 失败返回NULL
    this.set = function(_key, _value){
        try{
            this.remove(_key);
            this.put(_key,_value);
        }catch(e){
            return null;
        }
    }
    // 获取制定索引的元素
    this.getByIndex = function(_index){
        if (_index < 0 || _index >= this.map.length) {
            return null;
        }
        return this.map[_index];
    }
    // 判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key){
        var bln = false;
        try {
            for (i = 0; i < this.map.length; i++) {
                if (this.map[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    // 判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value){
        var bln = false;
        try {
            for (i = 0; i < this.map.length; i++) {
                if (this.map[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    }
    // 获取MAP中所有VALUE的数组
    this.values = function(){
        var arr = new Array();
        for (i = 0; i < this.map.length; i++) {
            arr.push(this.map[i].value);
        }
        return arr;
    }
    // 获取MAP中所有KEY的数组
    this.keys = function(){
        var arr = new Array();
        for (i = 0; i < this.map.length; i++) {
            arr.push(this.map[i].key);
        }
        return arr;
    }

}

/**
 * @FunctionName	getContextPath
 * @description		获取绝对路径的方法
 **/
UltraMessageBus.prototype.getContextPath = function() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}

UltraMessageBus.prototype.getBrowserVersion = function() {
    //alert(navigator.appName);
    var browserType = "";
    var version = "";
    var browserInfo = {browerType:browserType,version:version};
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ienew = /rv\:[\d.]+/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    var regStr_opera = /opera\/[\d.]+/gi;
    //alert(agent);
    if (agent.indexOf('msie') > 0) {
        browserType = agent.match(regStr_ie);
        version = (browserType == "") ? "" : ((browserType+"").split(" ")[1]);
    } else if (agent.indexOf('rv:') > 0) {
        browserType = agent.match(regStr_ienew);
        browserType = (browserType+"").replace("rv:","msie ");
        version = (browserType == "") ? "" : ((browserType+"").split(" ")[1]);
    } else if (agent.indexOf('firefox') > 0) {
        browserType = agent.match(regStr_ff);
        version = (browserType == "") ? "" : ((browserType+"").split("/")[1]);
    } else if (agent.indexOf('chrome') > 0) {
        browserType = agent.match(regStr_chrome);
        version = (browserType == "") ? "" : ((browserType+"").split("/")[1]);
    } else if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        browserType = agent.match(regStr_saf);
        version = (browserType == "") ? "" : ((browserType+"").split("/")[1]);
    } else if (agent.indexOf('opera') > 0 ) {
        browserType = agent.match(regStr_opera);
        version = (browserType == "") ? "" : ((browserType+"").split("/")[1]);
    }
    //alert(browserType + " - " + version);
    browserInfo.browserType = browserType;
    browserInfo.version = version;
    return browserInfo;
}

/**
 * @FunctionName	SubStringTool
 * @description		截取字符串
 * @param			str  被截取的字符串
 * @param			length  要被截取的长度
 * @return			被截取后的字符串并以...省略
 */
UltraMessageBus.prototype.SubStringTool = function (str, length) {
    if (str == null || str == 'undefined') {
        str = '';
        return str;
    }
    if (str.length > length) {
        str = str.substring(0, length) + "...";
        return str;
    } else {
        return str;
    }
}

/**
 * @FunctionName	ReplaceStringTool
 * @description		替换字符串
 * @param			str  要进行替换字符串的变量
 * @param			formerStr  要被替换掉的字符串
 * @param			afterStr   要替换成的字符串
 * @return			被替换后的字符串
 */
UltraMessageBus.prototype.ReplaceStringTool = function (str, formerStr, afterStr) {
    var reg = new RegExp(formerStr, 'g');
    str = str.replace(reg, afterStr);
    return str;
}

/**
 * @FunctionName	isArray
 * @description		判断元素对象是否为数组的方法
 * @param			value  要进行判断的元素
 **/
UltraMessageBus.prototype.isArray = function(value) {
    if (value instanceof Array || (!(value instanceof Object)
        && (Object.prototype.toString.call((value)) == '[object Array]')
        || typeof value.length == 'number'
        && typeof value.splice != 'undefined'
        && typeof value.propertyIsEnumerable != 'undefined'
        && !value.propertyIsEnumerable('splice'))) {
        return true;
    }
    return false;
}

/**
 * @FunctionName	clearForm
 * @description	清空form表单的方法
 * @param		    formId  表单Id
 **/
UltraMessageBus.prototype.clearForm = function(formId) {
    $(":input","#"+formId).val("");
    $(":input","#"+formId).removeAttr("checked");
    $(":input","#"+formId).removeAttr("selected");
}

/**
 * @FunctionName	contains
 * @description		判断数组是否包含某元素的方法
 * @param			obj  要进行判断的元素对象
 **/
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/** 消息总线对象 */
var $ultra_msgbus = new UltraMessageBus();
/** 消息总线容器 */
var $messagebus = new Array();


/**
 * @FunctionName	scrollDiv
 * @description	 控制模块滚动的时候固定到浏览器顶部方法
 * @param		 divId  要控制的Div 的id或者class
 **/
function scrollDiv(divId){
    var div = $(divId);
    var st;
    var topOffset =div.offset().top;
    var leftOffset = div.offset().left;
    var rightOffset = $(window).width()-leftOffset-div.width();
    var nextMarginT = parseInt(div.height()) + parseInt(div.css('margin-bottom')) + parseInt(div.next().closest('div').css('margin-top'));
    $(window).scroll(function () {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st > parseInt(topOffset)) {
            div.css({
                'position': 'fixed',
                'top': 0,
                'left':leftOffset,
                'right':rightOffset,
                'z-index':999,
                'box-shadow':'0px 2px 3px #f1f1f1'

            });
            div.next().closest('div').css({
                'margin-top': nextMarginT + 'px'
            });
        } else{
            div.removeAttr("style");
            div.next().closest('div').removeAttr("style");
        }
    })
}

/**
 * @FunctionName	getClientY
 * @description	 获取鼠标的y位置
 **/
function getClientY(ev){
    var oEvent=ev || event
    var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
    var objClientY=oEvent.clientY+scrolltop;
    return objClientY;
}

/**
 * @FunctionName	getClientX
 * @description	 获取鼠标的x位置
 **/
function getClientX(ev){
    var oEvent=ev || event
    var scrollleft=document.documentElement.scrollLeft || document.body.scrollLeft
    var objClientX=oEvent.clientX+scrollleft;
    return objClientX;
}

/**
 * @FunctionName	getKeyCode
 * @description	 获取鼠标的keyCode码
 **/
function getKeyCode(ev){
    oEvent=ev || event;
    iKeyCode=oEvent.keyCode
    return iKeyCode
}

/**
 * @FunctionName	browserAgent
 * @description	 检测浏览器
 **/

function browserAgent(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    return Sys;
}

/**
 * @FunctionName	disableTextSelect
 * @description 禁用文本框选择事件。文本只读，且不可选择文本
 * @param selector  jquery选择器，请选择文本框、文本域。例如":text,textarea"
 */
function disableTextSelect(selector){
    //readonly设置只读，unselectable设置IE下不可选择，style设置Firefox、Chrome下不可选择
    $(selector).prop("readonly",true).attr("unselectable","on").attr("style","-moz-user-select:none;-webkit-user-select:none;");
}

/**
 * @FunctionName	niceForm
 * @description	 美化表单
 * @param formId  form表单的ID
 **/
function niceForm(formId){
    /* 初始化 select 下拉列表 */
    $('.select').select2();
    /* 初始化 select 下拉列表 */
    $(":radio",formId).niceCheck();
    $(":checkbox",formId).niceCheck();
}
/**
 * @FunctionName	createPikaday
 * @description 用pikaday 创建日历
 * @param id  input的ID
 */
function createPikaday(id) {
    var pikaday = new Pikaday({
        field: document.getElementById(id),
        firstDay: 1,
        minDate:new Date('2000-01-01'),
        maxDate:new Date(),
        showMonthAfterYear:true,
        format:'YYYY-MM-DD'
        // yearRange: [2000,2020]
    });
    return pikaday;
}

/**
 * @FunctionName	request
 * @description 从href获得参数
 * @param paras  要获取的参数
 */
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = { };
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}
