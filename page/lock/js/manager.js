
var Manager = {
    //���
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
    //ɾ��
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

    //�༭
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
    //�鿴
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
