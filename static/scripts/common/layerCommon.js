/**
 * layer弹出层通用方法
 * @version 1.0 2016/03/24
 * @author dongliyang
 */

/**
 * 图标为对号的消息提示框
 * @param message 消息
 */
function showTick(message){
    layer.msg(message,{ icon:1 });
}

/**
 * 图标为叉号的消息提示框
 * @param message 消息
 */
function showCross(message){
    layer.msg(message,{ icon:2 });
}

/**
 * 图标为问号的消息提示框
 * @param message 消息
 */
function showQuestion(message){
    layer.msg(message,{ icon:3 });
}

/**
 * 图标为锁的消息提示框
 * @param message 消息
 */
function showLock(message){
    layer.msg(message,{ icon:4 });
}

/**
 * 图标为哭脸的消息提示框
 * @param message 消息
 */
function showCry(message){
    layer.msg(message,{ icon:5 });
}

/**
 * 图标为笑脸的消息提示框
 * @param message 消息
 */
function showSmile(message){
    layer.msg(message,{ icon:6 });
}

/**
 * 图标为叹号的消息提示框
 * @param message 消息
 */
function showMsg(message){
    layer.msg(message,{ icon:7 });
}

/**
 * 耗时操作时，弹出遮罩层
 * 完成时调用colseLoadLayer关闭
 */
function popLoadLayer(){
    return parent.layer.load(0,{ shade:[0.8,"#000"],shadeClose: false });
}

/**
 * 关闭遮罩层
 */
function colseLoadLayer(){
    parent.layer.closeAll('loading');
}

/** Layer Tips */
function layerTips(control){
    var data = $(control).next(".tip").html();
    if(data == null || (typeof data) == "undefined"){
        return;
    }
    if((typeof data) != "string" || $.trim(data) == ""){
        return;
    }


    var index = layer.tips(data, $(control),{
        tips:[1,'#FFFFFF'],
        time:10000
    });
}

/** 关闭Layer Tips */
function closeLayerTips(){
    layer.closeAll("tips");
}


function showAlert(message){
    layer.msg(message,{ icon:1 });
}
