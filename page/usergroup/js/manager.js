
var Manager = {
    //Ìí¼Ó
    add:function (param, callback) {
        var url =  '../../data/table_data.action'
        $.ajax({
            type: 'POST',
            url: url,
            data: param,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("responseText=" + jqXHR.responseText + ",status=" + jqXHR.status + ",readyState=" + jqXHR.readyState + ",statusText=" + jqXHR.statusText + ",textStatus=" + textStatus + ",errorThrown=" + errorThrown);
            }
        });

    },
    //É¾³ý
    del :function(param,callback) {
        var url =  '../../data/table_data.action'
        $.ajax({
            type: 'POST',
            url: url,
            data: param,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("responseText=" + jqXHR.responseText + ",status=" + jqXHR.status + ",readyState=" + jqXHR.readyState + ",statusText=" + jqXHR.statusText + ",textStatus=" + textStatus + ",errorThrown=" + errorThrown);
            }
        });

    },

    //±à¼­
    update: function (param, callback) {
        var url =  '../../data/table_data.action'
        $.ajax({
            type: 'POST',
            url: url,
            data: param,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("responseText=" + jqXHR.responseText + ",status=" + jqXHR.status + ",readyState=" + jqXHR.readyState + ",statusText=" + jqXHR.statusText + ",textStatus=" + textStatus + ",errorThrown=" + errorThrown);
            }
        });

    },
    //²é¿´
    findById: function (param, callback) {
        var url =  '../../data/table_data.action'
        var datas = {"id": param};
        $.ajax({
            type: 'POST',
            url: url,
            data: datas,
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("responseText=" + jqXHR.responseText + ",status=" + jqXHR.status + ",readyState=" + jqXHR.readyState + ",statusText=" + jqXHR.statusText + ",textStatus=" + textStatus + ",errorThrown=" + errorThrown);
            }
        })
    }
}
