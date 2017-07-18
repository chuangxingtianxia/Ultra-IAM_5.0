

/**
 * @author			wd
 * @name			UltraMessageBus
 * @description	ǰ�˿�ܹ����ࣺ֧�ֲ��������Ϣ���ͣ���Ϣ���յȹ���
 * @CreateDate		2015-01-01
 * @version		V1.0
 */
var UltraMessageBus = function () {

    /* �Զ���map */
    this.map = new Array();

    // ��MAP�з�ֵ(key,value)
    this.put = function(_key,_value) {
        this.map.push({
            key:_key,
            value:_value
        });
    };
    // ��ȡָ��KEY��Ԫ��ֵVALUE��ʧ�ܷ���NULL
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
    // ɾ��ָ��KEY��Ԫ�أ��ɹ�����True��ʧ�ܷ���False
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
    // ��ȡMAPԪ�ش�С
    this.size = function(){
        return this.map.length;
    }
    // �ж�MAP�ǲ��ǿգ�����true����/false������
    this.isEmpty = function(){
        return (this.map.length < 1);
    }
    // ���MAP
    this.clear = function(){
        this.map = new Array();
    }
    // ����MAP��ָ��KEYԪ�ص�ֵVALUE, ʧ�ܷ���NULL
    this.set = function(_key, _value){
        try{
            this.remove(_key);
            this.put(_key,_value);
        }catch(e){
            return null;
        }
    }
    // ��ȡ�ƶ�������Ԫ��
    this.getByIndex = function(_index){
        if (_index < 0 || _index >= this.map.length) {
            return null;
        }
        return this.map[_index];
    }
    // �ж�MAP���Ƿ���ָ��KEY��Ԫ��
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
    // �ж�MAP���Ƿ���ָ��VALUE��Ԫ��
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
    // ��ȡMAP������VALUE������
    this.values = function(){
        var arr = new Array();
        for (i = 0; i < this.map.length; i++) {
            arr.push(this.map[i].value);
        }
        return arr;
    }
    // ��ȡMAP������KEY������
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
 * @description		��ȡ����·���ķ���
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
 * @description		��ȡ�ַ���
 * @param			str  ����ȡ���ַ���
 * @param			length  Ҫ����ȡ�ĳ���
 * @return			����ȡ����ַ�������...ʡ��
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
 * @description		�滻�ַ���
 * @param			str  Ҫ�����滻�ַ����ı���
 * @param			formerStr  Ҫ���滻�����ַ���
 * @param			afterStr   Ҫ�滻�ɵ��ַ���
 * @return			���滻����ַ���
 */
UltraMessageBus.prototype.ReplaceStringTool = function (str, formerStr, afterStr) {
    var reg = new RegExp(formerStr, 'g');
    str = str.replace(reg, afterStr);
    return str;
}

/**
 * @FunctionName	isArray
 * @description		�ж�Ԫ�ض����Ƿ�Ϊ����ķ���
 * @param			value  Ҫ�����жϵ�Ԫ��
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
 * @description	���form���ķ���
 * @param		    formId  ��Id
 **/
UltraMessageBus.prototype.clearForm = function(formId) {
    $(":input","#"+formId).val("");
    $(":input","#"+formId).removeAttr("checked");
    $(":input","#"+formId).removeAttr("selected");
}

/**
 * @FunctionName	contains
 * @description		�ж������Ƿ����ĳԪ�صķ���
 * @param			obj  Ҫ�����жϵ�Ԫ�ض���
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

/** ��Ϣ���߶��� */
var $ultra_msgbus = new UltraMessageBus();
/** ��Ϣ�������� */
var $messagebus = new Array();


/**
 * @FunctionName	scrollDiv
 * @description	 ����ģ�������ʱ��̶����������������
 * @param		 divId  Ҫ���Ƶ�Div ��id����class
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
 * @description	 ��ȡ����yλ��
 **/
function getClientY(ev){
    var oEvent=ev || event
    var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
    var objClientY=oEvent.clientY+scrolltop;
    return objClientY;
}

/**
 * @FunctionName	getClientX
 * @description	 ��ȡ����xλ��
 **/
function getClientX(ev){
    var oEvent=ev || event
    var scrollleft=document.documentElement.scrollLeft || document.body.scrollLeft
    var objClientX=oEvent.clientX+scrollleft;
    return objClientX;
}

/**
 * @FunctionName	getKeyCode
 * @description	 ��ȡ����keyCode��
 **/
function getKeyCode(ev){
    oEvent=ev || event;
    iKeyCode=oEvent.keyCode
    return iKeyCode
}

/**
 * @FunctionName	browserAgent
 * @description	 ��������
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
 * @description �����ı���ѡ���¼����ı�ֻ�����Ҳ���ѡ���ı�
 * @param selector  jqueryѡ��������ѡ���ı����ı�������":text,textarea"
 */
function disableTextSelect(selector){
    //readonly����ֻ����unselectable����IE�²���ѡ��style����Firefox��Chrome�²���ѡ��
    $(selector).prop("readonly",true).attr("unselectable","on").attr("style","-moz-user-select:none;-webkit-user-select:none;");
}

/**
 * @FunctionName	niceForm
 * @description	 ������
 * @param formId  form����ID
 **/
function niceForm(formId){
    /* ��ʼ�� select �����б� */
    $('.select').select2();
    /* ��ʼ�� select �����б� */
    $(":radio",formId).niceCheck();
    $(":checkbox",formId).niceCheck();
}
/**
 * @FunctionName	createPikaday
 * @description ��pikaday ��������
 * @param id  input��ID
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
 * @description ��href��ò���
 * @param paras  Ҫ��ȡ�Ĳ���
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
