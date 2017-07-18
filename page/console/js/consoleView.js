+function ($) {

    /*整体框架拖拽布局*/

    /*储存删除节点的html,方便添加*/
    var complianceHtml = $('#complianceDom').html()//合规情况
    var donitorHtml = $('#donitorDom').html();//监控信息
    var safetyHtml = $('#safetyDom').html();//安全网关
    var accreditHtml = $('#accreditDom').html();//主机授权
    var visitHtml = $('#visitDom').html();//访问情况
    var alarmHtml = $('#alarmDom').html();//告警信息

    var gridster = $(".gridster ul.widget-container").gridster({

        widget_base_dimensions: [$('.gridster').width()  * .5 - 8*3, 275],
        widget_margins: [8, 8],
        max_cols: 2,
        avoid_overlapped_widgets: true,
        draggable: {
            handle: 'header'
        },
        resize: {
            enabled: true
        }
    }).data('gridster');

    function getLeftWidget(w) {
        for (var i = 0; i < gridster.$widgets.length; i++) {
            if (parseInt($(gridster.$widgets[i]).attr("data-row")) == w.row && 1 == parseInt($(gridster.$widgets[i]).attr("data-col")))
                return gridster.$widgets[i];
        }
        return null
    }

    gridster.$el.on("click", ">li .ctrl-expand", function(e){
        var _widget = $(this).parents(".widget-container > li");
        var _widgetId = $(this).parents(".widget-container > li").attr('id');
        _widget.row = parseInt(_widget.attr("data-row"));
        _widget.col = parseInt(_widget.attr("data-col"));
        _widget.sizex = parseInt(_widget.attr("data-sizex"));
        _widget.sizey = parseInt(_widget.attr("data-sizey"));

        if(1 == _widget.sizex) {
            if(2 == _widget.col) {
                var _leftWidget = getLeftWidget(_widget);
                _leftWidget && gridster.move_widget_down($(_leftWidget), 1),
                    gridster.move_widget_to(_widget, _widget.row, 1);
            }
            gridster.resize_widget(_widget, 2, 1);
        } else {
            gridster.resize_widget(_widget, 1, 1);
        };
        //if(_widgetId=='complianceDom'){
        //    createEcharts();
        //}else if(_widgetId=='donitorDom'){
        //    createD3chart();
        //}else if(_widgetId=='visitDom'){
        //    createVisittable();
        //}else if(_widgetId=='alarmDom'){
        //    createAlarmtable();
        //};

    });

    /*删除*/
    gridster.$el.on("click", ">li .ctrl-close", function(e){
        var _widget = $(this).parents(".widget-container > li");
        var _widgetId = $(this).parents(".widget-container > li").attr('id');
        if(_widgetId=='complianceDom'){
            $("#complianceBtn").addClass("noOpen")
        }else if(_widgetId=='donitorDom'){
            $("#donitorBtn").addClass("noOpen")
        }else if(_widgetId=='safetyDom'){
            $("#safetyBtn").addClass("noOpen")
        }else if(_widgetId=='accreditDom'){
            $("#accreditBtn").addClass("noOpen")
        }else if(_widgetId=='visitDom'){
            $("#visitBtn").addClass("noOpen")
        }else if(_widgetId=='alarmDom'){
            $("#alarmBtn").addClass("noOpen")
        };
        gridster.remove_widget( _widget )

    });
    //增减主机授权节点（用css隐藏方法，出现的问题是布局不能重新调整）
    /*$('#accreditBtn').click(function(){
     if($(this).hasClass('wocao')){
     $(this).removeClass('wocao');
     $('#accreditDom').show();

     }else{
     $(this).addClass('wocao');
     $('#accreditDom').hide();

     }
     });*/

    //增减合规情况节点
    $('#complianceBtn').click(function(){
        var complianceId=document.getElementById("complianceDom")
        if(document.getElementById("complianceDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(complianceId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="complianceDom">'+complianceHtml+'</li>', 1, 1, 3, 2 );
            createEcharts();
            $("html,body").animate({ scrollTop: $("#complianceDom").offset().top }, 1000);
        }
    });

    //增减监控信息节点
    $('#donitorBtn').click(function(){
        var donitorId=document.getElementById("donitorDom")
        if(document.getElementById("donitorDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(donitorId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="donitorDom">'+donitorHtml+'</li>', 1, 1, 3, 2 );
            createD3chart();
            $("html,body").animate({ scrollTop: $("#donitorDom").offset().top }, 1000);
        }
    });

    //增减安全网关节点
    $('#safetyBtn').click(function(){
        var accreditId=document.getElementById("safetyDom")
        if(document.getElementById("safetyDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(accreditId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="safetyDom">'+safetyHtml+'</li>', 1, 1, 3, 2 );
            $("html,body").animate({ scrollTop: $("#safetyDom").offset().top }, 1000);
        }
    });

    //增减主机授权节点
    $('#accreditBtn').click(function(){
        var accreditId=document.getElementById("accreditDom")
        if(document.getElementById("accreditDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(accreditId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="accreditDom">'+accreditHtml+'</li>', 1, 1, 3, 2 );
            $("html,body").animate({ scrollTop: $("#accreditDom").offset().top }, 1000);
        }
    });

    //增减访问情况节点
    $('#visitBtn').click(function(){
        var accreditId=document.getElementById("visitDom")
        if(document.getElementById("visitDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(accreditId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="visitDom">'+visitHtml+'</li>', 1, 1, 3, 2 );
            createVisittable();
            $("html,body").animate({ scrollTop: $("#visitDom").offset().top }, 1000);
        }
    });

    //增减告警信息节点
    $('#alarmBtn').click(function(){
        var accreditId=document.getElementById("alarmDom")
        if(document.getElementById("alarmDom")!=undefined){
            $(this).addClass('noOpen');
            gridster.remove_widget(accreditId);
        }else{
            $(this).removeClass('noOpen');
            gridster.add_widget('<li id="alarmDom">'+alarmHtml+'</li>', 2, 1, 4,1 );
            createAlarmtable();
            $("html,body").animate({ scrollTop: $("#alarmDom").offset().top }, 1000);
        }
    });



    //窗口变化之后重绘布局的宽度等；
    $(window).resize(function(e) {
        gridster.resize_widget_dimensions({widget_base_dimensions: [$('.gridster').width()  * .5 - 8*2, 275]});
    });


    /* 合规情况图表 */
    createEcharts();
    function createEcharts(){
        //平台接入情况
        var labelTop = function(color){
            return {
                normal : {
                    color: color,
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                }
            };
        };

        var labelBottom = {
            normal : {
                color: '#ddd',
                borderColor: '#cecece',
                borderWidth: 1,
                label : {
                    show : false
                },
                labelLine : {
                    show : false
                }
            }
        };

        var optionTpl = {
            title: {
                x: 'center',
                y: 'center',
                itemGap: 5,
                textStyle: {
                    fontSize : 40,
                    fontWeight : 'normal',
                    baseline: 'bottom'
                },
                subtextStyle: {
                    color : '#96a1aa',
                    fontSize : 13,
                    fontWeight : 'bold',
                    baseline: 'top'
                }
            },
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius : ['75%','90%']
                }
            ]
        };

        var compliancePieOption = $.extend(true, {}, optionTpl, {
            title: {
                text: '54%',
                subtext: '合规率',
                textStyle: {
                    color : '#00c0ef'
                }
            },
            series : [
                {
                    data : [
                        {name:'', value:46, max:100, itemStyle : labelBottom},
                        {name:'合规率', value:54, max:100, itemStyle : labelTop('#00c0ef')}
                    ]
                }
            ]
        });

        var leakPieOption = $.extend(true, {}, optionTpl, {
            title: {
                text: '5%',
                subtext: '高危漏洞存在率',
                textStyle: {
                    color : '#00a65a'
                }
            },
            series : [
                {
                    data : [
                        {name:'', value:95, max:100, itemStyle : labelBottom},
                        {name:'高危漏洞', value:5, max:100, itemStyle : labelTop('#00a65a')}
                    ]
                }
            ]
        });

        var compliancePieChart = echarts.init(document.getElementById('compliancePie'));
        var leakPieChart = echarts.init(document.getElementById('leakPie'));

        compliancePieChart.setOption(compliancePieOption);
        leakPieChart.setOption(leakPieOption);
    }


    /*监控信息D3*/
    createD3chart();
    function createD3chart(){
        var gaugeA;
        var gaugeB;
        var gaugeC;
        //创建D3图表
        var monitorGauge = function (containerId, data, settings, gaugeObj) {
            var config = liquidFillGaugeDefaultSettings();
            if (containerId == null || containerId == "") {
                return;
            }
            if (data == null  || data == "") {
                data = 0;
            }

            if (settings == null){
                config.circleThickness = 0.1;
                config.circleFillGap = 0.2;
                config.textVertPosition = 0.8;
                config.waveAnimateTime = 2000;
                config.waveHeight = 0.1;
                config.waveCount = 1;
            } else {
                config.circleColor = (settings.circleColor != null && settings.circleColor != "") ? settings.circleColor : "#D4AB6A";
                config.textColor = (settings.textColor != null && settings.textColor != "") ? settings.textColor : "#D4AB6A";
                config.waveTextColor = (settings.waveTextColor != null && settings.waveTextColor != "") ? settings.waveTextColor : "#D4AB6A";
                config.waveColor = (settings.waveColor != null && settings.waveColor != "") ? settings.waveColor : "#D4AB6A";
            }
            return loadLiquidFillGauge(containerId, data, config, null);
        };

        //配置监控信息图表
        gaugeA = monitorGauge("cpuGauge", 40, {circleColor:"#178BCA",textColor:"#045681",waveColor: "#178BCA",waveTextColor: "#A4DBf8"}, null);
        gaugeB = monitorGauge("ramGauge", 60, {circleColor:"#ff9c00",textColor:"#ff9c00",waveColor: "#ff9c00",waveTextColor: "#ff4f00"}, null);
        gaugeC = monitorGauge("hddGauge", 70, {circleColor:"#808015",textColor:"#555500",waveColor: "#AAAA39",waveTextColor: "#FFFFAA"}, null);

    }



    /*访问情况表格*/
    createVisittable();
    function createVisittable(){
        /* 初始化datatables */
        var dtable = $('#visitTable').DataTable({
            "dom": 'lrtip',
            "searching": true,
            "paging": true,
            "lengthChange": false,
            "pageLength": 5,
            "ordering": false,
            //"columnDefs": [{
            //    "orderable": false,
            //    "targets": 0
            //},{
            //    "orderable": false,
            //    "targets": 2
            //}],
            //"order": [[1, 'asc']],
            "language": {
                "lengthMenu": "每页显示 _MENU_ 项记录",
                "zeroRecords": "没有找到记录",
                "info": "第 _START_ 到 _END_ 项记录 (共 _TOTAL_ 项记录)",
                "infoEmpty": "没有记录",
                "paginate": {
                    "first":      "第一页",
                    "last":       "最末页",
                    "next":       "下一页",
                    "previous":   "上一页"
                }
            }
        });

    }

    /*告警信息表格*/
    createAlarmtable();
    function createAlarmtable(){
        /* 初始化datatables */
        var dtable = $('#alarmTable').DataTable({
            "dom": 'lrtip',
            "searching": true,
            "paging": true,
            "lengthChange": false,
            "pageLength": 6,
            "ordering": false,
            //"columnDefs": [{
            //    "orderable": false,
            //    "targets": 0
            //},{
            //    "orderable": false,
            //    "targets": 2
            //}],
            //"order": [[1, 'asc']],
            "language": {
                "lengthMenu": "每页显示 _MENU_ 项记录",
                "zeroRecords": "没有找到记录",
                "info": "第 _START_ 到 _END_ 项记录 (共 _TOTAL_ 项记录)",
                "infoEmpty": "没有记录",
                "paginate": {
                    "first":      "第一页",
                    "last":       "最末页",
                    "next":       "下一页",
                    "previous":   "上一页"
                }
            }
        });
    }

}(jQuery);


